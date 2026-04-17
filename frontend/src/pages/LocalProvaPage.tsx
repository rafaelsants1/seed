import { AppCard } from "../components/ui/AppCard";
import { PageHeader } from "../components/ui/PageHeader";

export function LocalProvaPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Local de Prova" breadcrumb={["Início", "Local de Prova"]} />

      <AppCard title="Informações da próxima aplicação">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[var(--color-text-muted)]">Prova</p>
            <p className="font-medium text-[var(--color-text-primary)]">Avaliação de Matemática</p>
          </div>
          <div>
            <p className="text-[var(--color-text-muted)]">Data</p>
            <p className="font-medium text-[var(--color-text-primary)]">20/05/2026</p>
          </div>
          <div>
            <p className="text-[var(--color-text-muted)]">Horário</p>
            <p className="font-medium text-[var(--color-text-primary)]">08:00</p>
          </div>
          <div>
            <p className="text-[var(--color-text-muted)]">Sala</p>
            <p className="font-medium text-[var(--color-text-primary)]">Bloco B - Sala 07</p>
          </div>
          <div className="col-span-2">
            <p className="text-[var(--color-text-muted)]">Local</p>
            <p className="font-medium text-[var(--color-text-primary)]">Escola Estadual João Alves</p>
            <p className="text-[var(--color-text-muted)]">Rua Exemplo, 245 - Centro - Aracaju/SE</p>
          </div>
        </div>
      </AppCard>

      <AppCard title="Orientações ao candidato">
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--color-text-primary)]">
          <li>Chegar com 30 minutos de antecedência.</li>
          <li>Apresentar documento oficial com foto.</li>
          <li>Levar caneta esferográfica azul ou preta.</li>
        </ul>
      </AppCard>
    </div>
  );
}
