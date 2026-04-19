import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-xl rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <div className="mb-8 text-center">
          <img
            src="/brand/seed-educa-v6-principal.svg"
            alt="SEED Educa"
            className="mx-auto mb-4 h-16 w-auto"
          />
          <p className="mb-1 text-sm text-[var(--color-text-muted)]">Secretaria de Educação</p>
          <h1 className="sr-only">SEED Educa</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Cadastro institucional de usuários
          </p>
        </div>

        <div className="space-y-5 text-sm text-[var(--color-text-muted)]">
          <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] p-4">
            <p className="font-medium text-[var(--color-text-primary)]">Cadastro controlado pela escola</p>
            <p className="mt-2 leading-6">
              O acesso de alunos e professores é criado internamente pela secretaria escolar,
              com base na matrícula ativa e nos vínculos registrados na unidade de ensino.
            </p>
          </div>

          <div className="rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="font-medium text-[var(--color-text-primary)]">Como obter acesso</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-6">
              <li>Aluno: solicite liberação de acesso na secretaria da sua escola.</li>
              <li>Professor: o vínculo é criado pela secretaria da unidade em que atua.</li>
              <li>Equipe de secretaria: o acesso administrativo deve ser habilitado pela gestão responsável.</li>
            </ul>
          </div>

          <div className="flex justify-center pt-2">
            <Link
              to="/login"
              className="rounded-sm bg-[var(--color-accent)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--color-accent)]/90"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
