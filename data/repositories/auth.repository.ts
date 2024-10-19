import { createClient } from "@/utils/supabase/server";

const getAuthUser = async () => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
};

const signOut = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  return { error: error ? new Error(error.message) : null };
};

export const authRepository = {
  getAuthUser,
  signOut
};

