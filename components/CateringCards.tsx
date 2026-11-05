import Link from "next/link";
import traiteur from "@/data/traiteur.json";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { DomeIcon } from "@/components/icons";
import { altOf, fill, type Dict, type Locale } from "@/lib/i18n";
import { price } from "@/lib/format";
import { pagePath } from "@/lib/pages";

type Id = keyof Dict["catering"]["items"];

/** Cartes de prestations traiteur : photo, étiquette « Dès … personnes », texte, prix « à partir de », lien vers le devis. */
export function CateringCards({ lang, d }: { lang: Locale; d: Dict }) {
  const c = d.catering;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {traiteur.items.map((item, i) => {
        const it = c.items[item.id as Id];
        const href = `${pagePath("catering", lang)}?formule=${item.id}#devis`;
        return (
          <Reveal as="li" key={item.id} delay={i * 0.06} className="flex flex-col border border-line bg-white">
            <div className="relative">
              <Shot k={item.photo} fallback={item.fallback} alt={(k) => altOf(d, k)} sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw" className="aspect-[4/3]" tone={i % 2 ? "green" : "bordeaux"}>
                <DomeIcon className="h-14 w-14 text-gold" />
              </Shot>
              <span className="absolute start-3 top-3 bg-cream px-2.5 py-1 text-[0.8125rem] font-medium text-ink">{item.minGuests ? fill(c.minGuests, { n: item.minGuests }) : c.onQuote}</span>
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <h3 className="display text-[1.6rem]">{it.name}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{it.text}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <span className="text-[0.9375rem] text-muted">{item.pricePerGuest ? fill(c.from, { price: price(item.pricePerGuest, lang) }) : c.priceQuote}</span>
                <Link href={href} aria-label={fill(c.ctaLabel, { name: it.name })} className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-bordeaux">
                  <span className="link-line">{c.cta}</span>
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
