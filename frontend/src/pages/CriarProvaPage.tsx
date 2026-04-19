import { Link } from 'react-router-dom';
import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { professorDemo } from '../data/demoPortalData';

export function CriarProvaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Montar Prova"
        breadcrumb={["Painel de Provas", "Montar Prova"]}
        subtitle="Montagem de provas e simulados a partir do banco de questões revisado."
        action={
          <Link to="/banco-questoes" className="rounded-sm border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-background)]">
            Abrir banco de questões
          </Link>
        }
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Provas planejadas" value={professorDemo.provasPlanejadas.length} />
        <StatCard label="Itens no banco" value={428} />
        <StatCard label="Questões validadas" value={391} />
        <StatCard label="Pool mínimo crítico" value="2 turmas" />
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
        <AppCard title="Provas em preparação">
          <DataTable
            columns={[
              { key: 'titulo', label: 'Prova' },
              { key: 'turma', label: 'Turma' },
              { key: 'data', label: 'Data' },
              { key: 'questoes', label: 'Questões' },
              { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
            ]}
            data={professorDemo.provasPlanejadas}
          />
        </AppCard>

        <AppCard title="Regras de montagem">
          <div className="space-y-3 text-sm text-[var(--color-text-primary)]">
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <p className="font-medium">Pool mínimo</p>
              <p className="mt-1 text-[var(--color-text-muted)]">Alertar quando o banco não tiver variedade suficiente para montar a prova ou o simulado.</p>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <p className="font-medium">Embaralhamento por aluno</p>
              <p className="mt-1 text-[var(--color-text-muted)]">A ordem dos itens é individualizada para reduzir repetição e compartilhamento indevido.</p>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <p className="font-medium">Revisão antes da publicação</p>
              <p className="mt-1 text-[var(--color-text-muted)]">Disciplina, assunto, dificuldade e tags sugeridos pela IA precisam de confirmação humana.</p>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
