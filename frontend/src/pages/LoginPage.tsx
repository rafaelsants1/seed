import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { useAuth } from "../features/auth/hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    clearError();

    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    try {
      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch {
      setError("Não foi possível iniciar a sessão no momento.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-8 text-white">
            <p className="text-sm font-medium text-blue-100">
              Plataforma educacional
            </p>
            <h1 className="text-3xl font-bold mt-2">Entrar</h1>
            <p className="text-sm text-blue-100 mt-2">
              Acesse sua área para continuar os estudos e acompanhar seu
              desempenho.
            </p>
          </div>

          <div className="p-6 md:p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@educacao.gov.br"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  autoComplete="current-password"
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              ) : null}

              <Button type="submit" disabled={isLoading} fullWidth>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                Ambiente de demonstração
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Nesta versão, qualquer e-mail e senha válidos no formulário
                permitem acesso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
