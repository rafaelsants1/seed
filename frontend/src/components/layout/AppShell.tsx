import { Navigate, useLocation } from 'react-router-dom';
import { getDefaultPathByRole, isPathAllowedForRole } from '../../config/navigation';
import { useAuth } from '../../context/AuthContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isPathAllowedForRole(user.role, location.pathname)) {
    return <Navigate to={getDefaultPathByRole(user.role)} replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Sidebar />
      <Header />
      <main className="ml-60 mt-14">
        <div className="mx-auto max-w-[1280px] p-6">{children}</div>
      </main>
    </div>
  );
}
