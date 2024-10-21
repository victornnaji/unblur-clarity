"use server";

import { SupabaseClient } from "@supabase/supabase-js";

class AuthRepository {
  
  async getAuthUser(supabase: SupabaseClient) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    return user;
  }

  async signOut(supabase: SupabaseClient) {
    const { error } = await supabase.auth.signOut();

    return { error: error ? new Error(error.message) : null };
  }
}

export async function createAuthRepository() {
  return new AuthRepository();
}

