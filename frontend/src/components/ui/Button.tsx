import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-200 disabled:bg-blue-400",
    secondary:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus:ring-slate-200 disabled:bg-slate-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200 disabled:bg-red-300",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-200 disabled:text-slate-400",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-200 disabled:bg-emerald-300",
  };

  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
        "transition-colors duration-150 focus:outline-none focus:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-70",
        fullWidth ? "w-full" : "",
        styles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
