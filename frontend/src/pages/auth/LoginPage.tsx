import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { AuthUser, UserRole } from '../../types/auth';

export function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('aluno');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mockUser: AuthUser = {
      id: '1',
      name: 'Usuário Teste',
      role,
      schoolId: '1',
    };

    setUser(mockUser);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-sm bg-[var(--color-border)]" />
          <p className="mb-1 text-sm text-[var(--color-text-muted)]">Secretaria de Educação</p>
          <h1 className="text-lg font-semibold text-[var(--color-primary)]">SEED Estadual</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Acesso ao sistema estadual de provas e avaliações.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cpf" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
              placeholder="000.000.000-00"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              Perfil para demonstração
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="secretaria">Secretaria</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-sm bg-[var(--color-accent)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--color-accent)]/90"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm text-[var(--color-text-muted)]">
          <p className="font-medium text-[var(--color-text-primary)]">Acesso institucional</p>
          <p className="mt-2 leading-6">
            Alunos e professores não realizam cadastro diretamente nesta plataforma.
            O vínculo de acesso é criado pela secretaria escolar com base na matrícula
            registrada na unidade de ensino.
          </p>
        </div>
      </div>
    </div>
  );
}
