"use server";

import { redirect } from "next/navigation";
import {
  getErrorRedirect,
  getStatusRedirect,
  getURL,
  isValidEmail
} from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";
import { links } from "@/config";

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function signInWithMagicLink(
  formData: FormData,
  redirectTo?: string | null
) {
  let callbackURL;

  if (redirectTo) {
    callbackURL = getURL(
      `/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`
    );
  } else {
    callbackURL = getURL("/auth/callback");
  }

  const email = String(formData.get("email")).trim();

  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      links.auth.path,
      "Invalid email",
      "Please enter a valid email address"
    );
  }

  const supabase = createClient();
  let options = {
    emailRedirectURL: callbackURL,
    shouldCreateUser: true
  };

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options
  });

  if (error) {
    redirectPath = getErrorRedirect(
      links.auth.path,
      "You could not be signed in.",
      "Please check your email address and try again."
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      links.auth.path,
      "success",
      "Success!",
      "Please check your email for a magic link. You may now close this tab.",
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      links.auth.path,
      "An unexpected error occurred.",
      "Please try again later."
    );
  }

  return redirectPath;
}