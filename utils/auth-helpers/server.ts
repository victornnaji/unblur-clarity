"use server";

import { redirect } from "next/navigation";
import { getErrorRedirect, getStatusRedirect, getURL } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export const getServerUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function signInWithMagiclink(formData: FormData) {
  const callbackURL = getURL("/auth/callback");

  const email = String(formData.get("email")).trim();

  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      "/signin",
      "Invalid email",
      "Please enter a valid email address"
    );
  }

  const supabase = createClient();
  let options = {
    emailRedirectURL: callbackURL,
    shouldCreateUser: true,
  };

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options,
  });

  if (error) {
    redirectPath = getErrorRedirect(
      "/signin",
      "You could not be signed in.",
      error.message
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      "/signin",
      "Success!",
      "Please check your email for a magic link. You may now close this tab.",
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      "/signin",
      "An unexpected error occurred.",
      "Please try again later."
    );
  }

  return redirectPath;
}

export async function updateEmail(formData: FormData) {
  const user = getServerUser();

  if (!user) {
    return getErrorRedirect(
      "/signin",
      "You are not signed in.",
      "Please sign in and try again."
    );
  }

  const newEmail = String(formData.get("newEmail")).trim();

  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      "/account",
      "Your email could not be updated.",
      "Invalid email address."
    );
  }

  const callbackUrl = getURL(
    getStatusRedirect("/account", "Success!", `Your email has been updated.`)
  );

  const supabase = createClient();

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl,
    }
  );

  if (error) {
    return getErrorRedirect(
      "/account",
      "Your email could not be updated.",
      error.message
    );
  } else {
    return getStatusRedirect(
      "/account",
      "Confirmation emails sent.",
      "You will need to confirm the update by clicking the links sent to both the old and new email addresses."
    );
  }
}
