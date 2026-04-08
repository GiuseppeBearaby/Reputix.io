# Reputix Outreach Pipeline — Setup Guide

## Cosa è stato costruito

| Workflow | ID n8n | Trigger | Funzione |
|---|---|---|---|
| W1 v2 Free Report | `E3hJcTERzL8i9o49` | Webhook | gpt-4o + json_schema, KPI estesi |
| W5 Guardian | `a0IFCmLZ5UsleTjF` | Schedule 15 min | Auto-reply review nuove |
| W6 Weekly Digest | `ioL6WGJchaBzAOCG` | Lun 8:00 | Digest settimanale |
| W8 Sentinel | `KaYWj3irPRTSeWE1` | Daily 7:00 | Brief mattutino |
| W9 Churn | `2NCBsfaYsHcA2w2s` | Daily 9:00 | Trial expiring + win-back |
| W10 Prospector | `Rz4xNAPX8020ldrI` | Daily 6:00 | Scrape ristoranti UAE |
| W11 Qualifier | `0J7bf4gNbSc6k2RS` | Daily 7:00 | Score con W1 |
| W12 Outreach | `iPi6w00W1p0nbJwT` | Lun-Ven 10/12/14 | Email + IG comment |
| W13 Conversation | `1YbDZN0BuzUeTyDn` | Webhook reply | Agent risponde, qualifica intent |
| W14 Social Media | `aSsap1X63mfBa8pF` | Daily 9:00 | IG draft caption + immagine |

## Step manuali da fare TU (15 minuti totali)

### 1. Creare tabella `prospects` su Supabase (1 min)

Apri https://supabase.com/dashboard/project/tzznbiswtjjoxiduwloh/sql/new
Apri il file `sql/prospects_schema.sql`, copia tutto, incolla, click **Run**.

### 2. Setup dominio reputix.io su Resend (5 min)

1. Vai su https://resend.com/domains → **Add Domain** → `reputix.io`
2. Resend mostra 3 record DNS (SPF, DKIM, DMARC) con valori specifici
3. Aprili in un'altra tab — non chiuderli

### 3. Setup DNS GoDaddy (5 min)

1. GoDaddy → My Products → Domains → reputix.io → **DNS** → Manage Zones
2. Aggiungi i 3 record TXT mostrati da Resend:

| Type | Name | Value | TTL |
|---|---|---|---|
| TXT | `send` (o quello che dice Resend) | `v=spf1 include:amazonses.com ~all` | 1 hour |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqG...` (lungo, copia da Resend) | 1 hour |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:hello@reputix.io` | 1 hour |

3. Salva, torna su Resend, click **Verify** → entro 5-30 min diventa verde
4. Quando è verde, mandami conferma e attivo i workflow

### 4. Pubblicare i 5 nuovi workflow su n8n (3 min)

Per ognuno dei 5 nuovi workflow apri il link e clicca **Publish** (in alto a destra):

- W10 Prospector → https://reputixapp.app.n8n.cloud/workflow/Rz4xNAPX8020ldrI
- W11 Qualifier → https://reputixapp.app.n8n.cloud/workflow/0J7bf4gNbSc6k2RS
- W12 Outreach → https://reputixapp.app.n8n.cloud/workflow/iPi6w00W1p0nbJwT
- W13 Conversation → https://reputixapp.app.n8n.cloud/workflow/1YbDZN0BuzUeTyDn
- W14 Social Media → https://reputixapp.app.n8n.cloud/workflow/aSsap1X63mfBa8pF

### 5. Aggiungere SERPAPI_KEY come env var n8n (1 min)

n8n cloud → Settings → Variables → Add → name `SERPAPI_KEY`, value = la tua chiave SerpAPI.

## Pricing finale Reputix (deciso)

| Plan | Prezzo/mese | Cosa include | Target |
|---|---|---|---|
| Starter | AED 149 | 1 location, auto-reply Google, weekly digest, 50 review/mo | Cafè |
| **Growth** ⭐ | **AED 349** | 3 location, multi-platform reply, daily AI alerts, competitor tracking, monthly PDF | Ristoranti standalone |
| Pro | AED 749 | 10 location, Google+TripAdvisor+Zomato+Talabat, social listening, custom branding | Catene piccole |
| Enterprise | da AED 1499 | Unlimited, API, white-label, account manager | Catene grandi |

**Prima offerta promo outreach:** 30 giorni gratis, no carta, cancel anytime.
Posizionamento: 6-10× più economico di Birdeye/Podium/Trustpilot.

## Pipeline outreach end-to-end

```
W10 (6am) → scrape SerpAPI Google Maps su 8 zone UAE
         → filtra rating < 4.5 con > 20 review
         → upsert in prospects (status='new')

W11 (7am) → fetch prospects status='new' (max 30/day)
         → chiama W1 webhook per ognuno → genera report
         → salva score, urgency, revenue_at_risk
         → status='qualified'

W12 (10/12/14 Lun-Ven) → fetch qualified ordinati per urgency_score DESC
         → gpt-4o personalizza email + ig_comment usando weaknesses reali
         → invia email da hello@reputix.io (reply-to g.sarnataro@hotmail.it)
         → status='contacted'

W13 (webhook) → quando arriva reply al webhook /webhook/prospect-reply
         → trova prospect, costruisce conversation_history
         → gpt-4o legge contesto, decide next_action (BOOK_CALL/SEND_TRIAL/HANDLE_OBJECTION/NOT_INTERESTED)
         → manda risposta automatica
         → se HOT LEAD → alert email a te
         → aggiorna status (replied/demo_booked/customer/do_not_contact)

W14 (9am) → genera caption IG + immagine DALL-E sul tema del giorno
         → email draft a te per APPROVE/EDIT
         → (futuro: post automatico via Instagram Graph API)
```

## Cosa manca per il "vero" outreach a regime

- **Webhook reply**: serve configurare su Resend → Webhooks → URL = `https://reputixapp.app.n8n.cloud/webhook/prospect-reply`, evento = `email.replied` (o usa Mailgun routing). Senza questo, le risposte arrivano a `g.sarnataro@hotmail.it` ma W13 non scatta automaticamente.
- **Calendly link**: aggiungi quando lo crei, basta sostituire la stringa "reply with your slot" in W13.
- **WhatsApp Cloud API**: dopo che hai numero dedicato, aggiungo nodo HTTP a W12 per parallelo email+WA.
- **Owner email scraping**: W10 attualmente non estrae email owner (Google Maps non la espone). Soluzione: aggiungere step Hunter.io / Apollo.io con dominio del sito → costa ~$50/mese, ma triplica il volume di prospect raggiungibili. Per ora W12 invia a `g.sarnataro@hotmail.it` come fallback per testare il flow.
- **Instagram comment automation**: Meta Graph API consente commento solo da pagina collegata; dopo che colleghi `@reputix.io` come pagina business, aggiungo nodo di pubblicazione automatica.

## Costi mensili stimati a regime

| Servizio | Costo |
|---|---|
| n8n cloud | $20/mese |
| Supabase | free tier (fino a 500MB) |
| OpenAI gpt-4o | ~$30/mese (50 lead/giorno × 3 chiamate × $0.02) |
| OpenAI DALL-E 3 | ~$5/mese (1 immagine/giorno) |
| SerpAPI | $50/mese (5K query) |
| Resend | free fino a 3K email/mese, poi $20/mo |
| GoDaddy reputix.io | ~$15/anno |
| **Totale** | **~$125/mese** |

Con 5 clienti Growth (AED 349 × 5 = AED 1745 ≈ $475/mese) sei già in profitto netto.
