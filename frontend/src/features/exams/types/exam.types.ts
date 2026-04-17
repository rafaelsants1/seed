export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: number;
  description: string;
  difficulty: "easy" | "medium" | "hard";
}
