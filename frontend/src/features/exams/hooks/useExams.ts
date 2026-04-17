import { useEffect, useState, useCallback } from "react";
import {
  getExams,
  getExamById,
  getQuestionsByExamId,
  submitExamAnswers,
  type ExamResultSummary,
} from "../api/exams.service";
import type { Exam } from "../types/exam.types";
import type { Question } from "../types/question.types";

interface UseExamsReturn {
  exams: Exam[];
  currentExam: Exam | null;
  questions: Question[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  loadExams: () => Promise<void>;
  loadExamById: (examId: string) => Promise<Exam | null>;
  loadQuestions: (examId: string) => Promise<Question[]>;
  submitExam: (
    answers: Record<string, number>,
  ) => Promise<ExamResultSummary | null>;
  clearError: () => void;
  clearCurrentExam: () => void;
}

interface UseExamsOptions {
  autoLoad?: boolean;
}

/**
 * Hook para gerenciar estado de simulados e questões.
 *
 * @example
 * ```tsx
 * const { exams, isLoading, loadExams } = useExams();
 * ```
 */
export function useExams(options: UseExamsOptions = {}): UseExamsReturn {
  const { autoLoad = true } = options;

  const [exams, setExams] = useState<Exam[]>([]);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExams = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      const data = await getExams();
      setExams(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar simulados",
      );
      setExams([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadExamById = useCallback(
    async (examId: string): Promise<Exam | null> => {
      try {
        setError(null);
        setIsLoading(true);

        const exam = await getExamById(examId);
        setCurrentExam(exam);
        return exam;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar simulado",
        );
        setCurrentExam(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const loadQuestions = useCallback(
    async (examId: string): Promise<Question[]> => {
      try {
        setError(null);
        setIsLoading(true);

        const data = await getQuestionsByExamId(examId);
        setQuestions(data);
        return data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar questões",
        );
        setQuestions([]);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const submitExam = useCallback(
    async (
      answers: Record<string, number>,
    ): Promise<ExamResultSummary | null> => {
      try {
        setError(null);
        setIsSubmitting(true);

        const result = await submitExamAnswers(questions, answers);
        return result;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao enviar respostas",
        );
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [questions],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCurrentExam = useCallback(() => {
    setCurrentExam(null);
    setQuestions([]);
    setError(null);
  }, []);

  useEffect(() => {
    if (autoLoad) {
      void loadExams();
    }
  }, [autoLoad, loadExams]);

  return {
    exams,
    currentExam,
    questions,
    isLoading,
    isSubmitting,
    error,
    loadExams,
    loadExamById,
    loadQuestions,
    submitExam,
    clearError,
    clearCurrentExam,
  };
}
