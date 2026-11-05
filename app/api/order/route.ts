import { orderText, parseOrder } from "@/lib/order";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";
import { notifyAndConfirm } from "@/lib/mail";

// Commande à retirer : la boutique n'a qu'une ligne fixe, la commande part par e-mail (Resend, voir lib/mail.ts).
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const q = parseOrder(body.order);
  if (!q) return Response.json({ ok: false }, { status: 400 });

  const fr = getDict("fr");
  const d = getDict(lang);
  const frText = orderText(q, "fr", fr);
  const text = lang === "fr" ? frText : `${frText}\n\n${fr.order.mail.lang} : ${lang.toUpperCase()}`;
  const m = d.order.mail;
  const r = await notifyAndConfirm({
    subject: `${fr.order.mail.subject} · ${q.name} · ${q.date} ${q.time}`,
    title: fr.order.mail.title,
    text,
    replyTo: q.email,
    confirm: q.email ? { to: q.email, subject: m.confirmSubject, text: `${fill(m.confirmIntro, { name: q.name })}\n\n${orderText(q, lang, d, false)}\n\n${m.confirmOutro}` } : undefined,
  });
  return Response.json({ ok: true, ...r });
}
