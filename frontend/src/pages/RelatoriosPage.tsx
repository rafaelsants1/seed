import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { proofPerformanceDemo, secretariaDemo } from '../data/demoPortalData';

export function RelatoriosPage() {
  const secretaria = proofPerformanceDemo.secretaria;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resultados da Rede"
        breadcrumb={["Painel Macro", "Resultados da Rede"]}
        subtitle={`${secretaria.base}. A leitura institucional parte das provas aplicadas e dos simulados concluídos.`}
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Aplicações analisadas" value={secretaria.mediaPorProva.length} />
        <StatCard label="Escolas comparadas" value={secretaria.comparativoEscolas.length} />
        <StatCard label="Municípios comparados" value={secretaria.comparativoMunicipios.length} />
        <StatCard label="Relatórios disponíveis" value={secretariaDemo.relatorios.length} />
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <AppCard title="Média por aplicação">
          <DataTable
            columns={[
              { key: 'prova', label: 'Aplicação' },
              { key: 'media', label: 'Média', render: (value) => `${value}%` },
              { key: 'escolas', label: 'Escolas' },
            ]}
            data={secretaria.mediaPorProva}
          />
        </AppCard>

        <AppCard title="Comparação por município">
          <DataTable
            columns={[
              { key: 'municipio', label: 'Município' },
              { key: 'media', label: 'Média', render: (value) => `${value}%` },
              { key: 'escolas', label: 'Escolas' },
            ]}
            data={secretaria.comparativoMunicipios}
          />
        </AppCard>
      </div>

      <AppCard title="Acervo de resultados institucionais">
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
