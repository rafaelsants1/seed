import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumb = [], action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-4">
      <div>
        {breadcrumb.length > 0 && (
          <nav className="mb-1 text-xs text-[var(--color-text-muted)]">
            {breadcrumb.join(' / ')}
          </nav>
        )}
        <h2 className="text-xl font-semibold text-[var(--color-primary)]">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
