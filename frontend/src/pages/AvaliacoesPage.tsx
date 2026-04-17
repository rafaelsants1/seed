import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { secretariaDemo } from '../data/demoPortalData';

export function AvaliacoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Avaliações"
        breadcrumb={["Início", "Avaliações"]}
        subtitle="Acompanhamento institucional das aplicações previstas, em andamento e pendentes na rede estadual."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Aplicações previstas" value={secretariaDemo.avaliacoes.length} />
        <StatCard label="Em andamento" value={1} />
        <StatCard label="Escolas envolvidas" value={12} />
        <StatCard label="Provas publicadas" value={156} />
      </div>

      <AppCard title="Calendário de aplicações">
        <DataTable
          columns={[
            { key: 'nome', label: 'Avaliação' },
            { key: 'abrangencia', label: 'Abrangência' },
            { key: 'data', label: 'Data' },
            { key: 'situacao', label: 'Situação', render: (_, row) => <StatusBadge status={row.situacao} /> },
          ]}
          data={secretariaDemo.avaliacoes}
        />
      </AppCard>
    </div>
  );
}
