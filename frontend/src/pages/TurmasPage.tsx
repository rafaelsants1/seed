import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { professorDemo } from '../data/demoPortalData';

export function TurmasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Turmas"
        breadcrumb={["Início", "Turmas"]}
        subtitle="Visão consolidada das turmas vinculadas ao professor, com indicadores de aplicação e desempenho médio."
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Turmas ativas" value={professorDemo.turmas.length} />
        <StatCard label="Total de alunos" value={95} />
        <StatCard label="Média geral das turmas" value="77%" />
      </div>

      <AppCard title="Turmas acompanhadas">
        <DataTable
          columns={[
            { key: 'turma', label: 'Turma' },
            { key: 'alunos', label: 'Alunos' },
            { key: 'provasAplicadas', label: 'Provas aplicadas' },
            { key: 'media', label: 'Média (%)' },
          ]}
          data={professorDemo.turmas}
        />
      </AppCard>
    </div>
  );
}
