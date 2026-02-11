import { INSTAGRAM_URL } from "@/lib/constants";

type InstagramLinkProps = {
  className?: string;
  labelClassName?: string;
  showLabel?: boolean;
};

function cn(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function InstagramLink({
  className,
  labelClassName,
  showLabel = true,
}: InstagramLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buttercup Bebe Instagram"
      className={cn(
        "inline-flex items-center gap-2 text-[var(--ink-strong)] transition-colors hover:text-[var(--ink-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.5" />
        <circle cx="12" cy="12" r="4.4" />
        <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
      </svg>
      {showLabel ? (
        <span className={cn("text-sm tracking-[0.04em]", labelClassName)}>Instagram</span>
      ) : null}
    </a>
  );
}
