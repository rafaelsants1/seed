import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { professorDemo, proofPerformanceDemo, secretariaDemo } from '../data/demoPortalData';

export function AvaliacoesPage() {
  const { user } = useAuth();

  if (!user) return null;

  const isProfessor = user.role === 'professor';
  const title = isProfessor ? 'Aplicações' : 'Aplicações Institucionais';
  const subtitle = isProfessor
    ? 'Acompanhamento das provas aplicadas às turmas vinculadas ao professor.'
    : 'Acompanhamento institucional das provas previstas, em andamento e consolidadas na rede.';
  const data = isProfessor
    ? professorDemo.provasPlanejadas.map((item) => ({
        nome: item.titulo,
        abrangencia: item.turma,
        data: item.data,
        situacao: item.status,
      }))
    : secretariaDemo.avaliacoes;

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        breadcrumb={[isProfessor ? "Painel de Provas" : "Painel Macro", "Aplicações"]}
        subtitle={subtitle}
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Aplicações previstas" value={data.length} />
        <StatCard label="Em andamento" value={1} />
        <StatCard label={isProfessor ? 'Turmas envolvidas' : 'Escolas envolvidas'} value={isProfessor ? 3 : 12} />
        <StatCard label="Resultados consolidados" value={isProfessor ? proofPerformanceDemo.professor.desempenhoPorTurma.length : proofPerformanceDemo.secretaria.mediaPorProva.length} />
      </div>

      <AppCard title="Calendário de aplicações de prova">
        <DataTable
          columns={[
            { key: 'nome', label: 'Prova' },
            { key: 'abrangencia', label: isProfessor ? 'Turma' : 'Abrangência' },
            { key: 'data', label: 'Data' },
            { key: 'situacao', label: 'Situação', render: (_, row) => <StatusBadge status={row.situacao} /> },
          ]}
          data={data}
        />
      </AppCard>
    </div>
  );
}
