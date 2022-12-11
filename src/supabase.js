import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
console.log("🚀 ~ file: supabase.js:4 ~ supabaseUrl", supabaseUrl)
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log("🚀 ~ file: supabase.js:6 ~ supabaseAnonKey", supabaseAnonKey)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log("🚀 ~ file: supabase.js:8 ~ supabase", supabase)