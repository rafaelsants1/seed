import type { ReactNode } from 'react';

interface AppCardProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

export function AppCard({
  title,
  children,
  action,
  variant = 'default',
  className = '',
}: AppCardProps) {
  return (
    <div
      className={[
        'rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm',
        className,
      ].join(' ')}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            {title}
          </h3>
          {action ? <div>{action}</div> : null}
        </div>
      )}
      <div className={variant === 'compact' ? 'p-3' : 'p-4'}>{children}</div>
    </div>
  );
}
