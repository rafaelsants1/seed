type StatusBannerProps = {
  variant: "info" | "warning" | "error";
  title: string;
  description: string;
};

export function StatusBanner({
  variant,
  title,
  description,
}: StatusBannerProps) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-900",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-90">{description}</p>
    </div>
  );
}
