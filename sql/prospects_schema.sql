-- Reputix · Prospects table for outreach pipeline (W10/W11/W12/W13)
-- Run this once in Supabase SQL Editor

create table if not exists prospects (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  place_id text unique,
  category text default 'Restaurant',
  city text,
  emirate text default 'Dubai',
  owner_email text,
  ig_handle text,
  website text,
  phone text,
  rating numeric,
  n_reviews integer,
  reputation_score integer,
  urgency_score integer,
  revenue_at_risk_aed integer,
  free_report_data jsonb,
  status text default 'new' check (status in (
    'new','qualified','contacted','replied',
    'demo_booked','customer','unqualified','do_not_contact'
  )),
  source text default 'serpapi_gmaps',
  last_contact_at timestamptz,
  last_reply_at timestamptz,
  conversation_history jsonb default '[]'::jsonb,
  contact_attempts integer default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_prospects_status on prospects(status);
create index if not exists idx_prospects_score on prospects(reputation_score);
create index if not exists idx_prospects_emirate on prospects(emirate);
create index if not exists idx_prospects_category on prospects(category);
