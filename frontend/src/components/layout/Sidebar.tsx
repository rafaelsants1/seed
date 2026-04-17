import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';
const navItemsByRole: Record<UserRole, string[]> = {
  aluno: ['Início', 'Minhas Provas', 'Desempenho', 'Local de Prova', 'Histórico'],
  professor: ['Início', 'Criar Prova', 'Banco de Questões', 'Turmas', 'Notas', 'Desempenho'],
  secretaria: ['Painel', 'Gestão de Usuários', 'Avaliações', 'Banco de Questões', 'Escolas', 'Desempenho', 'Relatórios'],
};

const routeMap: Record<UserRole, Record<string, string>> = {
  aluno: {
    Início: '/',
    'Minhas Provas': '/provas',
    Desempenho: '/desempenho',
    'Local de Prova': '/local-prova',
    Histórico: '/historico',
  },
  professor: {
    Início: '/',
    'Criar Prova': '/criar-prova',
    'Banco de Questões': '/banco-questoes',
    Turmas: '/turmas',
    Notas: '/notas',
    Desempenho: '/desempenho',
  },
  secretaria: {
    Painel: '/',
    Avaliações: '/avaliacoes',
    'Gestão de Usuários': '/gestao-usuarios',
    'Banco de Questões': '/banco-questoes',
    Escolas: '/escolas',
    Desempenho: '/desempenho',
    Relatórios: '/relatorios',
  },
};

export function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const navItems = navItemsByRole[user.role];
  const routes = routeMap[user.role];

  return (
    <aside className="fixed left-0 top-0 flex h-full w-60 flex-col bg-[var(--color-primary)] text-white">
      <div className="flex h-14 items-center justify-center border-b border-white/10">
        <div className="h-8 w-8 rounded-sm bg-white/20" />
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item}
            to={routes[item]}
            className={({ isActive }) =>
              [
                'block px-6 py-3 text-sm transition-colors',
                isActive
                  ? 'border-l-4 border-[var(--color-accent)] bg-white/8 text-white'
                  : 'text-white/80 hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="text-xs uppercase tracking-wide text-white/60">{user.role}</div>
      </div>
    </aside>
  );
}
