// ── Passwords ─────────────────────────────────────────────────────────────────
const VIEW_PASSWORD  = 'ilovesebski27';   // Dad's password
const ADMIN_PASSWORD = '032712';           // Your password

// ── Supabase ──────────────────────────────────────────────────────────────────
// 1. Go to https://supabase.com → New project
// 2. Settings → API → copy Project URL and anon key here
// 3. In Supabase: create table "cards" and storage bucket "card-images" (public)
//    Table columns: id (int8, pk), occasion (text), year (int4),
//                   message (text), image_url (text), image_path (text)
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
