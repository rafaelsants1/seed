export interface Skill {
  name: string;
  score: number;
}

export interface RecentExam {
  examId: string;
  title: string;
  score: number;
  date: string;
  duration: number;
}

export interface WeakTopic {
  topic: string;
  accuracy: number;
  questionsAnswered: number;
}

export interface PerformanceData {
  userId: string;
  skills: Skill[];
  recentExams: RecentExam[];
  weakTopics: WeakTopic[];
}
