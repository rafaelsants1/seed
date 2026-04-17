import { useEffect, useState, useCallback } from "react";
import {
  login as loginService,
  logout as logoutService,
  getSession as getSessionService,
  type LoginPayload,
} from "../api/auth.service";
import type { User } from "../types/user.types";

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}

/**
 * Hook de autenticação para gerenciar estado da sessão.
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, isLoading, login, logout } = useAuth();
 * ```
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      const session = await getSessionService();
      setUser(session?.user ?? null);
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : "Erro ao carregar sessão");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (payload: LoginPayload): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      const session = await loginService(payload);
      setUser(session.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      await logoutService();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer logout");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    refreshSession,
    clearError,
  };
}
