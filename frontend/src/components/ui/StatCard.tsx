import { AppCard } from './AppCard';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function StatCard({ label, value, unit, trend, trendValue }: StatCardProps) {
  const trendColors = {
    up: 'text-[var(--color-success)]',
    down: 'text-[var(--color-error)]',
    neutral: 'text-[var(--color-text-muted)]',
  };

  const trendSymbol = {
    up: '+',
    down: '-',
    neutral: '',
  };

  return (
    <AppCard variant="compact">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-[var(--color-primary)]">
          {value}
        </span>
        {unit && <span className="text-sm text-[var(--color-text-muted)]">{unit}</span>}
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
        {trend && trendValue && (
          <span className={`text-xs ${trendColors[trend]}`}>
            {trendSymbol[trend]}{trendValue}
          </span>
        )}
      </div>
    </AppCard>
  );
}
