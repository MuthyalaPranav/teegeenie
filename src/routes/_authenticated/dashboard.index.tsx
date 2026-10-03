import { createFileRoute, Link } from "@tanstack/react-router";
import { Palette, Lightbulb, Package } from "lucide-react";
import { getUserInfo } from "@/lib/user-info";
import { Avatar } from "./dashboard";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardHome,
});

const tiles = [
  { to: "/dashboard/designs", label: "My Designs", text: "Your AI-crafted tees live here.", icon: Palette },
  { to: "/dashboard/ideas", label: "Saved Ideas", text: "Prompts you want to revisit.", icon: Lightbulb },
  { to: "/dashboard/orders", label: "Orders", text: "Track what's being printed.", icon: Package },
] as const;

function DashboardHome() {
  const { user } = Route.useRouteContext();
  const info = getUserInfo(user);
  return (
    <div className="space-y-8">
      <section className="flex flex-col items-start gap-5 rounded-3xl bg-gradient-dash p-8 text-primary-foreground shadow-dash sm:flex-row sm:items-center md:p-10">
        <Avatar src={info.avatar} name={info.name} size={72} />
        <div>
          <p className="eyebrow opacity-80">Dashboard</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Welcome back, {info.firstName}.</h1>
          <p className="mt-2 opacity-90">Ready to turn your next idea into a T-shirt?</p>
        </div>
      </section>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="group rounded-2xl border border-dash-orange/20 bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-dash">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dash-soft text-dash-orange"><t.icon className="h-5 w-5" /></div>
            <h3 className="mt-4 text-2xl">{t.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
