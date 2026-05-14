import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema, type QuoteFormValues } from "@/lib/quote-schema";

/* ── Human-readable labels for select-field values ───────────────── */

const ORG_LABELS: Record<string, string> = {
  "commercial-farm":       "Commercial Farm",
  "government":            "Government",
  "cooperative":           "Cooperative",
  "financial-institution": "Financial Institution",
  "other":                 "Other",
};

const SERVICE_LABELS: Record<string, string> = {
  "land-clearing":       "Land Clearing",
  "land-preparation":    "Land Preparation",
  "planting-operations": "Planting Operations",
  "harvesting-services": "Harvesting Services",
  "full-cycle":          "Full-Cycle Operations",
  "custom-enterprise":   "Custom Enterprise Project",
};

const TIMELINE_LABELS: Record<string, string> = {
  "immediate":  "Immediate",
  "1-2-weeks":  "1–2 Weeks",
  "2-4-weeks":  "2–4 Weeks",
  "1-2-months": "1–2 Months",
  "flexible":   "Flexible",
};

/* ── Email HTML builder ──────────────────────────────────────────── */

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;width:40%;white-space:nowrap">
        <span style="color:#6b7280;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em">
          ${label}
        </span>
      </td>
      <td style="padding:10px 0 10px 20px;border-bottom:1px solid #f3f4f6;vertical-align:top">
        <span style="color:#111827;font-size:14px;line-height:1.5">
          ${value || "—"}
        </span>
      </td>
    </tr>`;
}

function buildEmailHtml(data: QuoteFormValues, submittedAt: string): string {
  const additionalRow = data.additionalInfo?.trim()
    ? row("Additional Details", data.additionalInfo.replace(/\n/g, "<br>"))
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Quote Request — ${data.organizationName}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px">
    <tr><td align="center">

      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;background:#ffffff;border-radius:8px;
                    overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.12)">

        <!-- Header -->
        <tr>
          <td style="background:#059669;padding:28px 32px">
            <p style="margin:0;color:#a7f3d0;font-size:11px;font-weight:700;
                      text-transform:uppercase;letter-spacing:0.1em">
              Farmerch Global Limited
            </p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;
                       font-weight:700;line-height:1.3">
              New Quote Request
            </h1>
            <p style="margin:6px 0 0;color:#d1fae5;font-size:13px">
              ${data.organizationName}
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row("Organization Type",  ORG_LABELS[data.organizationType]  ?? data.organizationType)}
              ${row("Organization Name",  data.organizationName)}
              ${row("Contact Name",       data.contactName)}
              ${row("Email",              data.email)}
              ${row("Phone",              data.phone)}
              ${row("Service Required",   SERVICE_LABELS[data.serviceRequired]   ?? data.serviceRequired)}
              ${row("Farm Size",          data.farmSize)}
              ${row("Location",           data.location)}
              ${row("Preferred Timeline", TIMELINE_LABELS[data.preferredTimeline] ?? data.preferredTimeline)}
              ${additionalRow}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px">
            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6">
              Submitted: ${submittedAt}<br>
              Reply to this email to contact ${data.contactName} directly.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── POST /api/quote ─────────────────────────────────────────────── */

export async function POST(request: NextRequest): Promise<NextResponse> {
  /* 1. Parse request body */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  /* 2. Server-side validation — never trust the client alone */
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  /* 3. Environment variable guard */
  const apiKey    = process.env.RESEND_API_KEY;
  const toEmail   = process.env.QUOTE_RECEIVER_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL
    ?? "Farmerch Quotes <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.error(
      "[api/quote] Missing environment variable(s):",
      !apiKey ? "RESEND_API_KEY" : "",
      !toEmail ? "QUOTE_RECEIVER_EMAIL" : ""
    );
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Please contact us directly at info@farmerch.co.",
      },
      { status: 500 }
    );
  }

  /* 4. Build and send the email */
  const data        = parsed.data;
  const submittedAt = new Date().toLocaleString("en-NG", {
    timeZone:  "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });

  const resend = new Resend(apiKey);

  const { error: resendError } = await resend.emails.send({
    from:    fromEmail,
    to:      [toEmail],
    replyTo: data.email,
    subject: `Quote Request — ${data.organizationName} · ${SERVICE_LABELS[data.serviceRequired] ?? data.serviceRequired}`,
    html:    buildEmailHtml(data, submittedAt),
  });

  if (resendError) {
    console.error("[api/quote] Resend error:", resendError);
    return NextResponse.json(
      {
        error:
          "We could not deliver your request at this time. Please try again or email us at info@farmerch.co.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
