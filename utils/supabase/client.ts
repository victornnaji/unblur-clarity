import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import invariant from "tiny-invariant";

invariant(process.env.NEXT_PUBLIC_SUPABASE_URL, "Missing Supabase environment variables");
invariant(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, "Missing Supabase environment variables");

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
