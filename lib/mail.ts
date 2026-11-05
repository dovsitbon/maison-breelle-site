import { Resend } from "resend";
import site from "@/data/site.json";

// Envoi des e-mails (commandes et devis) avec Resend.
// Variables Vercel : RESEND_API_KEY, ORDER_NOTIFY_EMAIL (adresse de la boutique), RESEND_FROM (domaine vérifié dans Resend,
// ex. « Maison Bréelle <commandes@mondomaine.fr> » ; sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte).
// Sans ces variables, les routes répondent { notified: false } et le site invite le client à appeler pour confirmer.

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** E-mail aux couleurs de la maison : bandeau bordeaux, filet doré, texte en paragraphes. */
export function mailHtml(title: string, text: string) {
  const body = escapeHtml(text)
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 18px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="background:#F7F1E6;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-top:6px solid #6A1F25;font-family:Arial,Helvetica,sans-serif;color:#1B1816;font-size:15px;line-height:1.65">
<div style="padding:22px 28px 0;text-align:center"><p style="margin:0;font-family:Georgia,serif;font-size:20px;letter-spacing:.16em;color:#6A1F25">MAISON BRÉELLE</p>
<p style="margin:4px 0 0;font-size:10px;letter-spacing:.28em;color:#4B443E">CHARCUTERIE · TRAITEUR · AMIENS</p>
<div style="margin:16px auto 0;width:56px;height:1px;background:#B8955A"></div></div>
<div style="padding:24px 28px 30px"><h1 style="margin:0 0 22px;font-family:Georgia,serif;font-weight:normal;font-size:23px">${escapeHtml(title)}</h1>${body}
<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #DED3C2;font-size:13px;color:#4B443E">${site.address.street}, ${site.address.postalCode} ${site.address.city} · ${site.phone}</p></div></div></div>`;
}

export function mailer() {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!key || !to) return null;
  return { resend: new Resend(key), to, from: process.env.RESEND_FROM ?? "Maison Bréelle <onboarding@resend.dev>" };
}

/**
 * Notification à la boutique puis, si elle est partie et que le client a donné son e-mail, confirmation au client.
 */
export async function notifyAndConfirm(opts: { subject: string; title: string; text: string; replyTo?: string; confirm?: { to: string; subject: string; text: string } }) {
  const m = mailer();
  if (!m) return { notified: false, confirmed: false };
  let notified = false;
  let confirmed = false;
  try {
    const r = await m.resend.emails.send({ from: m.from, to: m.to, replyTo: opts.replyTo || undefined, subject: opts.subject, html: mailHtml(opts.title, opts.text), text: opts.text });
    notified = !r.error;
  } catch {}
  if (notified && opts.confirm) {
    try {
      const c = opts.confirm;
      const r = await m.resend.emails.send({ from: m.from, to: c.to, replyTo: m.to, subject: c.subject, html: mailHtml(c.subject, c.text), text: c.text });
      confirmed = !r.error;
    } catch {}
  }
  return { notified, confirmed };
}
