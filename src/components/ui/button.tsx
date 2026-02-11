import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--ink-strong)] bg-[var(--ink-strong)] text-white hover:border-[var(--ink-strong)] hover:bg-[#2a2a2a] hover:text-white",
  secondary:
    "border border-[var(--ink-strong)] bg-transparent text-[var(--ink-strong)] hover:border-[var(--ink-strong)] hover:bg-[var(--ink-strong)] hover:text-white",
  ghost:
    "border border-transparent bg-transparent text-[var(--ink-muted)] hover:bg-[rgba(20,20,20,0.06)] hover:text-[var(--ink-strong)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-[0.68rem] tracking-[0.12em]",
  md: "px-5 py-2.5 text-[0.73rem] tracking-[0.14em]",
  lg: "px-6 py-3 text-[0.78rem] tracking-[0.16em]",
};

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
