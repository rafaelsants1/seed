import { Link, useLocation } from 'react-router-dom';

interface TopNavProps {
  userName?: string;
}

export function TopNav({ userName }: TopNavProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) return null;

  return (
    <header className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-800 font-bold text-sm">E</span>
          </div>
          <span className="font-semibold text-lg hidden sm:block">EduPlatform</span>
        </Link>

        <nav className="flex items-center gap-4">
          <span className="text-sm text-blue-100 hidden sm:block">
            {userName}
          </span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
            {userName?.charAt(0) || 'U'}
          </div>
        </nav>
      </div>
    </header>
  );
}
