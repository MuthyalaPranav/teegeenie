import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button, GoogleIcon } from "./ui-kit";

export const GOOGLE_MSG = "Google authentication will be connected in the backend version.";

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [notice, setNotice] = useState("");
  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setNotice(`${mode === "login" ? "Login" : "Sign up"} will be enabled in the backend version.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl bg-card p-8 shadow-glow animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-secondary">
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Start designing your dream tee with TeeGenie.</p>

        <Button variant="outline" className="mt-6 w-full" onClick={() => setNotice(GOOGLE_MSG)}>
          <GoogleIcon /> Continue with Google
        </Button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input required type="email" placeholder="Email" maxLength={255} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <input required type="password" placeholder="Password" minLength={6} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <Button type="submit" className="w-full">{mode === "login" ? "Login" : "Sign Up"}</Button>
        </form>
        {notice && <p className="mt-4 rounded-xl bg-secondary p-3 text-center text-sm text-secondary-foreground">{notice}</p>}
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "login" ? "New to TeeGenie?" : "Already have an account?"}{" "}
          <button className="font-semibold text-primary hover:underline" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setNotice(""); }}>
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
