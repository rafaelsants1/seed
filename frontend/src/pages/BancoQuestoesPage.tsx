import { AppCard } from '../components/ui/AppCard';
import { DataTable } from '../components/ui/DataTable';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { demoQuestionBank } from '../data/demoPortalData';

const topicCoverage = [
  { topico: 'Razões e proporções', disciplina: 'Matemática', itensAptos: 18, minimo: 12, situacao: 'Cobertura adequada' },
  { topico: 'Inferência textual', disciplina: 'Língua Portuguesa', itensAptos: 9, minimo: 12, situacao: 'Cobertura insuficiente' },
  { topico: 'Ecossistemas', disciplina: 'Ciências', itensAptos: 14, minimo: 10, situacao: 'Cobertura adequada' },
];

const filters = {
  disciplinas: ['Matemática', 'Língua Portuguesa', 'Ciências', 'História'],
  topicos: ['Razões e proporções', 'Interpretação textual', 'Ecossistemas'],
  dificuldades: ['Baixa', 'Média', 'Alta'],
  usos: ['Prova online', 'Simulado inteligente', 'Treino'],
};

export function BancoQuestoesPage() {
  const activeItems = demoQuestionBank.filter((item) => item.status === 'ativo').length;
  const reviewItems = demoQuestionBank.filter((item) => item.status === 'pendente').length;
  const insufficientTopics = topicCoverage.filter((item) => item.itensAptos < item.minimo).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banco de Questões"
        breadcrumb={["Painel de Provas", "Banco de Questões"]}
        subtitle="Origem da montagem de provas e simulados. A IA apoia a classificação, mas a publicação depende de revisão humana."
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Itens aptos para prova" value={activeItems} />
        <StatCard label="Itens em revisão" value={reviewItems} />
        <StatCard label="Uso em simulados" value={263} />
        <StatCard label="Tópicos com baixa cobertura" value={insufficientTopics} />
      </div>

      <AppCard title="Filtros para montagem de prova">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="mb-2 font-medium text-[var(--color-primary)]">Disciplina</p>
            <div className="flex flex-wrap gap-2">
              {filters.disciplinas.map((item) => (
                <span key={item} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs text-[var(--color-text-muted)]">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-medium text-[var(--color-primary)]">Tópico</p>
            <div className="flex flex-wrap gap-2">
              {filters.topicos.map((item) => (
                <span key={item} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs text-[var(--color-text-muted)]">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-medium text-[var(--color-primary)]">Dificuldade</p>
            <div className="flex flex-wrap gap-2">
              {filters.dificuldades.map((item) => (
                <span key={item} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs text-[var(--color-text-muted)]">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-medium text-[var(--color-primary)]">Uso</p>
            <div className="flex flex-wrap gap-2">
              {filters.usos.map((item) => (
                <span key={item} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs text-[var(--color-text-muted)]">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </AppCard>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
        <AppCard title="Classificação assistida por IA">
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
                  <div className="flex justify-between"><span>Tópico</span><strong>Razões e proporções</strong></div>
                  <div className="flex justify-between"><span>Dificuldade</span><strong>Média</strong></div>
                  <div className="flex justify-between"><span>Uso sugerido</span><strong>Prova e simulado</strong></div>
                </div>
              </div>

              <div>
                <p className="mb-2 font-medium text-[var(--color-primary)]">Revisão humana</p>
                <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-[var(--color-text-muted)]">
                  A questão só fica apta para montagem de prova depois da validação do professor. Esse registro preserva origem, revisão e uso em aplicação.
                </div>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Cobertura por tópico">
          <DataTable
            columns={[
              { key: 'topico', label: 'Tópico' },
              { key: 'disciplina', label: 'Disciplina' },
              { key: 'itensAptos', label: 'Aptos' },
              { key: 'situacao', label: 'Situação' },
            ]}
            data={topicCoverage}
          />
        </AppCard>
      </div>

      <AppCard title="Itens disponíveis para montagem">
        <DataTable
          columns={[
            { key: 'id', label: 'Código' },
            { key: 'disciplina', label: 'Disciplina' },
            { key: 'assunto', label: 'Tópico' },
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
