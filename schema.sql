-- RUN THIS IN SUPABASE SQL EDITOR
create table if not exists films (id text primary key, title text, genre text, synopsis text, video_url text, poster text, views int default 0, likes int default 0, featured_score numeric default 100, match int default 95, status text default 'live', scheduled_release_at timestamp, expires_at timestamp, created_at timestamp default now());
-- Insert your 24 mock films then bot will manage
