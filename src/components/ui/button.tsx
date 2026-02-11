import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--accent)] bg-[var(--accent)] text-[var(--button-on-accent)] shadow-[0_10px_24px_rgba(17,17,17,0.12)] hover:border-[var(--accent-strong)] hover:bg-[var(--accent-strong)] hover:text-[var(--button-on-accent)]",
  secondary:
    "border border-[var(--line-strong)] bg-transparent text-[var(--ink-strong)] hover:border-[var(--ink-strong)] hover:bg-[var(--ink-strong)] hover:text-[var(--surface)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink-strong)] hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[0.65rem] uppercase",
  md: "px-5 py-2.5 text-[0.72rem] uppercase",
  lg: "px-6 py-3 text-xs uppercase",
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
