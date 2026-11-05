import type { MetadataRoute } from "next";
import site from "@/data/site.json";
import { defaultLocale, locales } from "@/lib/locales";
import { pagePath } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = { ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`])), "x-default": `${site.url}/${defaultLocale}` };
  const catering = { ...Object.fromEntries(locales.map((l) => [l, `${site.url}${pagePath("catering", l)}`])), "x-default": `${site.url}${pagePath("catering", defaultLocale)}` };
  return [
    ...locales.map((lang) => ({ url: `${site.url}/${lang}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: lang === defaultLocale ? 1 : 0.8, alternates: { languages: home } })),
    ...locales.map((lang) => ({ url: `${site.url}${pagePath("catering", lang)}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: lang === defaultLocale ? 0.9 : 0.7, alternates: { languages: catering } })),
  ];
}
