import type { Question } from "../features/exams/types/question.types";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswer: (questionId: string, answerIndex: number) => void;
  showExplanation?: boolean;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  showExplanation = false,
  disabled = false,
}: QuestionCardProps) {
  const questionText = question.text || "Pergunta indisponível.";
  const options = Array.isArray(question.options) ? question.options : [];
  const explanation = question.explanation || null;

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#1A2A44] text-white px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-blue-100">
            Questão {questionNumber} de {totalQuestions}
          </p>

          <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
            {question.topic}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 md:px-8">
        <h2 className="text-xl leading-8 font-semibold text-slate-900 max-w-3xl">
          {questionText}
        </h2>

        <div className="mt-8 space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index;

            return (
              <button
                key={`${question.id}-${index}`}
                type="button"
                disabled={disabled}
                onClick={() => onAnswer(question.id, index)}
                className={[
                  "w-full text-left rounded-xl border px-5 py-4 transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400",
                  isSelected
                    ? "border-[#1B4FBF] bg-blue-50"
                    : "border-slate-200 hover:border-blue-300",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-full font-semibold",
                      isSelected
                        ? "bg-[#1B4FBF] text-white"
                        : "bg-slate-100 text-slate-600",
                    ].join(" ")}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="text-sm leading-6">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && explanation && (
          <div className="mt-8 border-l-4 border-[#1F7A63] bg-green-50 px-5 py-4 rounded-r-xl">
            <p className="text-sm font-semibold text-green-900">Explicação</p>
            <p className="mt-2 text-sm text-green-800 leading-6">
              {explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
