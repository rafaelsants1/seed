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
  if (difficulty === "easy") return "bg-green-100 text-green-700";
  if (difficulty === "medium") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export function SimuladosPage() {
  const { exams, isLoading } = useExams();
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredExams =
    activeFilter === "Todos"
      ? exams
      : exams.filter((exam) => exam.subject === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-8">
      <PageHeader
        title="Simulados disponíveis"
        subtitle="Selecione um simulado para iniciar sua avaliação"
      />

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all",
                isActive
                  ? "border-[#1B4FBF] bg-[#1B4FBF] text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300",
              ].join(" ")}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <AppCard key={index} className="p-5 animate-pulse">
                <div className="mb-3 h-5 w-32 rounded bg-slate-200" />
                <div className="mb-2 h-4 w-full rounded bg-slate-100" />
                <div className="mb-4 h-4 w-3/4 rounded bg-slate-100" />
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-9 w-24 rounded bg-slate-200" />
                </div>
              </AppCard>
            ))}
          </div>
        ) : filteredExams.length === 0 ? (
          <EmptyState
            title="Nenhum simulado encontrado"
            description="Não há simulados disponíveis para o filtro selecionado."
          />
        ) : (
          <div className="space-y-4">
            {filteredExams.map((exam) => (
              <Link key={exam.id} to={`/dashboard/simulado/${exam.id}`}>
                <AppCard className="p-6 border-l-4 border-l-[#1B4FBF] transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={[
                            "rounded-full px-3 py-1 text-xs font-semibold",
                            getDifficultyStyles(exam.difficulty),
                          ].join(" ")}
                        >
                          {getDifficultyLabel(exam.difficulty)}
                        </span>

                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                          {exam.subject}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-[#1A2A44]">
                        {exam.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        {exam.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-base font-semibold text-slate-900">
                        {exam.duration} min
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {exam.questions} questões
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                    <p className="text-sm text-slate-500">
                      Pronto para iniciar
                    </p>

                    <span className="rounded-lg bg-[#1B4FBF] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors">
                      Iniciar
                    </span>
                  </div>
                </AppCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
