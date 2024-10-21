import { Database } from "@/types";
import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

invariant(supabaseUrl, "Missing Supabase environment variables");
invariant(supabaseServiceRoleKey, "Missing Supabase environment variables");

export const createServiceRoleClient = () =>
  createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });
