import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppCard } from "../components/ui/AppCard";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { useAuth } from "../context/AuthContext";
import { proofPerformanceDemo } from "../data/demoPortalData";

function PercentBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-28 rounded-sm bg-[var(--color-border)]">
        <div className="h-2 rounded-sm bg-[var(--color-accent)]" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium text-[var(--color-primary)]">{value}%</span>
    </div>
  );
}

export function PerformancePage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'aluno') {
    const student = proofPerformanceDemo.aluno;
    const average =
      Math.round(student.provasRecentes.reduce((total, item) => total + item.nota, 0) / student.provasRecentes.length);
    const mainGap = student.lacunasPorTopico[0];

    return (
      <div className="space-y-6">
        <PageHeader
          title="Diagnóstico e Desempenho"
          breadcrumb={['Início', 'Diagnóstico']}
          subtitle={student.base}
        />

        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Média nas provas" value={`${average}%`} />
          <StatCard label="Provas consideradas" value={student.provasRecentes.length} />
          <StatCard label="Maior lacuna" value={mainGap.topico} />
          <StatCard label="Disciplina com mais erro" value={student.disciplinasComMaiorErro[0].disciplina} />
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <AppCard title="Evolução ao longo das provas">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={student.evolucao} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#e0e0e0" vertical={false} />
                  <XAxis dataKey="prova" tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="nota" stroke="#2C6DB5" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </AppCard>

          <AppCard title="Disciplinas com maior erro">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={student.disciplinasComMaiorErro} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#e0e0e0" vertical={false} />
                  <XAxis dataKey="disciplina" tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="erro" fill="#2C6DB5" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AppCard>
        </div>

        <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
          <AppCard title="Acertos por prova recente">
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

          <AppCard title="Lacunas e recomendação de estudo">
            <div className="space-y-3">
              {student.lacunasPorTopico.map((item) => (
                <div key={item.topico} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.topico}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{item.disciplina}</p>
                    </div>
                    <PercentBar value={item.erro} />
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-text-muted)]">{item.recomendacao}</p>
                </div>
              ))}
            </div>
          </AppCard>
        </div>
      </div>
    );
  }

  if (user.role === 'professor') {
    const professor = proofPerformanceDemo.professor;
    const average =
      Math.round(professor.desempenhoPorTurma.reduce((total, item) => total + item.media, 0) / professor.desempenhoPorTurma.length);

    return (
      <div className="space-y-6">
        <PageHeader
          title="Diagnóstico da Turma"
          breadcrumb={['Painel de Provas', 'Diagnóstico da Turma']}
          subtitle={professor.base}
        />

        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Média das turmas" value={`${average}%`} />
          <StatCard label="Turmas avaliadas" value={professor.desempenhoPorTurma.length} />
          <StatCard label="Tópicos críticos" value={professor.topicosCriticos.length} />
          <StatCard label="Alunos em risco" value={professor.alunosEmRisco.length} />
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <AppCard title="Desempenho por turma">
            <DataTable
              columns={[
                { key: 'turma', label: 'Turma' },
                { key: 'provas', label: 'Provas' },
                { key: 'participacao', label: 'Participação' },
                { key: 'media', label: 'Média', render: (value) => `${value}%` },
              ]}
              data={professor.desempenhoPorTurma}
            />
          </AppCard>

          <AppCard title="Distribuição de acertos por questão">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={professor.acertosPorQuestao} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#e0e0e0" vertical={false} />
                  <XAxis dataKey="questao" tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="acerto" fill="#2C6DB5" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AppCard>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <AppCard title="Tópicos críticos da turma">
            <DataTable
              columns={[
                { key: 'topico', label: 'Tópico' },
                { key: 'disciplina', label: 'Disciplina' },
                { key: 'turma', label: 'Turma' },
                { key: 'erro', label: 'Erro', render: (value) => <PercentBar value={Number(value)} /> },
              ]}
              data={professor.topicosCriticos}
            />
          </AppCard>

          <AppCard title="Alunos com risco de baixo desempenho">
            <DataTable
              columns={[
                { key: 'aluno', label: 'Aluno' },
                { key: 'turma', label: 'Turma' },
                { key: 'media', label: 'Média', render: (value) => `${value}%` },
                { key: 'principalTopico', label: 'Tópico crítico' },
              ]}
              data={professor.alunosEmRisco}
            />
          </AppCard>
        </div>
      </div>
    );
  }

  const secretaria = proofPerformanceDemo.secretaria;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Diagnóstico e Desempenho"
        breadcrumb={['Painel Macro', 'Diagnóstico']}
        subtitle={secretaria.base}
      />

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Aplicações analisadas" value={secretaria.mediaPorProva.length} />
        <StatCard label="Média do simulado SEED Educa" value={`${secretaria.mediaPorProva[1].media}%`} />
        <StatCard label="Escolas abaixo da média" value={secretaria.escolasAbaixoMedia.length} />
        <StatCard label="Maior dificuldade" value={secretaria.disciplinasComMaiorDificuldade[0].disciplina} />
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <AppCard title="Média por prova">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={secretaria.mediaPorProva} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="prova" tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="media" fill="#2C6DB5" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AppCard>

        <AppCard title="Disciplinas com maior dificuldade">
          <DataTable
            columns={[
              { key: 'disciplina', label: 'Disciplina' },
              { key: 'erro', label: 'Erro médio', render: (value) => <PercentBar value={Number(value)} /> },
            ]}
            data={secretaria.disciplinasComMaiorDificuldade}
          />
        </AppCard>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <AppCard title="Comparação entre escolas">
          <DataTable
            columns={[
              { key: 'escola', label: 'Escola' },
              { key: 'municipio', label: 'Município' },
              { key: 'media', label: 'Média', render: (value) => `${value}%` },
              { key: 'participacao', label: 'Participação' },
            ]}
            data={secretaria.comparativoEscolas}
          />
        </AppCard>

        <AppCard title="Comparação entre municípios">
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
    </div>
  );
}
