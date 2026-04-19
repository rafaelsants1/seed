import { useLocation, useNavigate } from 'react-router-dom';
import { getDefaultPathByRole, isPathAllowedForRole } from '../../config/navigation';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';

const roleLabels: Record<UserRole, string> = {
  aluno: 'Aluno',
  professor: 'Professor',
  secretaria: 'Secretaria',
};

export function Header() {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRole = event.target.value as UserRole;
    setUser({ ...user, role: nextRole });

    if (!isPathAllowedForRole(nextRole, location.pathname)) {
      navigate(getDefaultPathByRole(nextRole));
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6">
      <div className="flex items-center gap-4">
        <img
          src="/brand/seed-educa-v6-principal.svg"
          alt="SEED Educa"
          className="h-9 w-auto"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 md:flex">
          <div className="text-right">
            <p className="text-sm text-[var(--color-text-primary)]">{user.name}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Sistema de provas com inteligência de desempenho
            </p>
          </div>

          <select
            value={user.role}
            onChange={handleRoleChange}
            className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs uppercase text-[var(--color-primary)] focus:border-[var(--color-accent)] focus:outline-none"
            aria-label="Selecionar perfil de visualização"
          >
            <option value="aluno">{roleLabels.aluno}</option>
            <option value="professor">{roleLabels.professor}</option>
            <option value="secretaria">{roleLabels.secretaria}</option>
          </select>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-error)]"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
