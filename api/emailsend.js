import sgMail from '@sendgrid/mail';

const MAX = { name: 120, email: 254, organisation: 160, role: 120, interest: 120, message: 4000 };
const clean = (value, max) => String(value ?? '').trim().slice(0, max);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const salesEmail = process.env.SALES_INBOX_EMAIL;
  if (!apiKey || !fromEmail || !salesEmail) {
    console.error('Email service configuration is incomplete.');
    return res.status(500).json({ success: false, message: 'The enquiry service is temporarily unavailable. Please try again later.' });
  }

  const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : (req.body || {});

  // Honeypot: quietly accept bot submissions without sending email.
  if (clean(body.companyWebsite, 200)) return res.status(200).json({ success: true });

  const data = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    organisation: clean(body.organisation, MAX.organisation),
    role: clean(body.role, MAX.role),
    interest: clean(body.interest, MAX.interest),
    message: clean(body.message, MAX.message),
  };

  if (!data.name || !data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ success: false, message: 'Please provide your name and a valid business email address.' });
  }

  sgMail.setApiKey(apiKey);
  const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(value || 'Not provided')]));
  const text = [
    'New Vigor Personnels website enquiry',
    `Name: ${data.name}`,
    `Business email: ${data.email}`,
    `Organisation: ${data.organisation || 'Not provided'}`,
    `Role: ${data.role || 'Not provided'}`,
    `Area of interest: ${data.interest || 'Not provided'}`,
    '',
    'Requirements:',
    data.message || 'Not provided',
  ].join('\n');
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#172b3a;line-height:1.6"><div style="max-width:640px;margin:auto;padding:28px"><p style="font-size:12px;letter-spacing:2px;color:#4d8178;font-weight:bold">VIGOR PERSONNELS</p><h2 style="margin-bottom:20px">New website enquiry</h2><table style="width:100%;border-collapse:collapse">${[['Name',safe.name],['Business email',safe.email],['Organisation',safe.organisation],['Role',safe.role],['Area of interest',safe.interest]].map(([k,v])=>`<tr><td style="padding:9px;border-bottom:1px solid #e5ebee;color:#637887;width:38%">${k}</td><td style="padding:9px;border-bottom:1px solid #e5ebee">${v}</td></tr>`).join('')}</table><h3 style="margin-top:24px">Requirements</h3><p style="white-space:pre-wrap;background:#f4f7f7;padding:16px">${safe.message}</p><p style="font-size:11px;color:#81919b">Submitted through personnels.products.vigortechnologies.in</p></div></body></html>`;

  try {
    await sgMail.send({
      to: salesEmail,
      from: { email: fromEmail, name: 'Vigor Personnels Website' },
      replyTo: { email: data.email, name: data.name },
      subject: `Vigor Personnels enquiry — ${data.name}`,
      text,
      html,
    });

    // Customer acknowledgement is best-effort; the internal enquiry remains successful if it fails.
    try {
      await sgMail.send({
        to: data.email,
        from: { email: fromEmail, name: 'Vigor Personnels' },
        subject: 'We received your Vigor Personnels enquiry',
        text: `Hello ${data.name},\n\nThank you for contacting Vigor Personnels. We have received your enquiry and our team will review it.\n\nRegards,\nVigor Technologies`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172b3a;line-height:1.7"><p style="font-weight:bold;letter-spacing:2px;color:#4d8178">VIGOR PERSONNELS</p><h2>Thank you for getting in touch.</h2><p>Hello ${safe.name},</p><p>We have received your enquiry. The Vigor Technologies team will review the information and follow up through the business email address you provided.</p><p>Regards,<br/><strong>Vigor Personnels Team</strong><br/>Vigor Technologies</p></div>`,
      });
    } catch (ackError) {
      console.error('Customer acknowledgement email failed:', ackError?.response?.body || ackError?.message || 'Unknown error');
    }

    return res.status(200).json({ success: true, message: 'Your enquiry has been sent successfully.' });
  } catch (error) {
    console.error('SendGrid delivery failed:', error?.response?.body || error?.message || 'Unknown error');
    return res.status(502).json({ success: false, message: 'We could not send your enquiry right now. Please try again shortly.' });
  }
}
