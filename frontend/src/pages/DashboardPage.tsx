import { useAuth } from "../context/AuthContext";
import { StatCard } from "../components/ui/StatCard";
import { AppCard } from "../components/ui/AppCard";
import { PageHeader } from "../components/ui/PageHeader";
import { DataTable } from "../components/ui/DataTable";
import { StatusBadge } from "../components/ui/StatusBadge";

// Mock data for demonstration
const mockStudentData = {
  provasRealizadas: 12,
  mediaGeral: 78,
  proximaProva: "15/05",
  ultimasProvas: [
    { id: 1, nome: "Simulado Matemática", data: "10/04", nota: 85, status: "encerrado" as const },
    { id: 2, nome: "Simulado Português", data: "03/04", nota: 72, status: "encerrado" as const },
    { id: 3, nome: "Simulado Ciências", data: "28/03", nota: 90, status: "encerrado" as const },
  ],
  desempenhoPorComponente: [
    { subject: "Matemática", score: 85 },
    { subject: "Português", score: 72 },
    { subject: "Ciências", score: 90 },
    { subject: "História", score: 68 },
    { subject: "Geografia", score: 75 },
  ],
};

const mockProfessorData = {
  turmasAtivas: 5,
  provasCriadas: 23,
  mediaTurma: 74,
  turmas: [
    { id: 1, nome: "9º Ano A", alunos: 32, media: 78 },
    { id: 2, nome: "9º Ano B", alunos: 28, media: 72 },
    { id: 3, nome: "1º Médio A", alunos: 35, media: 80 },
  ],
  notasPendentes: [
    { id: 1, prova: "Simulado Matemática", turma: "9º Ano A", vencimento: "12/04" },
    { id: 2, prova: "Simulado Português", turma: "9º Ano B", vencimento: "14/04" },
  ],
};

const mockSecretariaData = {
  totalAlunos: 1250,
  escolas: 12,
  provasAplicadas: 156,
  mediaEstadual: 71,
  desempenhoPorEscola: [
    { id: 1, escola: "Escola Estadual A", alunos: 450, media: 78, status: "ativo" as const },
    { id: 2, escola: "Escola Estadual B", alunos: 320, media: 65, status: "ativo" as const },
    { id: 3, escola: "Escola Estadual C", alunos: 280, media: 82, status: "ativo" as const },
    { id: 4, escola: "Escola Estadual D", alunos: 200, media: 70, status: "encerrado" as const },
  ],
  alertas: [
    { id: 1, tipo: "Baixo desempenho", escola: "Escola Estadual B", descricao: "Média abaixo de 65%" },
    { id: 2, tipo: "Atraso", escola: "Escola Estadual D", descricao: "Relatório pendente" },
  ],
  proximasAvaliacoes: [
    { id: 1, nome: "Avaliação Bimestral 1", data: "20/04", escolas: 12 },
    { id: 2, nome: "Avaliação Bimestral 2", data: "15/05", escolas: 12 },
  ],
};

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const renderDashboardByRole = () => {
    switch (user.role) {
      case 'aluno':
        return (
          <>
            {/* Row 1: 3x StatCard */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard label="Provas Realizadas" value={mockStudentData.provasRealizadas} />
              <StatCard label="Média Geral" value={`${mockStudentData.mediaGeral}%`} />
              <StatCard label="Próxima Prova" value={mockStudentData.proximaProva} />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <AppCard title="Últimas Provas">
                <DataTable
                  columns={[
                    { key: 'nome', label: 'Prova' },
                    { key: 'data', label: 'Data' },
                    { key: 'nota', label: 'Nota' },
                    { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
                  ]}
                  data={mockStudentData.ultimasProvas}
                />
              </AppCard>

              <AppCard title="Desempenho por Componente">
                <div className="space-y-2">
                  {mockStudentData.desempenhoPorComponente.map((item) => (
                    <div key={item.subject} className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">{item.subject}</span>
                      <span className="font-medium text-[var(--color-primary)]">{item.score}%</span>
                    </div>
                  ))}
                </div>
              </AppCard>
            </div>
          </>
        );

      case 'professor':
        return (
          <>
            {/* Row 1: 3x StatCard */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard label="Turmas Ativas" value={mockProfessorData.turmasAtivas} />
              <StatCard label="Provas Criadas" value={mockProfessorData.provasCriadas} />
              <StatCard label="Média da Turma" value={`${mockProfessorData.mediaTurma}%`} />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <AppCard title="Turmas">
                <DataTable
                  columns={[
                    { key: 'nome', label: 'Turma' },
                    { key: 'alunos', label: 'Alunos' },
                    { key: 'media', label: 'Média' },
                  ]}
                  data={mockProfessorData.turmas}
                />
              </AppCard>

              <AppCard title="Notas Pendentes">
                <div className="space-y-3">
                  {mockProfessorData.notasPendentes.map((item) => (
                    <div key={item.id} className="p-3 bg-[var(--color-background)] rounded-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.prova}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">{item.turma}</p>
                        </div>
                        <span className="text-xs text-[var(--color-error)]">Vence: {item.vencimento}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AppCard>
            </div>
          </>
        );

      case 'secretaria':
        return (
          <>
            {/* Row 1: 4x StatCard */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <StatCard label="Total Alunos" value={mockSecretariaData.totalAlunos} />
              <StatCard label="Escolas" value={mockSecretariaData.escolas} />
              <StatCard label="Provas Aplicadas" value={mockSecretariaData.provasAplicadas} />
              <StatCard label="Média Estadual" value={`${mockSecretariaData.mediaEstadual}%`} />
            </div>

            {/* Row 2: full-width */}
            <AppCard title="Desempenho por Escola" variant="default">
              <DataTable
                columns={[
                  { key: 'escola', label: 'Escola' },
                  { key: 'alunos', label: 'Alunos' },
                  { key: 'media', label: 'Média' },
                  { key: 'status', label: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
                ]}
                data={mockSecretariaData.desempenhoPorEscola}
              />
            </AppCard>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4">
              <AppCard title="Alertas">
                <div className="space-y-3">
                  {mockSecretariaData.alertas.map((alert) => (
                    <div key={alert.id} className="p-3 bg-[var(--color-background)] rounded-sm border-l-4 border-[var(--color-warning)]">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{alert.tipo}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{alert.escola}: {alert.descricao}</p>
                    </div>
                  ))}
                </div>
              </AppCard>

              <AppCard title="Próximas Avaliações">
                <div className="space-y-3">
                  {mockSecretariaData.proximasAvaliacoes.map((avaliacao) => (
                    <div key={avaliacao.id} className="flex items-center justify-between p-3 bg-[var(--color-background)] rounded-sm">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{avaliacao.nome}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{avaliacao.escolas} escolas</p>
                      </div>
                      <span className="text-sm font-medium text-[var(--color-accent)]">{avaliacao.data}</span>
                    </div>
                  ))}
                </div>
              </AppCard>
            </div>
          </>
        );

      default:
        return <div className="text-[var(--color-text-muted)]">Dashboard não disponível para este perfil</div>;
    }
  };

  return (
    <div>
      <PageHeader title="Painel" breadcrumb={['Início']} />
      {renderDashboardByRole()}
    </div>
  );
}
