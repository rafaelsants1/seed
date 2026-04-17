import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";
import { AppCard } from "../components/ui/AppCard";
import { PageHeader } from "../components/ui/PageHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";

export function PerfilPage() {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isLoading) {
    return (
      <div className="px-4 py-6 pb-24 md:pb-8 max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-28 rounded bg-slate-200" />
          <div className="h-4 w-72 rounded bg-slate-100" />
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="h-4 w-56 rounded bg-slate-100" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="h-28 rounded-2xl bg-slate-100" />
            <div className="h-28 rounded-2xl bg-slate-100" />
            <div className="h-28 rounded-2xl bg-slate-100 md:col-span-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="px-4 py-6 pb-24 md:pb-8 max-w-4xl mx-auto">
        <EmptyState
          title="Sessão indisponível"
          description="Não foi possível carregar os dados do perfil."
          action={
            <Button type="button" onClick={() => navigate("/")}>
              Voltar para login
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 pb-24 md:pb-8 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Perfil"
        subtitle="Gerencie sua conta e acompanhe o estado da sessão"
      />

      <AppCard className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-blue-100">Minha conta</p>
              <h1 className="mt-1 text-2xl font-bold">{user.name}</h1>
              <p className="mt-1 text-sm text-blue-100">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Perfil de acesso
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900 capitalize">
              {user.role === "student"
                ? "Aluno"
                : user.role === "teacher"
                  ? "Professor"
                  : "Administrador"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Permissões carregadas a partir da sessão atual.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Status da sessão
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              Sessão ativa
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Ambiente configurado para demonstração com autenticação mock.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 md:col-span-2">
            <p className="text-sm font-medium text-slate-500">
              Preparação para backend
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">Usuário</p>
                <p className="mt-1 text-sm text-slate-500">
                  Já carregado via camada de serviço.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">Sessão</p>
                <p className="mt-1 text-sm text-slate-500">
                  Separada da interface para futura integração com JWT.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-800">Logout</p>
                <p className="mt-1 text-sm text-slate-500">
                  Centralizado no serviço de autenticação.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Voltar ao dashboard
            </Button>

            <Button
              type="button"
              variant="danger"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Saindo..." : "Encerrar sessão"}
            </Button>
          </div>
        </div>
      </AppCard>
    </div>
  );
}
