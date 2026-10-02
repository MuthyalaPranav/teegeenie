import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { AuthModal } from "./AuthModal";
import { Button, GoogleIcon } from "./ui-kit";
import { supabase } from "@/integrations/supabase/client";
import { signInWithGoogle, signOut } from "@/lib/auth";

const AuthCtx = createContext<() => void>(() => {});
export const useOpenAuth = () => useContext(AuthCtx);

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="font-display text-2xl tracking-tight">
      Tee<span className="italic">Genie</span>
    </Link>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const open = () => { setAuthOpen(true); setMenu(false); };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setUser(session?.user ?? null);
      router.invalidate();
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  const google = async () => {
    const error = await signInWithGoogle();
    if (error) toast.error(error);
  };

  const logout = async () => {
    setMenu(false);
    await signOut();
    toast.success("Signed out");
  };
  const navCls = "eyebrow px-4 py-2 text-muted-foreground transition-colors hover:text-foreground";

  return (
    <AuthCtx.Provider value={open}>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={navCls} activeProps={{ className: "text-foreground underline underline-offset-8" }} activeOptions={{ exact: true }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <Button variant="ghost" onClick={logout}>Sign Out</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={open}>Login / Sign Up</Button>
                <Button variant="outline" onClick={google}><GoogleIcon /> Continue with Google</Button>
              </>
            )}
          </div>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <div className="border-t border-border px-5 py-4 md:hidden animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMenu(false)} className={navCls} activeProps={{ className: "text-foreground underline underline-offset-8" }} activeOptions={{ exact: true }}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2">
              {user ? (
                <Button variant="ghost" onClick={logout}>Sign Out</Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={open}>Login / Sign Up</Button>
                  <Button variant="outline" onClick={google}><GoogleIcon /> Continue with Google</Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row">
          <Logo />
          <nav className="flex gap-6 text-sm text-muted-foreground">
            {links.map((l) => <Link key={l.to} to={l.to} className="hover:text-foreground">{l.label}</Link>)}
          </nav>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} TeeGenie. All rights reserved.</p>
        </div>
      </footer>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </AuthCtx.Provider>
  );
}
