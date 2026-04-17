import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { UserRole } from '../../types/auth';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    matricula: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'aluno' as UserRole,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-sm bg-[var(--color-border)]" />
          <p className="mb-1 text-sm text-[var(--color-text-muted)]">Secretaria de Educação</p>
          <h1 className="text-lg font-semibold text-[var(--color-primary)]">SEED Estadual</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Cadastro para acesso ao sistema estadual de provas e avaliações.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cpf" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="matricula" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                Matrícula
              </label>
              <input
                id="matricula"
                name="matricula"
                type="text"
                value={formData.matricula}
                onChange={handleChange}
                className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              Tipo de usuário
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="secretaria">Secretaria</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-sm border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-sm bg-[var(--color-accent)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--color-accent)]/90"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          Já tem conta?{' '}
          <Link to="/login" className="text-[var(--color-accent)] hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
