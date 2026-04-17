interface StatusBadgeProps {
  status: 'ativo' | 'encerrado' | 'pendente' | 'agendado';
}

const statusStyles = {
  ativo: {
    bg: 'bg-[var(--color-success)]/10',
    text: 'text-[var(--color-success)]',
    border: 'border-[var(--color-success)]',
  },
  encerrado: {
    bg: 'bg-[var(--color-error)]/10',
    text: 'text-[var(--color-error)]',
    border: 'border-[var(--color-error)]',
  },
  pendente: {
    bg: 'bg-[var(--color-warning)]/10',
    text: 'text-[var(--color-warning)]',
    border: 'border-[var(--color-warning)]',
  },
  agendado: {
    bg: 'bg-[var(--color-accent)]/10',
    text: 'text-[var(--color-accent)]',
    border: 'border-[var(--color-accent)]',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = statusStyles[status];

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-sm font-medium border ${styles.bg} ${styles.text} ${styles.border}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
