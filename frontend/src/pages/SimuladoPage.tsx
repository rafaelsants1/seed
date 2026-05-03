import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { QuestionCard } from "../components/QuestionCard";
import { useExams } from "../features/exams/hooks/useExams";
import type { ExamResultSummary } from "../features/exams/api/exams.service";
import type { Exam } from "../features/exams/types/exam.types";
import type { Question } from "../features/exams/types/question.types";

type AnswerMap = Record<string, number>;

function getExamTitle(exam: Exam) {
  return exam.title || "Simulado";
}

function getExamDuration(exam: Exam) {
  return exam.duration || 30;
}

function getExamSubject(exam: Exam) {
  return exam.subject || "Disciplina";
}

function getQuestionId(question: Question, index: number) {
  return question.id || `q-${index}`;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function SimuladoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentExam,
    questions,
    isLoading,
    loadExamById,
    loadQuestions,
    submitExam,
  } = useExams({
    autoLoad: false,
  });

  const storageKey = `simulado:${id ?? "default"}`;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [result, setResult] = useState<ExamResultSummary | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadExamData() {
      if (!id) {
        return;
      }

      const [examData] = await Promise.all([
        loadExamById(id),
        loadQuestions(id),
      ]);

      if (!isMounted) return;

      if (examData) {
        setTimeLeft(getExamDuration(examData) * 60);
      }
    }

    loadExamData();

    return () => {
      isMounted = false;
    };
  }, [id, loadExamById, loadQuestions]);

  useEffect(() => {
    if (!currentExam) return;

    const saved = localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        answers?: AnswerMap;
        currentQuestionIndex?: number;
        timeLeft?: number;
        isFinished?: boolean;
        result?: ExamResultSummary | null;
      };

      if (parsed.answers) setAnswers(parsed.answers);
      if (
        typeof parsed.currentQuestionIndex === "number" &&
        parsed.currentQuestionIndex >= 0
      ) {
        setCurrentQuestionIndex(parsed.currentQuestionIndex);
      }
      if (typeof parsed.timeLeft === "number") setTimeLeft(parsed.timeLeft);
      if (typeof parsed.isFinished === "boolean")
        setIsFinished(parsed.isFinished);
      if (parsed.result) setResult(parsed.result);
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, [currentExam, storageKey]);

  useEffect(() => {
    if (!currentExam) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        answers,
        currentQuestionIndex,
        timeLeft,
        isFinished,
        result,
      }),
    );
  }, [
    answers,
    currentQuestionIndex,
    timeLeft,
    isFinished,
    result,
    currentExam,
    storageKey,
  ]);

  useEffect(() => {
    if (!currentExam || isFinished) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          void handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentExam, isFinished]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isFinished && Object.keys(answers).length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answers, isFinished]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionId = currentQuestion
    ? getQuestionId(currentQuestion, currentQuestionIndex)
    : "";

  const selectedAnswer =
    currentQuestionId && currentQuestionId in answers
      ? answers[currentQuestionId]
      : undefined;

  const answeredCount = Object.keys(answers).length;
  const progress =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  async function handleFinish() {
    const summary = await submitExam(answers);
    if (summary) {
      setResult(summary);
      setIsFinished(true);
    }
  }

  const handleRestart = () => {
    if (!currentExam) return;

    localStorage.removeItem(storageKey);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(getExamDuration(currentExam) * 60);
    setIsFinished(false);
    setResult(null);
  };

  const computedResult = useMemo(() => {
    return (
      result ?? {
        correctAnswers: 0,
        totalQuestions,
        score: 0,
        wrongAnswers: 0,
        unanswered: totalQuestions,
      }
    );
  }, [result, totalQuestions]);
  const referenceAverage = 68;
  const comparisonText =
    computedResult.score >= referenceAverage
      ? `Acima da média da aplicação (${referenceAverage}%).`
      : `Abaixo da média da aplicação (${referenceAverage}%).`;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-8 w-72 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-100" />
            <div className="h-64 w-full rounded-2xl bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentExam) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Simulado não encontrado
          </h1>
          <p className="text-gray-600 mt-2">
            O identificador informado é inválido ou este simulado não está
            disponível.
          </p>
          <Button
            type="button"
            onClick={() => navigate("/simulados")}
            className="mt-6"
          >
            Voltar para simulados
          </Button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)] px-6 py-6 text-white">
            <p className="text-sm font-medium text-white/80">
              Prova finalizada
            </p>
            <h1 className="mt-1 text-2xl font-semibold">
              {getExamTitle(currentExam)}
            </h1>
            <p className="mt-2 text-sm text-white/80">
              Baseado nesta prova
            </p>
            <p className="mt-2 text-sm text-white/80">
              {getExamSubject(currentExam)} • {totalQuestions} questões
            </p>
          </div>

          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                <p className="text-sm text-[var(--color-text-muted)]">Pontuação</p>
                <p className="mt-1 text-3xl font-semibold text-[var(--color-primary)]">
                  {computedResult.score}%
                </p>
              </div>

              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                <p className="text-sm text-[var(--color-text-muted)]">Acertos</p>
                <p className="mt-1 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {computedResult.correctAnswers}/{computedResult.totalQuestions}
                </p>
              </div>

              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                <p className="text-sm text-[var(--color-text-muted)]">Erros</p>
                <p className="mt-1 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {computedResult.wrongAnswers}
                </p>
              </div>

              <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                <p className="text-sm text-gray-600">Não respondidas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {computedResult.unanswered}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <p className="text-sm font-medium text-[var(--color-primary)]">
                Resumo da prova
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {comparisonText} A análise detalhada usa esta prova para apontar lacunas por tópico.
              </p>
              <p className="hidden">
                O resultado foi calculado por uma camada de serviço mock.
                Depois, você pode substituir essa implementação por uma chamada
                real ao backend.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button type="button" variant="secondary" onClick={handleRestart}>
                Refazer simulado
              </Button>

              <Button
                type="button"
                onClick={() => navigate("/diagnostico")}
              >
                Ver análise detalhada
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/simulados")}
              >
                Voltar para simulados
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Nenhuma questão disponível
          </h1>
          <p className="text-gray-600 mt-2">
            Este simulado ainda não possui questões no mock atual.
          </p>
          <Button
            type="button"
            onClick={() => navigate("/simulados")}
            className="mt-6"
          >
            Voltar para simulados
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
        <div className="mb-6 rounded-[28px] border border-slate-200 bg-white px-5 py-5 shadow-sm shadow-slate-200/40 md:px-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-blue-700">
                Simulado em andamento
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                {getExamTitle(currentExam)}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {getExamSubject(currentExam)} • Questão{" "}
                {currentQuestionIndex + 1} de {totalQuestions}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="min-w-[160px] rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-700">
                  Tempo restante
                </p>
                <p className="mt-1 text-2xl font-semibold text-blue-950">
                  {formatTime(timeLeft)}
                </p>
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsExitDialogOpen(true)}
              >
                Sair do simulado
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Progresso</span>
              <span>
                {answeredCount} de {totalQuestions} respondidas
              </span>
            </div>

            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-700 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={selectedAnswer}
              onAnswer={handleAnswer}
            />

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Anterior
              </Button>

              {!isLastQuestion ? (
                <Button type="button" onClick={handleNext}>
                  Próxima
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="success"
                  onClick={() => void handleFinish()}
                >
                  Finalizar simulado
                </Button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
            <h2 className="text-base font-semibold text-slate-900">
              Navegação das questões
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Acesse qualquer questão rapidamente
            </p>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {questions.map((question, index) => {
                const questionId = getQuestionId(question, index);
                const isAnswered = questionId in answers;
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={questionId}
                    type="button"
                    onClick={() => handleJumpToQuestion(index)}
                    className={[
                      "h-11 rounded-xl border text-sm font-semibold transition-colors",
                      isCurrent
                        ? "border-blue-700 bg-blue-700 text-white"
                        : isAnswered
                          ? "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="inline-block h-3 w-3 rounded-full bg-blue-700" />
                <span>Questão atual</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="inline-block h-3 w-3 rounded-full bg-blue-200" />
                <span>Respondida</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="inline-block h-3 w-3 rounded-full bg-slate-200" />
                <span>Pendente</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Resumo do andamento
              </p>

              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Respondidas</span>
                  <span className="font-semibold text-slate-900">
                    {answeredCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pendentes</span>
                  <span className="font-semibold text-slate-900">
                    {Math.max(totalQuestions - answeredCount, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Progresso</span>
                  <span className="font-semibold text-slate-900">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {isExitDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10">
            <h2 className="text-xl font-semibold text-slate-900">
              Sair do simulado
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Seu progresso está salvo localmente. Você poderá continuar depois,
              desde que permaneça neste mesmo navegador.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsExitDialogOpen(false)}
              >
                Continuar no simulado
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/simulados")}
              >
                Sair do simulado
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
