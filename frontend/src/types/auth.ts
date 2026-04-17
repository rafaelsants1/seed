export type UserRole = 'aluno' | 'professor' | 'secretaria';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  schoolId?: string;
}
