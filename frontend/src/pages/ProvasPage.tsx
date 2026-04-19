import { Link } from "react-router-dom";
import { AppCard } from "../components/ui/AppCard";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { proofPerformanceDemo } from "../data/demoPortalData";

const provas = [
  { id: 1, nome: 'Avaliacao de Matematica', tipo: 'Prova online', disciplina: 'Matematica', data: '20/05/2026', duracao: '45 min', questoes: 20, resultado: '-', situacao: 'disponivel', acao: 'Iniciar' },
  { id: 2, nome: 'Avaliacao de Portugues', tipo: 'Prova online', disciplina: 'Portugues', data: '24/05/2026', duracao: '50 min', questoes: 25, resultado: '-', situacao: 'agendado', acao: 'Ver detalhes' },
  { id: 3, nome: 'Prova de Ciencias', tipo: 'Prova online', disciplina: 'Ciencias', data: '02/04/2026', duracao: '40 min', questoes: 18, resultado: '83%', situacao: 'encerrado', acao: 'Consultar resultado' },
];

const normalizeStatus = (value: string) => {
  if (value === 'disponivel') return 'ativo';
  if (value === 'agendado') return 'agendado';
  return 'encerrado';
};

export function ProvasPage() {
  const completed = proofPerformanceDemo.aluno.provasRecentes.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Minhas Provas"
        breadcrumb={["Início", "Minhas Provas"]}
        subtitle="Provas online vinculadas ao SEED Educa. Os resultados alimentam o diagnóstico por IA e a recomendação de estudo."
        action={
          <Link to="/diagnostico" className="rounded-sm border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-background)]">
            Ver diagnóstico
          </Link>
        }
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Provas disponíveis" value={1} />
        <StatCard label="Provas agendadas" value={1} />
        <StatCard label="Provas concluídas" value={completed} />
        <StatCard label="Base do diagnóstico" value={`${completed} provas`} />
      </div>

      <AppCard title="Ciclo de provas do aluno">
        <DataTable
          columns={[
            { key: 'nome', label: 'Prova' },
            { key: 'tipo', label: 'Tipo' },
            { key: 'disciplina', label: 'Disciplina' },
            { key: 'data', label: 'Data' },
            { key: 'duracao', label: 'Duração' },
            { key: 'questoes', label: 'Questões' },
            { key: 'resultado', label: 'Resultado' },
            {
              key: 'situacao',
              label: 'Situação',
              render: (value) => <StatusBadge status={normalizeStatus(String(value)) as 'ativo' | 'agendado' | 'encerrado'} />,
            },
            { key: 'acao', label: 'Ação' },
          ]}
          data={provas}
        />
      </AppCard>
    </div>
  );
}
