import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { proofPerformanceDemo, secretariaDemo } from '../data/demoPortalData';

export function EscolasPage() {
  const secretaria = proofPerformanceDemo.secretaria;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Escolas de Aplicação"
        breadcrumb={["Painel Macro", "Escolas de Aplicação"]}
        subtitle="Unidades acompanhadas pela secretaria no ciclo de aplicação, participação e resultado das provas."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Escolas cadastradas" value={secretariaDemo.escolas.length} />
        <StatCard label="Com resultado consolidado" value={secretaria.comparativoEscolas.length} />
        <StatCard label="Abaixo da média" value={secretaria.escolasAbaixoMedia.length} />
        <StatCard label="Menor participação" value="81%" />
      </div>

      <AppCard title="Resultado por escola na última aplicação">
        <DataTable
          columns={[
            { key: 'escola', label: 'Escola' },
            { key: 'municipio', label: 'Município' },
            { key: 'aplicacao', label: 'Aplicação' },
            { key: 'media', label: 'Média', render: (value) => `${value}%` },
            { key: 'participacao', label: 'Participação' },
          ]}
          data={secretaria.comparativoEscolas}
        />
      </AppCard>

      <AppCard title="Cadastro institucional usado nas aplicações">
        <DataTable
          columns={[
            { key: 'escola', label: 'Escola' },
            { key: 'municipio', label: 'Município' },
            { key: 'alunos', label: 'Alunos' },
            { key: 'diretor', label: 'Responsável' },
            { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
          ]}
          data={secretariaDemo.escolas}
        />
      </AppCard>
    </div>
  );
}
