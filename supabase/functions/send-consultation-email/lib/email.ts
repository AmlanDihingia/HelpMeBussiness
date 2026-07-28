const RESEND_API_URL = "https://api.resend.com/emails";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  from: string;
  apiKey: string;
}

export async function sendEmail(params: SendEmailParams): Promise<{ id: string }> {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Resend API error (${response.status}): ${errorText.substring(0, 200)}`
    );
  }

  return response.json();
}

export function buildEmailHtml(
  fullName: string,
  analysis: string,
  businessType: string
): string {
  // Format the raw AI text into HTML
  // Highlight section headers (e.g. "1. YOUR BUSINESS SNAPSHOT")
  let formattedAnalysis = analysis
    .replace(/^(\d+\.\s.*)$/gm, '<h3 style="margin-top:32px;margin-bottom:12px;font-size:16px;font-weight:700;color:#22d3ee;text-transform:uppercase;letter-spacing:0.5px;">$1</h3>')
    // Highlight list items
    .replace(/^•(.*)$/gm, '<div style="margin-left:12px;margin-bottom:6px;"><span style="color:#22d3ee;margin-right:8px;">•</span>$1</div>')
    .replace(/^(\d+)\.\s(.*)$/gm, (match, p1, p2) => {
      // Don't replace headers (already processed), only list items starting with numbers inside sections
      if (match.includes("YOUR BUSINESS SNAPSHOT") || match.includes("WHAT TO FOCUS ON FIRST") || match.includes("CORE DIAGNOSIS")) return match;
      return `<div style="margin-left:12px;margin-bottom:6px;"><span style="color:#22d3ee;font-weight:bold;margin-right:8px;">${p1}.</span>${p2}</div>`;
    })
    .replace(/\\n/g, "<br>");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Business Validation Report</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid rgba(255,255,255,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding:40px 32px 24px;text-align:center;">
              <div style="font-size:24px;font-weight:800;color:#fff;margin-bottom:4px;">
                HelpMe<span style="color:#22d3ee;">Business</span>
              </div>
              <div style="font-size:12px;color:#71717a;letter-spacing:1px;text-transform:uppercase;">
                Business Validation Report
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:16px 32px 8px;">
              <div style="font-size:18px;font-weight:600;color:#fff;line-height:1.6;">
                Hi ${fullName},
              </div>
              <div style="font-size:15px;color:#a1a1aa;line-height:1.6;margin-top:12px;">
                Your business inputs have been analyzed. Here is your brutal, no-fluff reality check.
              </div>
            </td>
          </tr>

          <!-- Analysis Content -->
          <tr>
            <td style="padding:8px 32px;">
              <div style="font-size:15px;color:#e4e4e7;line-height:1.7;">
                ${formattedAnalysis}
              </div>
            </td>
          </tr>

          <!-- The CTA Sections -->
          <tr>
            <td style="padding:40px 32px 16px;">
              
              <div style="margin-bottom:32px;">
                <h3 style="margin-top:0;margin-bottom:12px;font-size:16px;font-weight:700;color:#f43f5e;text-transform:uppercase;letter-spacing:0.5px;">
                  Common Founder Pitfalls
                </h3>
                <div style="font-size:15px;color:#a1a1aa;line-height:1.7;">
                  Many founders read their report, agree with it, and continue running the business the same way without making structural changes.
                </div>
              </div>

              <div style="margin-bottom:32px;">
                <h3 style="margin-top:0;margin-bottom:12px;font-size:16px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:0.5px;">
                  A Structured Approach
                </h3>
                <div style="font-size:15px;color:#e4e4e7;line-height:1.7;">
                  The most successful businesses take this clarity and turn it into a structured plan:
                  <div style="margin-left:12px;margin-top:8px;">
                    <span style="color:#10b981;margin-right:8px;">•</span>Prioritizing what to fix first<br>
                    <span style="color:#10b981;margin-right:8px;">•</span>Deciding what to ignore<br>
                    <span style="color:#10b981;margin-right:8px;">•</span>Focusing on what actually moves revenue
                  </div>
                </div>
              </div>

              <div style="background:linear-gradient(135deg,rgba(34,211,238,0.08),rgba(59,130,246,0.08));border:1px solid rgba(34,211,238,0.2);border-radius:16px;padding:32px;margin-top:16px;">
                <h3 style="margin-top:0;margin-bottom:16px;font-size:18px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.5px;">
                  Book Your Clarity Call
                </h3>
                <div style="font-size:15px;color:#e4e4e7;line-height:1.7;margin-bottom:24px;">
                  If you want professional help breaking this down, we can schedule a consultation. On this call, we will:<br>
                  <div style="margin-left:12px;margin-top:8px;margin-bottom:16px;color:#a1a1aa;">
                    <span style="color:#22d3ee;margin-right:8px;">•</span>Walk through your report in detail<br>
                    <span style="color:#22d3ee;margin-right:8px;">•</span>Identify your exact bottlenecks<br>
                    <span style="color:#22d3ee;margin-right:8px;">•</span>Map what to fix and in what order<br>
                    <span style="color:#22d3ee;margin-right:8px;">•</span>Show how to structure your revenue and systems
                  </div>
                  <strong style="color:#fff;">Gain actionable clarity for your business today.</strong>
                </div>
                
                <a href="https://calendly.com/nexversestudios/spark-call-clarity-session" style="display:block;text-align:center;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#000;font-weight:800;font-size:15px;padding:16px 32px;border-radius:12px;text-decoration:none;letter-spacing:0.5px;">
                  Schedule Your Consultation →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <div style="font-size:12px;color:#52525b;line-height:1.6;">
                This analysis was generated by AI based on your provided inputs.<br>
                © ${new Date().getFullYear()} HelpMeBusiness. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildEmailText(fullName: string, analysis: string): string {
  return `Hi ${fullName},

Your business inputs have been analyzed. Here is your brutal, no-fluff reality check:

${analysis}

---
Common Founder Pitfalls
Many founders read their report, agree with it, and continue running the business the same way without making structural changes.

A Structured Approach
The most successful businesses take this clarity and turn it into a structured plan:
- Prioritizing what to fix first
- Deciding what to ignore
- Focusing on what actually moves revenue

Book Your Clarity Call
If you want professional help breaking this down, we can schedule a consultation. On this call, we will:
- Walk through your report in detail
- Identify your exact bottlenecks
- Map what to fix and in what order
- Show how to structure your revenue and systems

Gain actionable clarity for your business today.

Schedule Your Consultation → https://calendly.com/nexversestudios/spark-call-clarity-session
---
This analysis was generated by AI based on your provided inputs.
© ${new Date().getFullYear()} HelpMeBusiness
`;
}
