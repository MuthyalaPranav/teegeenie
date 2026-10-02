import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export async function signInWithGoogle(): Promise<string | null> {
  const result = await lovable.auth.signInWithOAuth("google", {
    redirect_uri: window.location.origin,
  });
  if (result.error) return result.error.message ?? "Google sign-in failed.";
  return null;
}

export async function signOut() {
  await supabase.auth.signOut();
}
