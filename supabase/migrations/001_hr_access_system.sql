-- Migration 001: HR confidential-access system
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query > Run).
-- Wait for "Success" before considering this applied.

-- ── hr_access_requests ──────────────────────────────────────────────
-- One row per company/HR request to view confidential documents.
create table if not exists hr_access_requests (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null,
  work_email text not null,
  reason text not null check (reason in ('recruitment', 'document_check', 'interview', 'other')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'denied', 'expired')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  -- The raw one-time access token is emailed to the requester and never
  -- stored. Only its SHA-256 hash is kept, so a database leak alone can
  -- never be used to gain access.
  access_token_hash text,
  token_expires_at timestamptz,
  token_used_at timestamptz,
  request_ip text,
  access_ip text
);

create index if not exists idx_hr_requests_status on hr_access_requests (status);
create index if not exists idx_hr_requests_token_hash on hr_access_requests (access_token_hash);

-- ── hr_document_access_log ──────────────────────────────────────────
-- Append-only audit trail: every time a confidential document is viewed
-- or downloaded, one row is written here. Never updated or deleted by
-- the app (see RLS policy below).
create table if not exists hr_document_access_log (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references hr_access_requests(id) on delete cascade,
  document_key text not null,
  action text not null check (action in ('view', 'download')),
  accessed_at timestamptz not null default now(),
  ip text
);

create index if not exists idx_hr_log_request on hr_document_access_log (request_id);

-- ── Row Level Security ──────────────────────────────────────────────
-- This project never talks to Supabase from the browser with the anon
-- key for these two tables — all reads/writes go through server-side
-- API routes using the service_role key. RLS is enabled anyway as a
-- defense-in-depth measure: even if the anon key ever leaked or a
-- client-side call was added by mistake, no public policy exists, so
-- PostgREST would refuse every request by default.
alter table hr_access_requests enable row level security;
alter table hr_document_access_log enable row level security;

-- Intentionally NO policies are created for the anon/authenticated
-- roles. Only the service_role key (used exclusively in server code,
-- never shipped to the browser) bypasses RLS and can read/write here.
