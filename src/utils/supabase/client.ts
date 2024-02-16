import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Ensure environment variables are defined
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL and Anon Key must be defined in environment variables");
}

export const supabaseClient = (supabaseAccessToken: string): SupabaseClient => {
  // Using non-null assertion operator (!) as we've already checked for undefined
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });
  return supabase;
};

export const supabaseClientAnon = (): SupabaseClient => {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!); // Non-null assertions are safe here
  return supabase;
};
