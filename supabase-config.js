// Buy Commodity Supabase Configuration
// This publishable key is safe for browser use because RLS policies protect the database.
const SUPABASE_URL = "https://yxbxnfcmhgdthxwrifof.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_K05tyY7tCL_1MUH6PdPDRg_juzNCjv-";

if (!window.supabase) {
  console.error("Supabase library did not load. Please run via Live Server and check internet connection.");
}
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
window.supabaseClient = supabaseClient;
