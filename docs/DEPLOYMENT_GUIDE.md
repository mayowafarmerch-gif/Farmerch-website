# Deployment Guide — Farmerch Global Limited Website

## Prerequisites

- Vercel account with the project linked to your repository
- Resend account (https://resend.com) — free tier supports 3,000 emails/month
- Access to the Farmerch Zoho inbox (`info@farmerch.co`)

---

## 1. Resend account setup

1. Sign up at resend.com and create an API key under **API Keys → Create API Key**.
   - Name: `Farmerch Production`
   - Permission: **Sending access**
2. Copy the key — it starts with `re_` and is shown only once.

---

## 2. Domain verification in Resend (recommended before go-live)

Verifying `farmerch.co` lets you send from `quotes@farmerch.co` instead of
the Resend sandbox address.

1. In Resend dashboard → **Domains → Add Domain** → enter `farmerch.co`.
2. Add the DNS records Resend provides (SPF, DKIM, DMARC) in your DNS provider.
3. Click **Verify** — propagation takes up to 48 hours.
4. Once verified, update `QUOTE_FROM_EMAIL` in Vercel to:
   ```
   Farmerch Quotes <quotes@farmerch.co>
   ```

> **While unverified:** leave `QUOTE_FROM_EMAIL` unset (or set it to
> `Farmerch Quotes <onboarding@resend.dev>`). Emails still deliver; they
> will show the sandbox sender.

---

## 3. Environment variables in Vercel

Go to **Vercel project → Settings → Environment Variables** and add:

| Variable | Value | Environments |
|---|---|---|
| `RESEND_API_KEY` | `re_…` (from step 1) | Production, Preview |
| `QUOTE_RECEIVER_EMAIL` | `info@farmerch.co` | Production, Preview |
| `QUOTE_FROM_EMAIL` | `Farmerch Quotes <onboarding@resend.dev>` (until domain verified) | Production, Preview |

Variables are read at runtime by the `/api/quote` route handler — no rebuild needed after changing them.

---

## 4. Local testing with `.env.local`

```bash
# Copy the example file
cp .env.example .env.local
```

Fill in a real Resend test key and your own email as `QUOTE_RECEIVER_EMAIL`.
Start the dev server:

```bash
npm run dev
```

Navigate to `http://localhost:3000/#contact`, fill in the form, and submit.
Check the inbox for the formatted quote email.

---

## 5. End-to-end form test (production)

After deploying, verify the full flow:

1. Open the live site and scroll to the **Request a Mechanization Quote** section.
2. Submit a test entry with valid Nigerian phone (`+234 813 951 6150`) and real email.
3. Confirm the **Request Submitted** success screen appears.
4. Check `info@farmerch.co` — the email should arrive within seconds.
5. Verify the **Reply-To** header points to the submitter's email (allows direct reply from Zoho).

---

## 6. Error scenarios

| Scenario | Behaviour |
|---|---|
| `RESEND_API_KEY` missing | API returns 500; banner: *"Email delivery is not configured…"* |
| `QUOTE_RECEIVER_EMAIL` missing | Same as above |
| Resend API failure | API returns 500; banner: *"We could not deliver your request…"* |
| Invalid form data | Client-side Zod validation fires before fetch; server re-validates if bypassed |

---

## 7. Zoho inbox configuration (optional)

To ensure quote emails don't land in spam:

1. In Zoho Mail → **Settings → Filters** → create a rule:
   - **From** contains `resend.dev` (or `farmerch.co` after verification)
   - **Action:** Mark as not spam, apply label *Quotes*
2. After domain verification, add the Resend SPF/DKIM records so Zoho recognises the sender as authorised.
