import { useEffect, useState, useCallback } from "react";
import { getPerformanceByUserId } from "../api/performance.service";
import type { PerformanceData } from "../types/performance.types";

interface UsePerformanceReturn {
  performance: PerformanceData | null;
  isLoading: boolean;
  error: string | null;
  loadPerformance: (userId: string) => Promise<void>;
  refreshPerformance: () => Promise<void>;
  clearError: () => void;
}

interface UsePerformanceOptions {
  autoLoad?: boolean;
  userId?: string;
}

/**
 * Hook para gerenciar estado de performance do usuário.
 *
 * @example
 * ```tsx
 * const { performance, isLoading, loadPerformance } = usePerformance();
 * ```
 */
export function usePerformance(
  options: UsePerformanceOptions = {},
): UsePerformanceReturn {
  const { autoLoad = false, userId } = options;

  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    userId,
  );

  const loadPerformance = useCallback(
    async (userIdParam: string): Promise<void> => {
      try {
        setError(null);
        setIsLoading(true);
        setCurrentUserId(userIdParam);

        const data = await getPerformanceByUserId(userIdParam);
        setPerformance(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar performance",
        );
        setPerformance(null);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const refreshPerformance = useCallback(async (): Promise<void> => {
    if (!currentUserId) return;
    await loadPerformance(currentUserId);
  }, [currentUserId, loadPerformance]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (userId) {
      setCurrentUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (autoLoad && userId) {
      void loadPerformance(userId);
    }
  }, [autoLoad, userId, loadPerformance]);

  return {
    performance,
    isLoading,
    error,
    loadPerformance,
    refreshPerformance,
    clearError,
  };
}
