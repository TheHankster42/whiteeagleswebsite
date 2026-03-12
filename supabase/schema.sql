-- White Eagles: events table and RLS
-- Run this in Supabase Dashboard → SQL Editor after creating your project.

-- Events table (club events: fundraisers, meetings, tournaments, etc.)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  location text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Optional: trigger to keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists events_updated_at on public.events;
create trigger events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- Enable RLS
alter table public.events enable row level security;

-- Public read: anyone can list and view events
create policy "Events are viewable by everyone"
  on public.events for select
  using (true);

-- Authenticated write: only signed-in users can insert/update/delete
create policy "Authenticated users can insert events"
  on public.events for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update events"
  on public.events for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete events"
  on public.events for delete
  to authenticated
  using (true);
