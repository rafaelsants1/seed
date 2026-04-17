import { mockExams, mockQuestions } from "../../../data/mockData";
import type { Exam } from "../types/exam.types";
import type { Question } from "../types/question.types";

export interface ExamResultSummary {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  wrongAnswers: number;
  unanswered: number;
}

function getQuestionId(question: Question, index: number) {
  return String(question.id ?? `q-${index}`);
}

function getCorrectAnswer(question: Question) {
  return Number(question.correctAnswer ?? 0);
}

export async function getExams(): Promise<Exam[]> {
  return Promise.resolve(mockExams);
}

export async function getExamById(examId: string): Promise<Exam | null> {
  const exam =
    mockExams.find((item) => String(item.id) === String(examId)) ?? null;
  return Promise.resolve(exam);
}

export async function getQuestionsByExamId(
  examId: string,
): Promise<Question[]> {
  const questions = mockQuestions.filter(
    (item) => String(item.examId) === String(examId),
  );
  return Promise.resolve(questions);
}

export async function submitExamAnswers(
  questions: Question[],
  answers: Record<string, number>,
): Promise<ExamResultSummary> {
  const totalQuestions = questions.length;

  const correctAnswers = questions.reduce((total, question, index) => {
    const questionId = getQuestionId(question, index);
    const selected = answers[questionId];
    const correct = getCorrectAnswer(question);

    return total + (selected === correct ? 1 : 0);
  }, 0);

  const answeredCount = Object.keys(answers).length;
  const wrongAnswers = Math.max(answeredCount - correctAnswers, 0);
  const unanswered = Math.max(totalQuestions - answeredCount, 0);
  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return Promise.resolve({
    correctAnswers,
    totalQuestions,
    score,
    wrongAnswers,
    unanswered,
  });
}
