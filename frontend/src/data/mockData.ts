import type { User } from "../features/auth/types/user.types";
import type { Exam } from "../features/exams/types/exam.types";
import type { Question } from "../features/exams/types/question.types";
import type { PerformanceData } from "../features/performance/types/performance.types";

export const mockUser: User = {
  id: "1",
  name: "João Silva",
  email: "joao.silva@educacao.gov.br",
  role: "student",
};

export const mockExams: Exam[] = [
  {
    id: "1",
    title: "Matemática Básica",
    subject: "Matemática",
    duration: 45,
    questions: 20,
    description: "Operações fundamentais, frações e porcentagem",
    difficulty: "easy",
  },
  {
    id: "2",
    title: "Álgebra I",
    subject: "Matemática",
    duration: 60,
    questions: 25,
    description: "Equações, inequações e funções do 1º grau",
    difficulty: "medium",
  },
  {
    id: "3",
    title: "Geometria Plana",
    subject: "Matemática",
    duration: 50,
    questions: 18,
    description: "Áreas, perímetros e propriedades de figuras planas",
    difficulty: "medium",
  },
  {
    id: "4",
    title: "Raciocínio Lógico",
    subject: "Lógica",
    duration: 40,
    questions: 15,
    description: "Sequências lógicas, argumentos e proposições",
    difficulty: "hard",
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    examId: "1",
    text: "Qual é o resultado de 3/4 + 1/2?",
    options: ["5/4", "7/8", "1", "3/2"],
    correctAnswer: 0,
    explanation: "3/4 + 1/2 = 3/4 + 2/4 = 5/4",
    topic: "Frações",
  },
  {
    id: "q2",
    examId: "1",
    text: "Quanto é 25% de 80?",
    options: ["15", "20", "25", "30"],
    correctAnswer: 1,
    explanation: "25% de 80 = 0,25 × 80 = 20",
    topic: "Porcentagem",
  },
  {
    id: "q3",
    examId: "1",
    text: "Resolva: 2(x + 3) = 14",
    options: ["x = 2", "x = 4", "x = 5", "x = 7"],
    correctAnswer: 1,
    explanation: "2x + 6 = 14 → 2x = 8 → x = 4",
    topic: "Equações",
  },
  {
    id: "q4",
    examId: "1",
    text: "Qual é a área de um quadrado de lado 6cm?",
    options: ["24 cm²", "30 cm²", "36 cm²", "42 cm²"],
    correctAnswer: 2,
    explanation: "Área = lado² = 6² = 36 cm²",
    topic: "Geometria",
  },
  {
    id: "q5",
    examId: "1",
    text: "Se 5x - 3 = 12, qual é o valor de x?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "5x = 15 → x = 3",
    topic: "Equações",
  },
];

export const mockPerformance: PerformanceData = {
  userId: "1",
  skills: [
    { name: "Álgebra", score: 72 },
    { name: "Geometria", score: 58 },
    { name: "Aritmética", score: 85 },
    { name: "Lógica", score: 45 },
    { name: "Estatística", score: 62 },
    { name: "Funções", score: 68 },
  ],
  recentExams: [
    {
      examId: "1",
      title: "Matemática Básica",
      score: 85,
      date: "2024-01-10",
      duration: 38,
    },
    {
      examId: "2",
      title: "Álgebra I",
      score: 72,
      date: "2024-01-08",
      duration: 55,
    },
    {
      examId: "3",
      title: "Geometria Plana",
      score: 58,
      date: "2024-01-05",
      duration: 48,
    },
  ],
  weakTopics: [
    { topic: "Raciocínio Lógico", accuracy: 45, questionsAnswered: 32 },
    { topic: "Geometria Espacial", accuracy: 52, questionsAnswered: 18 },
    { topic: "Equações do 2º Grau", accuracy: 58, questionsAnswered: 24 },
  ],
};
