import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LayoutDashboard, Palette, Lightbulb, Package, User as UserIcon, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getUserInfo } from "@/lib/user-info";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — TeeGenie" },
      { name: "description", content: "Your TeeGenie dashboard: designs, saved ideas, orders and profile." },
      { property: "og:title", content: "Dashboard — TeeGenie" },
      { property: "og:description", content: "Your TeeGenie dashboard: designs, saved ideas, orders and profile." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardLayout,
});

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/designs", label: "My Designs", icon: Palette, exact: false },
  { to: "/dashboard/ideas", label: "Saved Ideas", icon: Lightbulb, exact: false },
  { to: "/dashboard/orders", label: "Orders", icon: Package, exact: false },
  { to: "/dashboard/profile", label: "Profile", icon: UserIcon, exact: false },
] as const;

export function Avatar({ src, name, size = 40 }: { src: string | null; name: string; size?: number }) {
  return src ? (
    <img src={src} alt={name} referrerPolicy="no-referrer" style={{ width: size, height: size }} className="rounded-full object-cover ring-2 ring-dash-orange/40" />
  ) : (
    <div style={{ width: size, height: size }} className="flex items-center justify-center rounded-full bg-gradient-dash font-semibold text-primary-foreground">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function DashboardLayout() {
  const { user } = Route.useRouteContext();
  const info = getUserInfo(user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const logout = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  const nav = (
    <nav className="flex flex-col gap-1">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          onClick={() => setOpen(false)}
          activeOptions={{ exact: i.exact }}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-dash-soft hover:text-foreground"
          activeProps={{ className: "bg-gradient-dash !text-primary-foreground shadow-dash" }}
        >
          <i.icon className="h-4 w-4" />
          {i.label}
        </Link>
      ))}
      <button onClick={logout} className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-dash-soft hover:text-destructive">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-dash-page">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-dash-orange/20 bg-card/80 px-5 backdrop-blur-lg md:hidden">
        <Link to="/" className="font-display text-2xl">Tee<span className="italic text-dash-orange">Genie</span></Link>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="rounded-lg p-2">{open ? <X /> : <Menu />}</button>
      </header>
      {open && <div className="border-b border-dash-orange/20 bg-card p-4 md:hidden">{nav}</div>}
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-dash-orange/20 bg-card/70 p-5 backdrop-blur md:flex">
          <Link to="/" className="mb-8 px-2 font-display text-3xl">Tee<span className="italic text-dash-orange">Genie</span></Link>
          {nav}
          <div className="mt-auto flex items-center gap-3 rounded-xl bg-dash-soft p-3">
            <Avatar src={info.avatar} name={info.name} size={36} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{info.name}</p>
              <p className="truncate text-xs text-muted-foreground">{info.email}</p>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-5 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
