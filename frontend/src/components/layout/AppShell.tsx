import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Sidebar />
      <Header />
      <main className="ml-60 mt-14">
        <div className="max-w-[1280px] mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
