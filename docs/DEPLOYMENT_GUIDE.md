# Deployment Guide — Farmerch Global Limited Website

## Prerequisites

- Vercel account with the project linked to your repository
- Resend account (https://resend.com) — free tier supports 3,000 emails/month
- Access to the Farmerch Gmail inbox (`farmerchltd@gmail.com`)

---

## 1. Resend account setup

1. Sign up at resend.com and create an API key under **API Keys → Create API Key**.
   - Name: `Farmerch Production`
   - Permission: **Sending access**
2. Copy the key — it starts with `re_` and is shown only once.

---

## 2. Domain verification in Resend (optional)

Verifying a sending domain lets you use a custom `from` address instead of
the Resend sandbox address. The destination inbox (`farmerchltd@gmail.com`) works
regardless of whether a custom domain is verified.

> **While unverified:** leave `QUOTE_FROM_EMAIL` unset (or set it to
> `Farmerch Quotes <onboarding@resend.dev>`). Emails still deliver to Gmail;
> they will show the sandbox sender in the From field.

---

## 3. Environment variables in Vercel

Go to **Vercel project → Settings → Environment Variables** and add:

| Variable | Value | Environments |
|---|---|---|
| `RESEND_API_KEY` | `re_…` (from step 1) | Production, Preview |
| `QUOTE_RECEIVER_EMAIL` | `farmerchltd@gmail.com` | Production, Preview |
| `QUOTE_FROM_EMAIL` | `Farmerch Quotes <onboarding@resend.dev>` | Production, Preview |

Variables are read at runtime by the `/api/quote` route handler — no rebuild needed after changing them.

---

## 4. Local testing with `.env.local`

```bash
# Copy the example file
cp .env.example .env.local
```

Fill in a real Resend test key. `QUOTE_RECEIVER_EMAIL` is already set to
`farmerchltd@gmail.com`. Start the dev server:

```bash
npm run dev
```

Navigate to `http://localhost:3000/#contact`, fill in the form, and submit.
Check the Gmail inbox for the formatted quote email.

---

## 5. End-to-end form test (production)

After deploying, verify the full flow:

1. Open the live site and scroll to the **Request a Mechanization Quote** section.
2. Submit a test entry with valid Nigerian phone (`+234 813 951 6150`) and real email.
3. Confirm the **Request Submitted** success screen appears.
4. Check `farmerchltd@gmail.com` — the email should arrive within seconds.
5. Verify the **Reply-To** header points to the submitter's email (allows direct reply from Gmail).

---

## 6. Error scenarios

| Scenario | Behaviour |
|---|---|
| `RESEND_API_KEY` missing | API returns 500; banner: *"Email delivery is not configured…"* |
| `QUOTE_RECEIVER_EMAIL` missing | Same as above |
| Resend API failure | API returns 500; banner: *"We could not deliver your request…"* |
| Invalid form data | Client-side Zod validation fires before fetch; server re-validates if bypassed |

---

## 7. Gmail spam filter (recommended)

To ensure quote emails from Resend don't land in spam:

1. In Gmail → **Settings → Filters and Blocked Addresses → Create a new filter**:
   - **From** contains `resend.dev`
   - **Action:** Never send to Spam, apply label *Quotes*
2. Click **Create filter**.
