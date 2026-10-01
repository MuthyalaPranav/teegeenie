import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

export const btnClass = (variant: Variant = "primary", size: "md" | "lg" = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-none font-medium uppercase tracking-[0.18em] transition-all duration-300 disabled:opacity-60",
    size === "lg" ? "px-8 py-4 text-xs" : "px-5 py-2.5 text-[0.7rem]",
    variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary-glow",
    variant === "outline" &&
      "border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
    variant === "ghost" && "text-foreground hover:bg-secondary",
  );

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "md" | "lg" }) {
  return <button className={cn(btnClass(variant, size), className)} {...props} />;
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-4 text-4xl md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "border border-border bg-card p-8 transition-colors duration-300 hover:border-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.4h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.7 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8l3.6-2.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.1 7.1l3.6 2.8C6.6 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}
