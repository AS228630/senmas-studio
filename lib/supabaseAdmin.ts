import "server-only";
import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY. This client uses the service_role key, which bypasses
// Row Level Security entirely. It must never be imported from a "use
// client" component or leaked into any client bundle — the `server-only`
// import above makes Next.js throw a build error if that ever happens.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. Add them to your environment before using HR access features."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
