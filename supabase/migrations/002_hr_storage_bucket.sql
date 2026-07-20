-- Migration 002: Private storage bucket for confidential HR documents
-- Run this in the Supabase SQL Editor after 001_hr_access_system.sql.

-- Create a PRIVATE bucket (public = false is the critical setting —
-- files here are never reachable by a plain URL, only via a short-lived
-- signed URL generated server-side after access is verified).
insert into storage.buckets (id, name, public)
values ('hr-confidential', 'hr-confidential', false)
on conflict (id) do nothing;

-- No storage.objects policies are created for anon/authenticated roles.
-- Only the service_role key (server-side only) can read/write/list this
-- bucket, and only server code generates signed URLs — and only after
-- verifying a valid, unexpired, unused session tied to an approved
-- hr_access_requests row.

-- Suggested folder convention when uploading the real files yourself
-- via the Supabase dashboard (Storage > hr-confidential):
--   identity/            (Identitätsdokumente)
--   education/           (Bildungsnachweise)
--   recognition/         (Anerkennung Deutschland)
--   references/          (Arbeitszeugnisse)
--   other/                (Weitere Nachweise)
--   certificates_full/   (Zertifikate, vollständig)
-- These folder names match the `key` values in lib/profileData.ts
-- (HR_DOCUMENT_CATEGORIES) and lib/hrDocuments.ts.
