"use client";

import { getURL } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/client";
import { type Provider } from "@supabase/supabase-js";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirectToPath } from "./server";

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData, redirectTo?: string | null) => Promise<string>,
  router: AppRouterInstance | null = null,
  redirectTo?: string | null
) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const redirectUrl: string = await requestFunc(formData, redirectTo);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithOAuth(
  e: React.FormEvent<HTMLFormElement>,
  redirectTo?: string | null
) {
  // Prevent default form submission refresh
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get("provider")).trim() as Provider;

  // Create client-side supabase client and call signInWithOAuth
  const supabase = createClient();
  let redirectURL;
  if (redirectTo) {
    redirectURL = getURL("/auth/callback?redirectTo=" + redirectTo);
  }else{
    redirectURL = getURL("/auth/callback");
  }
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL
    }
  });
}
