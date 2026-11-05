"use client";

import { usePathname } from "next/navigation";
import { langLabel, langName, locales, type Locale } from "@/lib/locales";
import { pageOfSlug, SLUGS } from "@/lib/pages";

/** « FR · EN » : renvoie vers la même page dans l'autre langue (les adresses des pages sont traduites). */
export function LangSwitch({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${lang}`;
  const slug = pathname.replace(/^\/(fr|en)\/?/, "").split("/")[0];
  const page = slug ? pageOfSlug(slug, lang) : null;
  const target = (l: Locale) => (page ? `/${l}/${SLUGS[page][l]}` : `/${l}`);

  return (
    <nav aria-label={label} className={`flex items-center gap-1.5 ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" className="opacity-35">
              ·
            </span>
          )}
          <a
            href={target(l)}
            hrefLang={l}
            lang={l}
            aria-label={langName[l]}
            aria-current={l === lang ? "true" : undefined}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
            }}
            className={`inline-flex min-h-10 min-w-7 items-center justify-center text-[0.8125rem] font-medium tracking-[0.1em] transition-opacity ${l === lang ? "text-bordeaux opacity-100" : "opacity-60 hover:opacity-100"}`}
          >
            {langLabel[l]}
          </a>
        </span>
      ))}
    </nav>
  );
}
