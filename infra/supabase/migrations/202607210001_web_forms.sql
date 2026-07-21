begin;

create extension if not exists pgcrypto;

create table if not exists public.partner_leads (
  id uuid primary key default gen_random_uuid(),
  organisation text not null check (char_length(organisation) between 2 and 140),
  contact_name text not null check (char_length(contact_name) between 2 and 100),
  role text not null check (char_length(role) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  country text not null check (country in ('de', 'uk', 'other')),
  website text,
  interest text not null check (interest in ('school', 'careers', 'network', 'research')),
  message text not null check (char_length(message) between 10 and 2500),
  privacy_version text not null,
  locale text not null check (locale in ('de', 'en')),
  idempotency_key text not null unique,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) <= 254),
  country text not null check (country in ('de', 'uk')),
  platform text not null check (platform in ('ios', 'android', 'both')),
  locale text not null check (locale in ('de', 'en')),
  consent_version text not null,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  confirmation_token_hash text,
  confirmation_expires_at timestamptz,
  store_launch_at timestamptz,
  unique (email, country)
);

create index if not exists partner_leads_created_at_idx on public.partner_leads (created_at);
create index if not exists waitlist_unconfirmed_idx on public.waitlist_entries (created_at) where confirmed_at is null;
create unique index if not exists waitlist_token_hash_idx on public.waitlist_entries (confirmation_token_hash) where confirmation_token_hash is not null;

alter table public.partner_leads enable row level security;
alter table public.waitlist_entries enable row level security;

revoke all on table public.partner_leads from anon, authenticated;
revoke all on table public.waitlist_entries from anon, authenticated;
grant select, insert, update, delete on table public.partner_leads to postgres;
grant select, insert, update, delete on table public.waitlist_entries to postgres;

create or replace function public.apply_web_retention()
returns table (unconfirmed_deleted bigint, launched_deleted bigint, leads_deleted bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  unconfirmed_count bigint;
  launched_count bigint;
  leads_count bigint;
begin
  delete from public.waitlist_entries where confirmed_at is null and created_at < now() - interval '7 days';
  get diagnostics unconfirmed_count = row_count;
  delete from public.waitlist_entries where confirmed_at is not null and store_launch_at is not null and store_launch_at < now() - interval '90 days';
  get diagnostics launched_count = row_count;
  delete from public.partner_leads where created_at < now() - interval '12 months';
  get diagnostics leads_count = row_count;
  return query select unconfirmed_count, launched_count, leads_count;
end;
$$;

revoke all on function public.apply_web_retention() from public, anon, authenticated;
grant execute on function public.apply_web_retention() to postgres;

commit;
