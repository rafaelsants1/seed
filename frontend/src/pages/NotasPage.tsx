import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { professorDemo } from '../data/demoPortalData';

export function NotasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notas"
        breadcrumb={["Início", "Notas"]}
        subtitle="Lançamento, acompanhamento e regularização de avaliações com pendência de correção ou fechamento."
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Pendências de lançamento" value={professorDemo.notasPendentes.length} />
        <StatCard label="Alunos aguardando nota" value={24} />
        <StatCard label="Fechamentos esta semana" value={5} />
      </div>

      <AppCard title="Pendências de correção">
        <DataTable
          columns={[
            { key: 'prova', label: 'Avaliação' },
            { key: 'turma', label: 'Turma' },
            { key: 'alunosPendentes', label: 'Pendentes' },
            { key: 'prazo', label: 'Prazo' },
            { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
          ]}
          data={professorDemo.notasPendentes}
        />
      </AppCard>
    </div>
  );
}
