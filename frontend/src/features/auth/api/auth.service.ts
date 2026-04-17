import { mockUser } from "../../../data/mockData";
import type { User } from "../types/user.types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

const AUTH_STORAGE_KEY = "auth_session";

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const session: AuthSession = {
    user: {
      ...mockUser,
      email: payload.email.trim() || mockUser.email,
    },
    token: "mock-jwt-token",
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  return Promise.resolve(session);
}

export async function getSession(): Promise<AuthSession | null> {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return Promise.resolve(null);
  }

  try {
    return Promise.resolve(JSON.parse(raw) as AuthSession);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return Promise.resolve(null);
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem("user");
  return Promise.resolve();
}
