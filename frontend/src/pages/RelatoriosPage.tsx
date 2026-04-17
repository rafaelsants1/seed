import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { secretariaDemo } from '../data/demoPortalData';

export function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios"
        breadcrumb={["Início", "Relatórios"]}
        subtitle="Exportações e painéis analíticos para acompanhamento da rede, com foco em gestão pública e tomada de decisão."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Relatórios disponíveis" value={secretariaDemo.relatorios.length} />
        <StatCard label="Atualizados hoje" value={2} />
        <StatCard label="Exportações em PDF" value={1} />
        <StatCard label="Painéis analíticos" value={1} />
      </div>

      <AppCard title="Acervo de relatórios institucionais">
        <DataTable
          columns={[
            { key: 'titulo', label: 'Relatório' },
            { key: 'periodo', label: 'Período' },
            { key: 'formato', label: 'Formato' },
            { key: 'atualizadoEm', label: 'Atualizado em' },
          ]}
          data={secretariaDemo.relatorios}
        />
      </AppCard>
    </div>
  );
}
