import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const useUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
