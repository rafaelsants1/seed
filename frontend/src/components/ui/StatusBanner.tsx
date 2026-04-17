interface StatusBannerProps {
  title: string;
  description: string;
  variant?: "info" | "warning" | "error" | "success";
}

export function StatusBanner({
  title,
  description,
  variant = "info",
}: StatusBannerProps) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };

  return (
    <div className={`rounded-2xl border p-4 ${styles[variant]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-90">{description}</p>
    </div>
  );
}
