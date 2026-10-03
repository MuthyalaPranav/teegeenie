import type { User } from "@supabase/supabase-js";

export function getUserInfo(user: User) {
  const m = (user.user_metadata ?? {}) as Record<string, string | undefined>;
  const name = m.full_name || m.name || user.email?.split("@")[0] || "there";
  return {
    name,
    firstName: name.split(" ")[0],
    email: user.email ?? "",
    avatar: m.avatar_url || m.picture || null,
    provider: (user.app_metadata?.provider as string | undefined) ?? "email",
    createdAt: user.created_at,
    lastSignIn: user.last_sign_in_at ?? null,
  };
}
