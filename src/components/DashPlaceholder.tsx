import type { LucideIcon } from "lucide-react";

export function DashPlaceholder({ title, text, icon: Icon }: { title: string; text: string; icon: LucideIcon }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow text-dash-orange">TeeGenie</p>
        <h1 className="mt-2 text-4xl md:text-5xl">{title}</h1>
      </div>
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-dash-orange/40 bg-card p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-dash text-primary-foreground shadow-dash">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl">Nothing here yet</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
