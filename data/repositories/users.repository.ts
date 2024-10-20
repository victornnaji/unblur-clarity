"use server";

import { UpdateUserDto } from "@/types/dtos";
import { createClient } from "@/utils/supabase/server";

export const getUserByIdRepository = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export const updateUserRepository = async (
  updatePayload: UpdateUserDto,
  redirectTo?: string
) => {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser(updatePayload, {
    emailRedirectTo: redirectTo
  });

  return { error: error ? new Error(error.message) : null };
};
