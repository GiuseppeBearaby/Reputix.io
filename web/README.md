# Reputix Web

Next.js 14 landing page for Reputix — AI reputation manager for UAE businesses.

## Local dev

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

```bash
npm i -g vercel
vercel
# follow prompts → link or create project
vercel --prod
```

Then in the Vercel dashboard:

1. **Project Settings → Domains** → add `reputix.io` and `www.reputix.io`
2. Vercel will show you DNS records to add on Cloudflare:
   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
3. Wait ~5 min for propagation.

## Environment variables (Vercel)

Optional (defaults work):

- `N8N_FREE_REPORT_WEBHOOK` = `https://reputixapp.app.n8n.cloud/webhook/free-report`

## Architecture

```
Landing form → POST /api/free-report → n8n webhook (W1) → AI report → Resend email
```
