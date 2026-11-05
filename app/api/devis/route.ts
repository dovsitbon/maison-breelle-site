import { parseQuote, quoteText } from "@/lib/quote";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";
import { notifyAndConfirm } from "@/lib/mail";

// Demande de devis traiteur : notification à la boutique + copie au client (Resend, voir lib/mail.ts).
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const q = parseQuote(body.quote);
  if (!q) return Response.json({ ok: false }, { status: 400 });

  const fr = getDict("fr");
  const d = getDict(lang);
  const frText = quoteText(q, "fr", fr);
  const text = lang === "fr" ? frText : `${frText}\n\n${fr.quote.mail.lang} : ${lang.toUpperCase()}`;
  const m = d.quote.mail;
  const r = await notifyAndConfirm({
    subject: `${fr.quote.mail.subject} · ${q.name} · ${q.date} · ${q.guests} pers.`,
    title: fr.quote.mail.title,
    text,
    replyTo: q.email,
    confirm: { to: q.email, subject: m.confirmSubject, text: `${fill(m.confirmIntro, { name: q.name })}\n\n${quoteText(q, lang, d, false)}\n\n${m.confirmOutro}` },
  });
  return Response.json({ ok: true, ...r });
}
