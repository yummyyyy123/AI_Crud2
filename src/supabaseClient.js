import { createClient } from "@supabase/supabase-js";

// Use Vite environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or ANON key is missing. Check your .env.local file.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
