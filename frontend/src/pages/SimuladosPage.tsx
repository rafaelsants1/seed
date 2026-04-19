import { useState } from "react";
import { Link } from "react-router-dom";

import { AppCard } from "../components/ui/AppCard";
import { EmptyState } from "../components/ui/EmptyState";
import { PageHeader } from "../components/ui/PageHeader";
import { useExams } from "../features/exams/hooks/useExams";
import type { Exam } from "../features/exams/types/exam.types";

const filters = ["Todos", "Matemática", "Lógica", "Português"];

function getDifficultyLabel(difficulty: Exam["difficulty"]) {
  if (difficulty === "easy") return "Fácil";
  if (difficulty === "medium") return "Médio";
  return "Difícil";
}

function getDifficultyStyles(difficulty: Exam["difficulty"]) {
  if (difficulty === "easy") return "bg-[var(--color-success)]/10 text-[var(--color-success)]";
  if (difficulty === "medium") return "bg-[var(--color-warning)]/10 text-[var(--color-warning)]";
  return "bg-[var(--color-error)]/10 text-[var(--color-error)]";
}

export function SimuladosPage() {
  const { exams, isLoading } = useExams();
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredExams =
    activeFilter === "Todos"
      ? exams
      : exams.filter((exam) => exam.subject === activeFilter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Simulados"
        breadcrumb={["Início", "Simulados"]}
        subtitle="Simulados inteligentes concluídos também alimentam o diagnóstico por IA."
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "whitespace-nowrap rounded-sm border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]",
              ].join(" ")}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <AppCard>
          <p className="text-sm text-[var(--color-text-muted)]">Carregando simulados disponíveis...</p>
        </AppCard>
      ) : filteredExams.length === 0 ? (
        <EmptyState
          title="Nenhum simulado encontrado"
          description="Não há simulados disponíveis para o filtro selecionado."
        />
      ) : (
        <div className="space-y-4">
          {filteredExams.map((exam) => (
            <Link key={exam.id} to={`/simulados/${exam.id}`}>
              <AppCard className="border-l-4 border-l-[var(--color-accent)] transition-colors hover:border-l-[var(--color-primary)]">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className={["rounded-sm px-3 py-1 text-xs font-semibold", getDifficultyStyles(exam.difficulty)].join(" ")}>
                        {getDifficultyLabel(exam.difficulty)}
                      </span>

                      <span className="rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
                        {exam.subject}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                      {exam.title}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                      {exam.description}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-base font-semibold text-[var(--color-text-primary)]">
                      {exam.duration} min
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {exam.questions} questões
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Resultado será usado no diagnóstico por tópico.
                  </p>

                  <span className="rounded-sm bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary)]">
                    Iniciar
                  </span>
                </div>
              </AppCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
