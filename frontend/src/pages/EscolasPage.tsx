import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { secretariaDemo } from '../data/demoPortalData';

export function EscolasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Escolas"
        breadcrumb={["Início", "Escolas"]}
        subtitle="Cadastro institucional e monitoramento das unidades envolvidas nas avaliações estaduais."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Escolas cadastradas" value={secretariaDemo.escolas.length} />
        <StatCard label="Municípios atendidos" value={3} />
        <StatCard label="Diretores vinculados" value={3} />
        <StatCard label="Unidades com pendência" value={1} />
      </div>

      <AppCard title="Rede escolar vinculada">
        <DataTable
          columns={[
            { key: 'escola', label: 'Escola' },
            { key: 'municipio', label: 'Município' },
            { key: 'alunos', label: 'Alunos' },
            { key: 'diretor', label: 'Diretor' },
            { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
          ]}
          data={secretariaDemo.escolas}
        />
      </AppCard>
    </div>
  );
}
