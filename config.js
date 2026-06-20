// ── Passwords ─────────────────────────────────────────────────────────────────
const VIEW_PASSWORD  = 'ilovesebski27';   // Dad's password
const ADMIN_PASSWORD = '032712';           // Your password

// ── Supabase ──────────────────────────────────────────────────────────────────
// 1. Go to https://supabase.com → New project
// 2. Settings → API → copy Project URL and anon key here
// 3. In Supabase: create table "cards" and storage bucket "card-images" (public)
//    Table columns: id (int8, pk), occasion (text), year (int4),
//                   message (text), image_url (text), image_path (text)
const SUPABASE_URL      = 'https://efyrkuhhqqzhsrjcudhy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeXJrdWhocXF6aHNyamN1ZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTQ0NzMsImV4cCI6MjA5NzQ5MDQ3M30.3nM4f2jTeUnXE_hdzmcAKCN_vfBApN-tdj7rN7-jf5Q';
