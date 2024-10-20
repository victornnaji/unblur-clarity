"use server";

import { createClient } from "@/utils/supabase/server";

export const getAuthUserRepository = async () => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
};

export const signOutRepository = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  return { error: error ? new Error(error.message) : null };
};

