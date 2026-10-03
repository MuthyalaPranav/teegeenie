import { createFileRoute } from "@tanstack/react-router";
import { getUserInfo } from "@/lib/user-info";
import { Avatar } from "./dashboard";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  component: Profile,
});

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—");

function Profile() {
  const { user } = Route.useRouteContext();
  const info = getUserInfo(user);
  const rows = [
    ["Full name", info.name],
    ["Email", info.email],
    ["Sign-in method", info.provider.charAt(0).toUpperCase() + info.provider.slice(1)],
    ["Member since", fmt(info.createdAt)],
    ["Last sign-in", fmt(info.lastSignIn)],
  ];
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow text-dash-orange">Account</p>
        <h1 className="mt-2 text-4xl md:text-5xl">Profile</h1>
      </div>
      <div className="overflow-hidden rounded-3xl border border-dash-orange/20 bg-card">
        <div className="flex items-center gap-5 bg-gradient-dash p-6 text-primary-foreground md:p-8">
          <Avatar src={info.avatar} name={info.name} size={64} />
          <div className="min-w-0">
            <h2 className="truncate text-3xl">{info.name}</h2>
            <p className="truncate text-sm opacity-90">{info.email}</p>
          </div>
        </div>
        <dl className="divide-y divide-border">
          {rows.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:justify-between md:px-8">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="break-all text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
