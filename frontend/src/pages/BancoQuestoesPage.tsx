import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { demoQuestionBank } from '../data/demoPortalData';

export function BancoQuestoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Banco de Questões"
        breadcrumb={["Início", "Banco de Questões"]}
        subtitle="Base institucional de itens para treino, simulados e avaliações formais da rede estadual."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Questões ativas" value={428} />
        <StatCard label="Aguardando revisão" value={17} />
        <StatCard label="Uso em simulados" value={263} />
        <StatCard label="Validadas por professor" value={391} />
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
        <AppCard title="Nova questão com apoio inteligente">
          <div className="space-y-4 text-sm text-[var(--color-text-primary)]">
            <div>
              <label className="mb-1 block font-medium">Enunciado</label>
              <div className="min-h-28 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-[var(--color-text-muted)]">
                Em uma turma com 32 alunos, 20 responderam corretamente uma questão de razão e proporção. Qual é a taxa percentual de acerto da turma?
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2 font-medium text-[var(--color-primary)]">Sugestões da IA</p>
                <div className="space-y-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
                  <div className="flex justify-between"><span>Disciplina</span><strong>Matemática</strong></div>
                  <div className="flex justify-between"><span>Assunto</span><strong>Razões e proporções</strong></div>
                  <div className="flex justify-between"><span>Dificuldade</span><strong>Média</strong></div>
                  <div className="flex justify-between"><span>Tipo de uso</span><strong>AMBOS</strong></div>
                </div>
              </div>

              <div>
                <p className="mb-2 font-medium text-[var(--color-primary)]">Tags sugeridas</p>
                <div className="flex flex-wrap gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
                  {['razão', 'percentual', '9º ano', 'diagnóstico', 'proporção'].map((tag) => (
                    <span key={tag} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                  A publicação permanece dependente de confirmação humana, conforme regra do projeto.
                </p>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Critérios de publicação">
          <div className="space-y-3 text-sm text-[var(--color-text-primary)]">
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <p className="font-medium">Revisão obrigatória</p>
              <p className="mt-1 text-[var(--color-text-muted)]">Toda sugestão automática deve ser validada pelo professor antes de entrar no banco oficial.</p>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <p className="font-medium">Classificação por tipo de uso</p>
              <p className="mt-1 text-[var(--color-text-muted)]">As questões podem ser marcadas para treino, simulado ou ambos, conforme o edital interno.</p>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <p className="font-medium">Rastreabilidade</p>
              <p className="mt-1 text-[var(--color-text-muted)]">Origem da questão, revisão humana e uso pedagógico ficam registrados para auditoria.</p>
            </div>
          </div>
        </AppCard>
      </div>

      <AppCard title="Itens disponíveis no banco">
        <DataTable
          columns={[
            { key: 'id', label: 'Código' },
            { key: 'disciplina', label: 'Disciplina' },
            { key: 'assunto', label: 'Assunto' },
            { key: 'dificuldade', label: 'Dificuldade' },
            { key: 'tipoUso', label: 'Tipo de uso' },
            { key: 'revisaoHumana', label: 'Revisão' },
            { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
          ]}
          data={demoQuestionBank}
        />
      </AppCard>
    </div>
  );
}
