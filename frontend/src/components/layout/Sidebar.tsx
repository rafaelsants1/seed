import { NavLink } from 'react-router-dom';
import { getNavigationItemsByRole } from '../../config/navigation';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const navItems = getNavigationItemsByRole(user.role);

  return (
    <aside className="fixed left-0 top-0 flex h-full w-60 flex-col bg-[var(--color-primary)] text-white">
      <div className="flex h-14 items-center justify-center border-b border-white/10">
        <img
          src="/brand/seed-educa-v6-fundo-escuro.svg"
          alt="SEED Educa"
          className="h-10 w-auto"
        />
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              [
                'block px-6 py-3 text-sm transition-colors',
                isActive
                  ? 'border-l-4 border-[var(--color-accent)] bg-white/8 text-white'
                  : 'text-white/80 hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="text-xs uppercase tracking-wide text-white/60">{user.role}</div>
      </div>
    </aside>
  );
}
