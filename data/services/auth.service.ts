"use server";

import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";
import { links } from "@/config/links";
import { UnAuthorizedError } from "@/errors/UnAuthorizedError";
import { createAuthRepository } from "@/data/repositories/auth.repository";
import { createClient } from "@/utils/supabase/server";

export const getAuthUser = async () => {
  const supabase = createClient();
  const authRepository = await createAuthRepository();
  try {
    const user = await authRepository.getAuthUser(supabase);
    if (!user) {
      throw new UnAuthorizedError("User not found");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAuthUserOrNull = async () => {
  const supabase = createClient();
  const authRepository = await createAuthRepository();
  const user = await authRepository.getAuthUser(supabase);
  return user || null;
};

export const signOut = async (formData: FormData) => {
  const supabase = createClient();
  const authRepository = await createAuthRepository();
  const pathName = String(formData.get("pathName")).trim();
  const { error } = await authRepository.signOut(supabase);

  if (error) {
    return getErrorRedirect(
      pathName,
      "Hmm... Something went wrong.",
      "You could not be signed out."
    );
  }

  return getStatusRedirect(
    links.home.path,
    "success",
    "You have been signed out.",
    "Sign in to access your account."
  );
};
