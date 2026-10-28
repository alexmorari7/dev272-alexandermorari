Soccer Journal

App that stores journal entries in Supabase. Entries are read with TanStack Query and
added with a mutation. The "completed" marks are client state and persist across restarts with
AsyncStorage.

Setup

1. Create the table

In your Supabase project open **SQL Editor → New query**, paste the SQL below and run it.

sql
1. Table
create table public.journal_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  "group" text not null check ("group" in ('Physical', 'Feedback', 'Recovery', 'Self-Assessment')),
  category text not null check (char_length(category) between 1 and 30),
  summary text not null check (char_length(summary) between 10 and 200),
  status text not null check (status in ('Completed', 'Recorded', 'Updated', 'In Progress', 'Added', 'Active', 'Tracked')),
  minutes integer not null check (minutes between 1 and 300),
  location text not null default '' check (char_length(location) <= 40),
  date date not null,
  importance text not null check (importance in ('Low', 'Medium', 'High', 'Critical')),
  remind boolean not null default false,
  productivity integer not null check (productivity between 1 and 10)
);

2. Security, layer 1: which roles may reach the table at all
grant select, insert on public.journal_items to anon;

3. Security, layer 2: turn RLS on, then say which rows anon may read and add
alter table public.journal_items enable row level security;

create policy "Anyone can read journal items"
  on public.journal_items for select
  to anon
  using (true);

create policy "Anyone can add journal items"
  on public.journal_items for insert
  to anon
  with check (true);


4. Seed rows
insert into public.journal_items
  ("group", category, summary, status, minutes, location, date, importance, remind, productivity) values
  ('Physical', 'Practices', 'Worked on passing accuracy and defensive shape', 'Completed', 90, 'Home field', '2026-10-01', 'Medium', false, 6),
  ('Physical', 'Games', 'Match vs. Skyline High, decent midfield performance', 'Recorded', 80, 'Skyline High', '2026-10-03', 'High', true, 8),
  ('Physical', 'Conditioning', 'Sprint intervals and combination of plyometrics with sprinting', 'Completed', 45, 'Track', '2026-10-05', 'Medium', false, 9),
  ('Feedback', 'Team Performance', 'Energy level high, good communication and positive attitude', 'Updated', 90, '', '2026-10-07', 'Low', false, 5),
  ('Feedback', 'Film Study', 'Reviewed positioning and mistakes', 'In Progress', 30, 'Home', '2026-10-09', 'Medium', true, 3),
  ('Self-Assessment', 'Game Notes', 'Need quicker decision making under pressure', 'Added', 20, '', '2026-10-11', 'High', true, 7),
  ('Self-Assessment', 'Practice Notes', 'Improve first touch and ball control', 'Added', 15, '', '2026-10-13', 'Medium', false, 6),
  ('Self-Assessment', 'Focus Items', 'Stay composed, scan the field more often', 'Active', 10, '', '2026-10-15', 'High', true, 4),
  ('Recovery', 'Nutrition & Recovery', 'Hydration good, slept 8 hours, light soreness in legs', 'Tracked', 15, '', '2026-10-17', 'Low', false, 2),
  ('Feedback', 'Coach Feedback', 'Coach says to work on first touch under pressure', 'Updated', 10, 'Practice field', '2026-10-19', 'Critical', true, 5);


2. Environment variables

Create a ".env" file in the project root (it is listed in ".gitignore" and must not be committed)
with these variables. Find the values in Supabase under Project Settings >> Connect.

"EXPO_PUBLIC_SUPABASE_URL"
"EXPO_PUBLIC_SUPABASE_KEY" (the publishable key)

3. Run


pnpm install
pnpm start


Press i for the iOS simulator, a for Android, or scan the QR code with Expo Go. Restart with
-c whenever .env changes.

Project layout

src/lib/supabase.ts: Supabase client
src/lib/storage.ts: typed "loadJson" / "saveJson" helpers for AsyncStorage
src/api/journalApi.ts": "fetchJournalItems", "fetchJournalItem", "createJournalItem"
src/api/journalQueries.ts": TanStack Query hooks ("["journalItems"]", "["journalItems", id]")
src/context/JournalProgressContext.tsx": completed entries, persisted with AsyncStorage
