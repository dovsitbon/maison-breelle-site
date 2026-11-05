import site from "@/data/site.json";
import produits from "@/data/produits.json";
import type { Dict } from "@/lib/i18n";
import { intlLocale, type Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay } from "@/lib/format";
import { addDays, parisHHMM, pickupTimes } from "@/lib/hours";

export const CUTS = produits.cuts as readonly string[];
export type Cut = (typeof CUTS)[number];
export type Unit = "kg" | "piece";

type ItemData = { price: number | null; from: boolean; unit: Unit; availability: "shop" | "order"; photo: string };
export const ITEMS = produits.items as Record<string, ItemData>;

/** Valeurs possibles d'une ligne : un produit de data/produits.json, « platDuJour » ou « other ». */
export const PRODUCT_VALUES = [...Object.keys(ITEMS), "platDuJour", "other"];

export type OrderLine = { product: string; qty: number; unit: Unit; cut: Cut; detail: string };
export type Order = { lines: OrderLine[]; date: string; time: string; name: string; phone: string; email: string; message: string };

export const unitOf = (product: string): Unit => (product === "platDuJour" || product === "other" ? "piece" : (ITEMS[product]?.unit ?? "kg"));

export const emptyLine = (product = "jambonBlanc", detail = ""): OrderLine => {
  const unit = unitOf(product);
  return { product, qty: unit === "kg" ? 0.5 : 1, unit, cut: "asIs", detail };
};

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/**
 * Premier retrait possible : maintenant + délai de commande (data/site.json → order.leadHours),
 * pendant les heures d'ouverture (coupure du midi comprise). Renvoie le jour et l'heure minimale ce jour-là.
 */
export function earliestPickup(now: Date): { day: string; notBefore: string } {
  const target = new Date(now.getTime() + site.order.leadHours * 3600_000);
  let day = isoDay(target);
  let notBefore = parisHHMM(target);
  for (let i = 0; i < 30; i++) {
    if (pickupTimes(day, site.order.slotMinutes, notBefore).length) return { day, notBefore };
    day = addDays(day, 1);
    notBefore = "00:00";
  }
  return { day, notBefore };
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
export const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Nettoie une commande reçue côté serveur : null si elle est incomplète ou hors des heures d'ouverture. */
export function parseOrder(v: unknown, now = new Date()): Order | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const lines = (Array.isArray(o.lines) ? o.lines : []).slice(0, 20).flatMap((l): OrderLine[] => {
    if (!l || typeof l !== "object") return [];
    const x = l as Record<string, unknown>;
    const product = typeof x.product === "string" && PRODUCT_VALUES.includes(x.product) ? x.product : "";
    if (!product) return [];
    const unit: Unit = x.unit === "piece" ? "piece" : x.unit === "kg" ? "kg" : unitOf(product);
    const raw = Number(x.qty) || 0;
    const qty = unit === "kg" ? Math.round(raw * 4) / 4 : Math.round(raw);
    if (qty <= 0) return [];
    const cut = CUTS.includes(x.cut as string) ? (x.cut as Cut) : "asIs";
    const detail = str(x.detail, 400);
    if (product === "other" && !detail) return [];
    return [{ product, qty: Math.min(qty, site.order.maxPerLine), unit, cut, detail }];
  });
  const q: Order = {
    lines,
    date: ISO.test(str(o.date, 10)) ? str(o.date, 10) : "",
    time: /^\d{2}:\d{2}$/.test(str(o.time, 5)) ? str(o.time, 5) : "",
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
    message: str(o.message, 1500),
  };
  if (!q.lines.length || !q.date || !q.time || !q.name || !isPhone(q.phone)) return null;
  // Jour et heure : pendant l'ouverture (hors coupure), et pas avant le premier retrait possible
  if (q.date < earliestPickup(now).day || !pickupTimes(q.date, site.order.slotMinutes).includes(q.time)) return null;
  if (q.email && !isEmail(q.email)) q.email = "";
  return q;
}

/** Nom d'un produit, du plat du jour ou « Autre » dans la langue voulue. */
export function productName(product: string, d: Dict) {
  if (product === "other") return d.order.other;
  if (product === "platDuJour") return d.dish.title;
  return d.products[product as keyof Dict["products"]]?.name ?? product;
}

/** Quantité lisible : « 1,5 kg » / « 2 pièces ». */
export function qtyLabel(l: Pick<OrderLine, "qty" | "unit">, lang: Locale, d: Dict) {
  const n = new Intl.NumberFormat(intlLocale[lang], { maximumFractionDigits: 2 }).format(l.qty);
  return l.unit === "kg" ? `${n} ${d.order.units.kg}` : `${n} ${l.qty > 1 ? d.order.units.pieces : d.order.units.piece}`;
}

/** Une ligne de commande en clair : « 0,5 kg · Jambon blanc · en tranches fines : 12 tranches ». */
export function lineLabel(l: OrderLine, lang: Locale, d: Dict) {
  const parts = [qtyLabel(l, lang, d), productName(l.product, d)];
  if (l.cut !== "asIs") parts.push(d.order.cuts[l.cut as keyof Dict["order"]["cuts"]]);
  const base = parts.join(" · ");
  return l.detail ? `${base} : ${l.detail}` : base;
}

/** Récapitulatif texte de la commande (e-mail, écran de confirmation). */
export function orderText(q: Order, lang: Locale, d: Dict, withContact = true) {
  const m = d.order.mail;
  const c = lang === "fr" ? " :" : ":";
  const pickup = `${formatDay(q.date, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}, ${formatTime(q.time, lang)}`;
  const blocks = [
    [`${m.lines}${c}`, ...q.lines.map((l) => `– ${lineLabel(l, lang, d)}`)].join("\n"),
    `${m.pickup}${c} ${pickup}`,
    withContact ? [`${m.name}${c} ${q.name}`, `${m.phone}${c} ${q.phone}`, q.email ? `${m.email}${c} ${q.email}` : ""].filter(Boolean).join("\n") : "",
    q.message ? `${m.message}${c}\n${q.message}` : "",
  ];
  return blocks.filter(Boolean).join("\n\n");
}

/** Lien WhatsApp (vide tant que la boutique n'a pas donné de portable : data/site.json → whatsapp). */
export const waLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "");
