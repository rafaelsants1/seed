import { AppCard } from "../components/ui/AppCard";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { demoQuestionBank, professorDemo, proofPerformanceDemo, secretariaDemo } from "../data/demoPortalData";

function ErrorBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-28 rounded-sm bg-[var(--color-border)]">
        <div className="h-2 rounded-sm bg-[var(--color-accent)]" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium text-[var(--color-primary)]">{value}%</span>
    </div>
  );
}

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'aluno') {
    const student = proofPerformanceDemo.aluno;
    const latestExam = student.provasRecentes[0];
    const nextExam = { nome: 'Avaliacao de Matematica', data: '20/05/2026', horario: '08:00' };

    return (
      <div className="space-y-6">
        <PageHeader
          title="Resumo das Minhas Provas"
          breadcrumb={['Inicio']}
          subtitle={student.base}
        />

        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Proxima prova" value={nextExam.data} />
          <StatCard label="Prova em andamento" value="1 disponivel" />
          <StatCard label="Simulados disponiveis" value={4} />
          <StatCard label="Ultimo resultado" value={`${latestExam.nota}%`} />
        </div>

        <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
          <AppCard title="Seu desempenho nas ultimas provas">
            <DataTable
              columns={[
                { key: 'prova', label: 'Prova' },
                { key: 'tipo', label: 'Tipo' },
                { key: 'acertos', label: 'Acertos', render: (_, row) => `${row.acertos}/${row.total}` },
                { key: 'nota', label: 'Resultado', render: (value) => `${value}%` },
              ]}
              data={student.provasRecentes}
            />
          </AppCard>

          <AppCard title="Principais dificuldades por topico">
            <div className="space-y-4">
              {student.lacunasPorTopico.map((item) => (
                <div key={item.topico} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.topico}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{item.disciplina}</p>
                    </div>
                    <ErrorBar value={item.erro} />
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-text-muted)]">{item.recomendacao}</p>
                </div>
              ))}
            </div>
          </AppCard>
        </div>

        <AppCard title="Proxima aplicacao">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-[var(--color-text-muted)]">Prova</p>
              <p className="font-medium text-[var(--color-text-primary)]">{nextExam.nome}</p>
            </div>
            <div>
              <p className="text-[var(--color-text-muted)]">Data</p>
              <p className="font-medium text-[var(--color-text-primary)]">{nextExam.data}</p>
            </div>
            <div>
              <p className="text-[var(--color-text-muted)]">Horario</p>
              <p className="font-medium text-[var(--color-text-primary)]">{nextExam.horario}</p>
            </div>
            <div>
              <p className="text-[var(--color-text-muted)]">Impacto</p>
              <p className="font-medium text-[var(--color-primary)]">Atualiza o diagnostico</p>
            </div>
          </div>
        </AppCard>
      </div>
    );
  }

  if (user.role === 'professor') {
    const professor = proofPerformanceDemo.professor;
    const pendingQuestions = demoQuestionBank.filter((item) => item.status === 'pendente').length;
    const nextApplications = professorDemo.provasPlanejadas.filter((item) => item.status === 'agendado').length;

    return (
      <div className="space-y-6">
        <PageHeader
          title="Painel de Provas"
          breadcrumb={['Painel de Provas']}
          subtitle={professor.base}
        />

        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Provas em preparacao" value={professorDemo.provasPlanejadas.length} />
          <StatCard label="Aplicacoes proximas" value={nextApplications} />
          <StatCard label="Questoes em revisao" value={pendingQuestions} />
          <StatCard label="Correcoes pendentes" value={professorDemo.notasPendentes.length} />
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <AppCard title="Topicos com maior erro na turma">
            <DataTable
              columns={[
                { key: 'topico', label: 'Topico' },
                { key: 'disciplina', label: 'Disciplina' },
                { key: 'turma', label: 'Turma' },
                { key: 'erro', label: 'Erro', render: (value) => <ErrorBar value={Number(value)} /> },
              ]}
              data={professor.topicosCriticos}
            />
          </AppCard>

          <AppCard title="Alunos em risco (baseado em prova)">
            <DataTable
              columns={[
                { key: 'aluno', label: 'Aluno' },
                { key: 'turma', label: 'Turma' },
                { key: 'media', label: 'Media', render: (value) => `${value}%` },
                { key: 'principalTopico', label: 'Topico critico' },
              ]}
              data={professor.alunosEmRisco}
            />
          </AppCard>
        </div>

        <AppCard title="Provas em preparacao">
          <DataTable
            columns={[
              { key: 'titulo', label: 'Prova' },
              { key: 'turma', label: 'Turma' },
              { key: 'data', label: 'Data' },
              { key: 'questoes', label: 'Questoes' },
              { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
            ]}
            data={professorDemo.provasPlanejadas}
          />
        </AppCard>
      </div>
    );
  }

  const secretaria = proofPerformanceDemo.secretaria;
  const operationalAlerts = [
    { alerta: 'Baixa participacao', escola: 'Centro de Ensino Frei Paulo', aplicacao: 'Simulado SEED Educa', impacto: '81% de presenca' },
    { alerta: 'Resultado abaixo da media', escola: 'Escola Estadual Valadares', aplicacao: 'Simulado SEED Educa', impacto: '62% de media' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Painel Macro"
        breadcrumb={['Painel Macro']}
        subtitle={secretaria.base}
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Aplicacoes em andamento" value={1} />
        <StatCard label="Aplicacoes previstas" value={secretariaDemo.avaliacoes.length} />
        <StatCard label="Provas publicadas" value={156} />
        <StatCard label="Escolas abaixo da media" value={secretaria.escolasAbaixoMedia.length} />
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <AppCard title="Desempenho por aplicacao">
          <DataTable
            columns={[
              { key: 'prova', label: 'Aplicacao' },
              { key: 'media', label: 'Media', render: (value) => `${value}%` },
              { key: 'escolas', label: 'Escolas' },
            ]}
            data={secretaria.mediaPorProva}
          />
        </AppCard>

        <AppCard title="Escolas abaixo da media">
          <DataTable
            columns={[
              { key: 'escola', label: 'Escola' },
              { key: 'municipio', label: 'Municipio' },
              { key: 'prova', label: 'Prova' },
              { key: 'media', label: 'Media', render: (value) => `${value}%` },
            ]}
            data={secretaria.escolasAbaixoMedia}
          />
        </AppCard>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <AppCard title="Participacao por escola">
          <DataTable
            columns={[
              { key: 'escola', label: 'Escola' },
              { key: 'aplicacao', label: 'Aplicacao' },
              { key: 'participacao', label: 'Participacao' },
              { key: 'media', label: 'Media', render: (value) => `${value}%` },
            ]}
            data={secretaria.comparativoEscolas}
          />
        </AppCard>

        <AppCard title="Alertas operacionais de prova">
          <DataTable
            columns={[
              { key: 'alerta', label: 'Alerta' },
              { key: 'escola', label: 'Escola' },
              { key: 'aplicacao', label: 'Aplicacao' },
              { key: 'impacto', label: 'Impacto' },
            ]}
            data={operationalAlerts}
          />
        </AppCard>
      </div>
    </div>
  );
}
