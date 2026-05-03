import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { professorDemo, proofPerformanceDemo } from '../data/demoPortalData';
import { Link } from 'react-router-dom';

export function NotasPage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'aluno') {
    const student = proofPerformanceDemo.aluno;

    return (
      <div className="space-y-6">
        <PageHeader
          title="Resultados"
          breadcrumb={["Início", "Resultados"]}
          subtitle={`${student.base}. Cada resultado alimenta o diagnóstico por IA e a recomendação de estudo.`}
        />

        <div className="flex justify-end">
          <Link to="/diagnostico" className="rounded-sm border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-background)]">
            Ver análise detalhada
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Provas concluídas" value={student.provasRecentes.length} />
          <StatCard label="Melhor resultado" value={`${Math.max(...student.provasRecentes.map((item) => item.nota))}%`} />
          <StatCard label="Tópicos com recomendação" value={student.lacunasPorTopico.length} />
        </div>

        <AppCard title="Resultados por prova e simulado concluído">
          <DataTable
            columns={[
              { key: 'prova', label: 'Prova' },
              { key: 'tipo', label: 'Tipo' },
              { key: 'data', label: 'Data' },
              { key: 'disciplina', label: 'Disciplina' },
              { key: 'acertos', label: 'Acertos', render: (_, row) => `${row.acertos}/${row.total}` },
              { key: 'nota', label: 'Resultado', render: (value) => `${value}%` },
            ]}
            data={student.provasRecentes}
          />
        </AppCard>

        <AppCard title="Baseado nesta prova" variant="compact">
          <p className="text-sm text-[var(--color-text-muted)]">
            A análise detalhada mostra lacunas por tópico, comparação com a média e recomendação de estudo.
          </p>
        </AppCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resultados"
        breadcrumb={["Painel de Provas", "Resultados"]}
        subtitle={`${proofPerformanceDemo.professor.base}. Correções pendentes bloqueiam a consolidação do diagnóstico da turma.`}
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Correções pendentes" value={professorDemo.notasPendentes.length} />
        <StatCard label="Alunos aguardando resultado" value={24} />
        <StatCard label="Provas consolidadas" value={proofPerformanceDemo.professor.desempenhoPorTurma.length} />
      </div>

      <AppCard title="Correções e resultados pendentes">
        <DataTable
          columns={[
            { key: 'prova', label: 'Prova' },
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
