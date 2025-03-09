"use client";

import { createClient } from "../../supabase/client";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export function redirectToLogin() {
  redirect("/sign-in");
}
