import { AppCard } from "../components/ui/AppCard";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";

const provas = [
  { id: 1, nome: 'Avaliação de Matemática', disciplina: 'Matemática', data: '20/05/2026', situacao: 'disponível', acao: 'Iniciar' },
  { id: 2, nome: 'Avaliação de Português', disciplina: 'Português', data: '24/05/2026', situacao: 'agendado', acao: 'Ver detalhes' },
  { id: 3, nome: 'Simulado de Ciências', disciplina: 'Ciências', data: '02/04/2026', situacao: 'encerrado', acao: 'Consultar resultado' },
];

const normalizeStatus = (value: string) => {
  if (value === 'disponível') return 'ativo';
  if (value === 'agendado') return 'agendado';
  return 'encerrado';
};

export function ProvasPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Minhas Provas" breadcrumb={["Início", "Minhas Provas"]} />

      <AppCard title="Provas cadastradas para o aluno">
        <DataTable
          columns={[
            { key: 'nome', label: 'Prova' },
            { key: 'disciplina', label: 'Disciplina' },
            { key: 'data', label: 'Data' },
            {
              key: 'situacao',
              label: 'Situação',
              render: (value) => <StatusBadge status={normalizeStatus(String(value)) as any} />,
            },
            { key: 'acao', label: 'Ação' },
          ]}
          data={provas}
        />
      </AppCard>
    </div>
  );
}
