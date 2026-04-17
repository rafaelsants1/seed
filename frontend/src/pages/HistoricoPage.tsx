import { AppCard } from "../components/ui/AppCard";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";

const historico = [
  { id: 1, prova: 'Simulado de Matemática', data: '10/04/2026', disciplina: 'Matemática', nota: 85, status: 'encerrado' },
  { id: 2, prova: 'Simulado de Português', data: '03/04/2026', disciplina: 'Português', nota: 72, status: 'encerrado' },
  { id: 3, prova: 'Avaliação de Ciências', data: '28/03/2026', disciplina: 'Ciências', nota: 90, status: 'encerrado' },
];

export function HistoricoPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Histórico" breadcrumb={["Início", "Histórico"]} />

      <AppCard title="Provas realizadas">
        <DataTable
          columns={[
            { key: 'prova', label: 'Prova' },
            { key: 'data', label: 'Data' },
            { key: 'disciplina', label: 'Disciplina' },
            { key: 'nota', label: 'Nota' },
            { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
          ]}
          data={historico}
        />
      </AppCard>
    </div>
  );
}
