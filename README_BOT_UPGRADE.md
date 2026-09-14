# DRAMA.AI BOT UPGRADE FOR dramaaiv6.vercel.app

This patch adds /bot, Supabase, and auto-scheduling to your existing dramaaiv6 repo while keeping your current 24-film Netflix UI.

## HOW TO INSTALL (2 MIN):

1. Download this zip, unzip on computer
2. Go to github.com/twofaycee/dramaaiv6
3. Drag these folders/files INTO your existing repo (overwrite if asked):
   - app/bot/ (new bot page)
   - app/api/bot/ (bot API)
   - app/api/films/ (now reads Supabase, fallback to mock)
   - app/api/cron/ (cleanup)
   - lib/ (supabase, bot brain, scheduler)
   - vercel.json (adds daily cron)
   - supabase/schema.sql (run in Supabase)
4. Make sure package.json has typescript in devDependencies (included in this zip - if you already have package.json, merge devDependencies)
5. Commit to main
6. Vercel auto-deploys - check dramaaiv6.vercel.app/bot

## ENV VARS TO ADD IN VERCEL:
Settings -> Environment Variables -> Add:
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... (service_role, not anon)
NEXT_PUBLIC_APP_URL=https://dramaaiv6.vercel.app

Then Deployments -> Redeploy (uncache)

## WITHOUT SUPABASE:
Bot works in mock mode - site still looks good with 24 films. Add Supabase later when ready.
