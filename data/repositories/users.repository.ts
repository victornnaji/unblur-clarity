"use server";

import { UpdateUserDto } from "@/types/dtos";
import { SupabaseClient } from "@supabase/supabase-js";

class UsersRepository {
  async getUserById(supabase: SupabaseClient, id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  }

  async updateUser(
    supabase: SupabaseClient,
    updatePayload: UpdateUserDto,
    redirectTo?: string
  ) {
    const { error } = await supabase.auth.updateUser(updatePayload, {
      emailRedirectTo: redirectTo
    });

    return { error: error ? new Error(error.message) : null };
  }
}

export async function createUsersRepository() {
  return new UsersRepository();
}