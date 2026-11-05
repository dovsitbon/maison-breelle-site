import plat from "@/data/plat-du-jour.json";
import { weekday } from "@/lib/hours";
import type { Locale } from "@/lib/locales";

type Dish = { fr: string; en: string; detailFr?: string; detailEn?: string; price: number | null; photo?: string };

/** Plat du jour pour une date (AAAA-MM-JJ) : celui du jour s'il est daté d'aujourd'hui, sinon celui de la semaine, sinon null. */
export function dishOn(iso: string): Dish | null {
  const t = plat.today as Dish & { date: string };
  if (t.date === iso && t.fr) return t;
  const w = (plat.week as Record<string, Dish | null>)[String(weekday(iso))];
  return w && w.fr ? w : null;
}

export const dishName = (d: Dish, lang: Locale) => (lang === "en" && d.en ? d.en : d.fr);
export const dishDetail = (d: Dish, lang: Locale) => (lang === "en" ? d.detailEn || d.detailFr : d.detailFr) ?? "";
