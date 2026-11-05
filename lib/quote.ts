import site from "@/data/site.json";
import traiteur from "@/data/traiteur.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, isoDay } from "@/lib/format";
import { addDays } from "@/lib/hours";
import { isEmail, isPhone, str } from "@/lib/order";

export const EVENTS = traiteur.events;
export const FORMULAS = [...traiteur.items.map((i) => i.id), "unsure"];
export const BUDGETS = traiteur.budgets;
export const MODES = ["pickup", "delivery"] as const;

export type Quote = { event: string; date: string; guests: number; formula: string; budget: string; mode: (typeof MODES)[number]; address: string; name: string; phone: string; email: string; message: string };

/** Premier jour possible pour un événement : aujourd'hui + data/site.json → quote.minDays. */
export const firstEventDay = (now: Date) => addDays(isoDay(now), site.quote.minDays);

export function parseQuote(v: unknown, now = new Date()): Quote | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const pick = (val: unknown, list: readonly string[], dflt: string) => (typeof val === "string" && list.includes(val) ? val : dflt);
  const q: Quote = {
    event: pick(o.event, EVENTS, ""),
    date: /^\d{4}-\d{2}-\d{2}$/.test(str(o.date, 10)) ? str(o.date, 10) : "",
    guests: Math.min(2000, Math.max(0, Math.round(Number(o.guests) || 0))),
    formula: pick(o.formula, FORMULAS, "unsure"),
    budget: pick(o.budget, BUDGETS, "unsure"),
    mode: pick(o.mode, MODES, "pickup") as Quote["mode"],
    address: str(o.address, 300),
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
    message: str(o.message, 2000),
  };
  if (!q.event || !q.date || q.guests < 1 || !q.name || !isPhone(q.phone) || !isEmail(q.email)) return null;
  if (q.date < isoDay(now)) return null;
  return q;
}

/** Récapitulatif texte d'une demande de devis. */
export function quoteText(q: Quote, lang: Locale, d: Dict, withContact = true) {
  const t = d.quote;
  const c = lang === "fr" ? " :" : ":";
  const lines = [
    `${t.event}${c} ${t.events[q.event as keyof Dict["quote"]["events"]]}`,
    `${t.date}${c} ${formatDay(q.date, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`,
    `${t.guests}${c} ${q.guests}`,
    `${t.formula}${c} ${q.formula === "unsure" ? t.unsure : d.catering.items[q.formula as keyof Dict["catering"]["items"]].name}`,
    `${t.budget}${c} ${t.budgets[q.budget as keyof Dict["quote"]["budgets"]]}`,
    `${t.mode}${c} ${t.modes[q.mode]}${q.mode === "delivery" && q.address ? ` · ${q.address}` : ""}`,
  ];
  const contact = withContact ? [`${t.name}${c} ${q.name}`, `${t.phone}${c} ${q.phone}`, `${t.email}${c} ${q.email}`].join("\n") : "";
  return [lines.join("\n"), contact, q.message ? `${t.message}${c}\n${q.message}` : ""].filter(Boolean).join("\n\n");
}
