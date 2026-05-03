import { Link } from "react-router-dom";
import { AppCard } from "../components/ui/AppCard";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { proofPerformanceDemo } from "../data/demoPortalData";

const provas = [
  {
    id: 1,
    nome: "Avaliacao de Matematica",
    tipo: "Prova online",
    data: "20/05/2026",
    duracao: "45 min",
    resultado: "-",
    situacao: "available",
    acao: "start",
    rota: "/simulados/1",
  },
  {
    id: 2,
    nome: "Simulado de Portugues",
    tipo: "Simulado inteligente",
    data: "24/05/2026",
    duracao: "50 min",
    resultado: "Em andamento",
    situacao: "in-progress",
    acao: "continue",
    rota: "/simulados/2",
  },
  {
    id: 3,
    nome: "Prova de Ciencias",
    tipo: "Prova online",
    data: "02/04/2026",
    duracao: "40 min",
    resultado: "83%",
    situacao: "completed",
    acao: "view-result",
    rota: "/resultados",
  },
];

const statusMap = {
  available: { label: "Disponivel", status: "ativo" as const },
  "in-progress": { label: "Em andamento", status: "agendado" as const },
  completed: { label: "Concluida", status: "encerrado" as const },
};

const actionMap = {
  start: "Iniciar",
  continue: "Continuar",
  "view-result": "Ver resultado",
};

export function ProvasPage() {
  const completed = provas.filter((item) => item.situacao === "completed").length;
  const inProgress = provas.filter((item) => item.situacao === "in-progress").length;
  const available = provas.filter((item) => item.situacao === "available").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Minhas Provas"
        breadcrumb={["Início", "Minhas Provas"]}
        subtitle="Provas e simulados alimentam o diagnóstico por IA do SEED Educa."
        action={
          <Link to="/diagnostico" className="rounded-sm border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-background)]">
            Ver diagnóstico
          </Link>
        }
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Disponiveis" value={available} />
        <StatCard label="Em andamento" value={inProgress} />
        <StatCard label="Concluidas" value={completed} />
        <StatCard label="Base do diagnostico" value={`${proofPerformanceDemo.aluno.provasRecentes.length} provas`} />
      </div>

      <AppCard title="Fluxo da prova">
        <DataTable
          columns={[
            { key: "nome", label: "Prova" },
            { key: "tipo", label: "Tipo" },
            { key: "data", label: "Data" },
            { key: "duracao", label: "Duracao" },
            { key: "resultado", label: "Resultado" },
            {
              key: "situacao",
              label: "Status",
              render: (value) => {
                const item = statusMap[value as keyof typeof statusMap];
                return (
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-[var(--color-text-muted)]">{item.label}</span>
                  </div>
                );
              },
            },
            {
              key: "acao",
              label: "Acao",
              render: (value, row) => (
                <Link
                  to={row.rota}
                  className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-primary)]"
                >
                  {actionMap[value as keyof typeof actionMap]}
                </Link>
              ),
            },
          ]}
          data={provas}
        />
      </AppCard>

      <AppCard title="Transicao do fluxo" variant="compact">
        <p className="text-sm text-[var(--color-text-muted)]">
          Iniciar ou continuar abre a execução. Resultado leva ao diagnóstico.
        </p>
      </AppCard>
    </div>
  );
}
