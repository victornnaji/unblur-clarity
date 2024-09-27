"use server";

import { redirect } from "next/navigation";
import {
  getErrorRedirect,
  getStatusRedirect,
  getURL,
  isValidEmail,
} from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";

export const getServerUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getServerUserOrNull = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
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
      "Please check your email address and try again."
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      "/signin",
      "success",
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

export async function SignOut(formData: FormData) {
  const pathName = String(formData.get("pathName")).trim();

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return getErrorRedirect(
      pathName,
      "Hmm... Something went wrong.",
      "You could not be signed out."
    );
  }

  return getStatusRedirect(
    pathName,
    "success",
    "You have been signed out.",
    "Sign in to access your account."
  );
}

type UserUpdateData = {
  email?: string;
  full_name?: string;
};

export async function updateUserProfile(updateData: UserUpdateData) {
  const supabase = createClient();

  const user = await getServerUser();

  if (!user) {
    throw new Error("Please sign in to update your profile.");
  }

  let updatePayload: any = {};
  let emailRedirectTo: string | undefined;

  if (updateData.email) {
    if (!isValidEmail(updateData.email)) {
      throw new Error("Please enter a valid email address.");
    }
    updatePayload.email = updateData.email;

    emailRedirectTo = getURL(
      getStatusRedirect(
        "/account",
        "success",
        "Success!",
        `Your email has been updated.`
      )
    );
  }

  if (updateData.full_name) {
    updatePayload.data = {
      ...updatePayload.data,
      full_name: updateData.full_name,
      name: updateData.full_name,
    };
  }

  const { error } = await supabase.auth.updateUser(updatePayload, {
    emailRedirectTo,
  });

  if (error) {
    return {
      status: "error",
      title: "Your profile could not be updated.",
      description: error.message,
    };
  } else {
    if (updateData.email) {
      return {
        status: "success",
        title: "Confirmation emails sent.",
        description:
          "You will need to confirm the update by clicking the links sent to both the old and new email addresses.",
      };
    } else {
      return {
        status: "success",
        title: "Success!",
        description: "Your profile has been updated.",
      };
    }
  }
}
