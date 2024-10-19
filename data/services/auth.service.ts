"use server";

import { authRepository } from "@/data/repositories/auth.repository";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";
import { links } from "@/config/links";
import { UnAuthorizedError } from "@/errors/UnAuthorizedError";

export const getAuthUser = async () => {
  try {
    const user = await authRepository.getAuthUser();
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
  const user = await authRepository.getAuthUser();
  return user || null;
};

export const signOut = async (formData: FormData) => {
  const pathName = String(formData.get("pathName")).trim();

  const { error } = await authRepository.signOut();

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
