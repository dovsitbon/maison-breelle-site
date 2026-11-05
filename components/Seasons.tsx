"use client";

import { useEffect, useState } from "react";
import saisons from "@/data/saisons.json";
import { OrderLink } from "@/components/OrderLink";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { useLocale } from "@/components/providers";
import { altOf, fill, type Dict } from "@/lib/i18n";
import { formatDay, isoDay } from "@/lib/format";

type Season = { id: keyof Dict["seasons"]["items"]; show: string; deadline: string; to: string; image: string };

/** Fêtes en cours (show … to), sinon la prochaine à venir : la section n'est jamais vide ni périmée. */
function pick(today: string) {
  const all = (saisons.items as Season[]).filter((s) => today <= s.to).sort((a, b) => a.to.localeCompare(b.to));
  const live = all.filter((s) => s.show <= today);
  return { list: live.length ? live : all.slice(0, 1), upcoming: !live.length };
}

/** Section « Les fêtes » : Noël, Saint-Sylvestre, Pâques, avec la date limite de commande (data/saisons.json). */
export function Seasons({ buildDay }: { buildDay: string }) {
  const { lang, d } = useLocale();
  const [today, setToday] = useState(buildDay);
  // Date du jour côté navigateur (la page est statique) : synchronisation voulue après hydratation
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setToday(isoDay(new Date())), []);
  const { list, upcoming } = pick(today);
  const t = d.seasons;
  const day = (iso: string) => formatDay(iso, lang, { weekday: "long", day: "numeric", month: "long" });

  return (
    <section id="fetes" className="on-dark scroll-mt-32 bg-green px-4 py-20 text-cream md:px-8 md:py-28" aria-labelledby="fetes-title">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow !text-gold-light">{t.eyebrow}</p>
            <h2 id="fetes-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
              {t.title}
            </h2>
          </div>
          <p className="max-w-xl text-[1.0625rem] leading-relaxed text-cream/85">{t.lead}</p>
        </div>
        <ul className={`mt-12 grid gap-4 ${list.length > 1 ? "lg:grid-cols-2" : "lg:max-w-3xl"}`}>
          {list.map((s, i) => {
            const item = t.items[s.id];
            const open = today <= s.deadline;
            return (
              <Reveal as="li" key={`${s.id}-${s.to}`} delay={i * 0.08} className="grid bg-cream text-ink sm:grid-cols-[0.85fr_1.15fr]">
                <Shot k={s.image} alt={(k) => altOf(d, k)} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 92vw" className="aspect-[16/9] sm:aspect-auto sm:h-full sm:min-h-64" tone="bordeaux">
                  <span className="display border border-gold/70 px-6 py-3 text-[1.9rem]">{item.title}</span>
                </Shot>
                <div className="flex flex-col p-6 md:p-7">
                  <p className="text-[0.875rem] font-medium text-bordeaux first-letter:uppercase" suppressHydrationWarning>
                    {upcoming ? `${t.next} · ` : ""}
                    {open ? fill(t.deadline, { date: day(s.deadline) }) : t.past}
                  </p>
                  <h3 className="display mt-2 text-[1.9rem]">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{item.text}</p>
                  {open && (
                    <OrderLink href={`/${lang}#commander`} intent={{ product: "other", detail: item.title }} className="btn mt-6 self-start">
                      {fill(t.order, { name: item.title })}
                    </OrderLink>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
