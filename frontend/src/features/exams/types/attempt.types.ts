export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  startedAt: string;
  submittedAt: string | null;
  timeRemainingSeconds: number;
  status: "in_progress" | "submitted" | "expired";
}

export interface AnswerPayload {
  questionId: string;
  selectedOption: number;
  answeredAt: string;
}
