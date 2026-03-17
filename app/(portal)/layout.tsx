import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/portal-shell";
import { getCurrentUserProfile } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const profile = await getCurrentUserProfile();

  if (isSupabaseConfigured() && !profile.user) {
    redirect("/sign-in");
  }

  return <PortalShell profile={profile}>{children}</PortalShell>;
}
