import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "glass" | "club";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold uppercase no-underline transition-[background-color,border-color,color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--ink-strong)] bg-[var(--ink-strong)] !text-white visited:!text-white hover:border-[#2a2a2a] hover:bg-[#2a2a2a] hover:!text-white active:!text-white",
  secondary:
    "border border-[var(--ink-strong)] bg-[var(--surface)] text-[var(--ink-strong)] hover:border-[var(--ink-strong)] hover:bg-[var(--ink-strong)] hover:!text-white active:bg-[var(--ink-strong)] active:!text-white",
  ghost:
    "border border-transparent bg-transparent text-[var(--ink-muted)] hover:bg-[rgba(20,20,20,0.06)] hover:text-[var(--ink-strong)]",
  light:
    "border border-white bg-white !text-[#112b24] visited:!text-[#112b24] shadow-[0_16px_36px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 hover:bg-[var(--surface-strong)] hover:!text-[#112b24] active:!text-[#112b24]",
  glass:
    "border border-white/55 bg-white/12 text-white shadow-[0_16px_36px_rgba(0,0,0,0.14)] backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/22 hover:text-white",
  club:
    "border border-[#0b513f] bg-[#0b513f] !text-white shadow-[0_14px_32px_rgba(11,81,63,0.18)] hover:-translate-y-0.5 hover:border-[#073d30] hover:bg-[#073d30] hover:!text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-[0.68rem]",
  md: "px-5 py-2.5 text-[0.73rem]",
  lg: "px-6 py-3 text-[0.78rem]",
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
