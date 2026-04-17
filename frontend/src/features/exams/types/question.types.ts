export interface Question {
  id: string;
  examId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}
