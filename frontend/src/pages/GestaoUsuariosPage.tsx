import { AppCard } from "../components/ui/AppCard";
import { PageHeader } from "../components/ui/PageHeader";
import { DataTable } from "../components/ui/DataTable";
import { StatusBadge } from "../components/ui/StatusBadge";
import { StatCard } from "../components/ui/StatCard";

const mockUsuarios = [
  {
    id: 1,
    nome: "Ana Beatriz Santos",
    perfil: "Aluno",
    matricula: "202400123",
    escola: "Escola Estadual João Alves",
    status: "ativo" as const,
  },
  {
    id: 2,
    nome: "Carlos Henrique Lima",
    perfil: "Professor",
    matricula: "PROF-0187",
    escola: "Escola Estadual João Alves",
    status: "pendente" as const,
  },
  {
    id: 3,
    nome: "Mariana Souza Oliveira",
    perfil: "Aluno",
    matricula: "202400278",
    escola: "Escola Estadual Maria Quitéria",
    status: "ativo" as const,
  },
  {
    id: 4,
    nome: "José Ricardo Menezes",
    perfil: "Professor",
    matricula: "PROF-0221",
    escola: "Escola Estadual Maria Quitéria",
    status: "encerrado" as const,
  },
];

export function GestaoUsuariosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão de Usuários"
        breadcrumb={["Início", "Secretaria", "Gestão de Usuários"]}
        subtitle="Cadastro institucional de alunos e professores com vínculo por matrícula e controle de acesso."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="Usuários Ativos" value={38} />
        <StatCard label="Alunos Cadastrados" value={26} />
        <StatCard label="Professores Cadastrados" value={12} />
        <StatCard label="Acessos Pendentes" value={4} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AppCard title="Cadastro de Aluno">
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Informe o nome do aluno"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Matrícula
              </label>
              <input
                type="text"
                placeholder="Número da matrícula"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Turma
              </label>
              <input
                type="text"
                placeholder="Ex.: 9º Ano A"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Escola
              </label>
              <input
                type="text"
                placeholder="Nome da unidade escolar"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button
                type="button"
                className="rounded-sm bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
              >
                Salvar aluno
              </button>
              <button
                type="button"
                className="rounded-sm border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-primary)]"
              >
                Limpar
              </button>
            </div>
          </form>
        </AppCard>

        <AppCard title="Cadastro de Professor">
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Informe o nome do professor"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Matrícula funcional
              </label>
              <input
                type="text"
                placeholder="Código funcional"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Disciplina
              </label>
              <input
                type="text"
                placeholder="Ex.: Matemática"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[var(--color-primary)]">
                Escola
              </label>
              <input
                type="text"
                placeholder="Nome da unidade escolar"
                className="w-full rounded-sm border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button
                type="button"
                className="rounded-sm bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
              >
                Salvar professor
              </button>
              <button
                type="button"
                className="rounded-sm border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-primary)]"
              >
                Limpar
              </button>
            </div>
          </form>
        </AppCard>
      </div>

      <AppCard title="Usuários Vinculados">
        <DataTable
          columns={[
            { key: "nome", label: "Nome" },
            { key: "perfil", label: "Perfil" },
            { key: "matricula", label: "Matrícula" },
            { key: "escola", label: "Escola" },
            {
              key: "status",
              label: "Status",
              render: (_, row) => <StatusBadge status={row.status} />,
            },
          ]}
          data={mockUsuarios}
        />
      </AppCard>

      <AppCard title="Regras de Vinculação" variant="compact">
        <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
          <p>
            O acesso do aluno é criado com base na matrícula escolar ativa na unidade de ensino.
          </p>
          <p>
            O acesso do professor é vinculado ao registro funcional e à lotação informada pela secretaria.
          </p>
          <p>
            A publicação do acesso no sistema depende da validação administrativa da escola.
          </p>
        </div>
      </AppCard>
    </div>
  );
}