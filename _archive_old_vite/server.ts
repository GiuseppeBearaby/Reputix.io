/**
 * Reputix API server (Express)
 * Run with: npx tsx server.ts
 *
 * All endpoints accept clientId as query/body param.
 * Webhooks (free-report, review-approve) are forwarded to n8n so the
 * frontend never sees the raw n8n URLs.
 */
import express, { Request, Response } from 'express'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const app = express()
app.use(express.json({ limit: '2mb' }))

const PORT = Number(process.env.PORT || 3001)

// ----- Supabase admin client -----------------------------------------------
const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || ''
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ----- Helpers -------------------------------------------------------------
const N8N_FREE_REPORT = process.env.N8N_WEBHOOK_FREE_REPORT || ''
const N8N_REVIEW_APPROVE = process.env.N8N_WEBHOOK_REVIEW_APPROVE || ''

function fail(res: Response, code: number, msg: string, extra?: unknown) {
  console.error('[api]', code, msg, extra ?? '')
  res.status(code).json({ error: msg })
}

// ----- Webhook proxies -----------------------------------------------------
app.post('/api/report/generate', async (req: Request, res: Response) => {
  try {
    if (!N8N_FREE_REPORT) return fail(res, 500, 'N8N_WEBHOOK_FREE_REPORT not configured')
    const r = await fetch(N8N_FREE_REPORT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
    if (!r.ok) return fail(res, 502, `n8n returned ${r.status}`)
    const data = await r.json().catch(() => ({}))
    res.json(data)
  } catch (e) {
    fail(res, 500, 'Report generation failed', e)
  }
})

app.post('/api/reviews/approve', async (req: Request, res: Response) => {
  try {
    if (!N8N_REVIEW_APPROVE) return fail(res, 500, 'N8N_WEBHOOK_REVIEW_APPROVE not configured')
    const r = await fetch(N8N_REVIEW_APPROVE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
    const data = await r.json().catch(() => ({}))
    res.status(r.status).json(data)
  } catch (e) {
    fail(res, 500, 'Approval failed', e)
  }
})

// ----- Dashboard data ------------------------------------------------------
function clientIdOf(req: Request): string | null {
  const id = (req.query.clientId as string) || (req.body && req.body.clientId)
  return id || null
}

app.get('/api/dashboard/overview', async (req, res) => {
  const clientId = clientIdOf(req)
  if (!clientId) return fail(res, 400, 'clientId required')
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const [reviews, alerts, media, social] = await Promise.all([
      supabaseAdmin.from('reviews').select('*').eq('client_id', clientId).gte('created_at', since),
      supabaseAdmin.from('alerts').select('*').eq('client_id', clientId).eq('read', false),
      supabaseAdmin.from('media_mentions').select('*').eq('client_id', clientId).gte('created_at', since),
      supabaseAdmin.from('social_mentions').select('*').eq('client_id', clientId).gte('detected_at', since),
    ])
    const rows = reviews.data || []
    const ratingSum = rows.reduce((s, r: any) => s + (r.rating || 0), 0)
    const responded = rows.filter((r: any) => r.response_status === 'posted').length
    res.json({
      stats: {
        reviewsCount: rows.length,
        avgRating: rows.length ? +(ratingSum / rows.length).toFixed(2) : 0,
        responseRate: rows.length ? +((responded / rows.length) * 100).toFixed(1) : 0,
        pressMentions: media.data?.length || 0,
        socialMentions: social.data?.length || 0,
        unreadAlerts: alerts.data?.length || 0,
      },
      reviews: rows.slice(0, 5),
      alerts: alerts.data || [],
    })
  } catch (e) {
    fail(res, 500, 'Overview query failed', e)
  }
})

app.get('/api/dashboard/reviews', async (req, res) => {
  const clientId = clientIdOf(req)
  if (!clientId) return fail(res, 400, 'clientId required')
  const offset = Number(req.query.offset || 0)
  try {
    const { data, error, count } = await supabaseAdmin
      .from('reviews')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .range(offset, offset + 19)
    if (error) throw error
    res.json({ items: data || [], total: count || 0 })
  } catch (e) {
    fail(res, 500, 'Reviews query failed', e)
  }
})

app.get('/api/dashboard/media', async (req, res) => {
  const clientId = clientIdOf(req)
  if (!clientId) return fail(res, 400, 'clientId required')
  try {
    const { data, error } = await supabaseAdmin
      .from('media_mentions')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .limit(50)
    if (error) throw error
    res.json({ items: data || [] })
  } catch (e) {
    fail(res, 500, 'Media query failed', e)
  }
})

app.get('/api/dashboard/social', async (req, res) => {
  const clientId = clientIdOf(req)
  if (!clientId) return fail(res, 400, 'clientId required')
  try {
    const { data, error } = await supabaseAdmin
      .from('social_mentions')
      .select('*')
      .eq('client_id', clientId)
      .order('detected_at', { ascending: false })
      .limit(50)
    if (error) throw error
    res.json({ items: data || [] })
  } catch (e) {
    fail(res, 500, 'Social query failed', e)
  }
})

app.get('/api/dashboard/competitors', async (req, res) => {
  const clientId = clientIdOf(req)
  if (!clientId) return fail(res, 400, 'clientId required')
  try {
    const { data, error } = await supabaseAdmin
      .from('competitors')
      .select('*')
      .eq('client_id', clientId)
      .order('rating', { ascending: false })
    if (error) throw error
    res.json({ items: data || [] })
  } catch (e) {
    fail(res, 500, 'Competitors query failed', e)
  }
})

app.get('/api/dashboard/alerts', async (req, res) => {
  const clientId = clientIdOf(req)
  if (!clientId) return fail(res, 400, 'clientId required')
  try {
    const { data, error } = await supabaseAdmin
      .from('alerts')
      .select('*')
      .eq('client_id', clientId)
      .eq('read', false)
      .order('created_at', { ascending: false })
    if (error) throw error
    res.json({ items: data || [] })
  } catch (e) {
    fail(res, 500, 'Alerts query failed', e)
  }
})

// ----- Health --------------------------------------------------------------
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`[reputix-api] listening on http://localhost:${PORT}`)
})
