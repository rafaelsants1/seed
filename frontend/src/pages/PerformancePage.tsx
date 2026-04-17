import { useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { usePerformance } from "../features/performance/hooks/usePerformance";
import { AppCard } from "../components/ui/AppCard";
import { PageHeader } from "../components/ui/PageHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { DataTable } from "../components/ui/DataTable";
import { StatCard } from "../components/ui/StatCard";

const MOCK_USER_ID = "1";

export function PerformancePage() {
  const { performance, isLoading } = usePerformance({
    autoLoad: true,
    userId: MOCK_USER_ID,
  });

  const radarData = useMemo(() => {
    if (!performance) return [];

    return performance.skills.map((skill) => ({
      subject: skill.name,
      score: skill.score,
      fullMark: 100,
    }));
  }, [performance]);

  const examBarData = useMemo(() => {
    if (!performance) return [];
    return performance.recentExams.map((exam) => ({
      titulo: exam.title.length > 14 ? `${exam.title.slice(0, 14)}...` : exam.title,
      nota: exam.score,
    }));
  }, [performance]);

  const averageScore = useMemo(() => {
    if (!performance || performance.recentExams.length === 0) return 0;
    return Math.round(
      performance.recentExams.reduce((acc, exam) => acc + exam.score, 0) /
        performance.recentExams.length,
    );
  }, [performance]);

  const bestSkill = useMemo(() => {
    if (!performance || performance.skills.length === 0) return null;
    return [...performance.skills].sort((a, b) => b.score - a.score)[0];
  }, [performance]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-40 rounded bg-[var(--color-border)]" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse" />
          <div className="h-24 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse" />
          <div className="h-24 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse" />
        </div>
        <div className="h-80 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse" />
      </div>
    );
  }

  if (!performance) {
    return (
      <div className="p-6">
        <EmptyState
          title="Desempenho indisponível"
          description="Não foi possível carregar os dados de desempenho no momento."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Desempenho" breadcrumb={["Início", "Desempenho"]} />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Média recente" value={`${averageScore}%`} />
        <StatCard label="Simulados avaliados" value={performance.recentExams.length} />
        <StatCard label="Melhor componente" value={bestSkill?.name ?? 'N/D'} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppCard title="Radar de habilidades">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#666666" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#666666" }} />
                <Radar name="Desempenho" dataKey="score" stroke="#2C6DB5" fill="#2C6DB5" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </AppCard>

        <AppCard title="Desempenho recente por prova">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={examBarData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="titulo" tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#666666" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="nota" fill="#2C6DB5" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AppCard>
      </div>

      <AppCard title="Histórico resumido de desempenho">
        <DataTable
          columns={[
            { key: 'title', label: 'Prova' },
            { key: 'date', label: 'Data' },
            { key: 'score', label: 'Nota' },
            { key: 'duration', label: 'Duração (min)' },
          ]}
          data={performance.recentExams}
        />
      </AppCard>
    </div>
  );
}
