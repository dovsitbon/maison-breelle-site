"use client";

import { useEffect, useState } from "react";
import site from "@/data/site.json";
import { OrderLink } from "@/components/OrderLink";
import { Shot } from "@/components/Shot";
import { PhoneIcon, PotIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { altOf, fill } from "@/lib/i18n";
import { formatDay, isoDay, price } from "@/lib/format";
import { isOpenDay } from "@/lib/hours";
import { dishDetail, dishName, dishOn } from "@/lib/plat";

/**
 * Le plat du jour (data/plat-du-jour.json), calculé côté navigateur pour la date du jour :
 * jamais un plat périmé ; sans plat renseigné, on invite à appeler.
 */
export function DishOfDay({ buildDay }: { buildDay: string }) {
  const { lang, d } = useLocale();
  const [today, setToday] = useState(buildDay);
  // Date du jour côté navigateur (la page est statique) : synchronisation voulue après hydratation
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setToday(isoDay(new Date())), []);
  const t = d.dish;
  const dish = dishOn(today);
  const open = isOpenDay(today);

  return (
    <div className="grid border border-gold/70 bg-white md:grid-cols-[0.9fr_1.1fr]">
      <Shot k={dish?.photo || "plats/plat-du-jour"} alt={(k) => altOf(d, k)} sizes="(min-width: 768px) 40vw, 92vw" className="aspect-[4/3] md:aspect-auto md:h-full md:min-h-72" tone="green">
        <PotIcon className="h-16 w-16 text-gold" />
      </Shot>
      <div className="flex flex-col justify-center p-6 md:p-10">
        <p className="text-[0.9375rem] font-medium text-bordeaux first-letter:uppercase" suppressHydrationWarning>
          {fill(t.today, { day: formatDay(today, lang) })}
        </p>
        {dish ? (
          <>
            <h3 className="display mt-3 text-[2.1rem] md:text-[2.6rem]">{dishName(dish, lang)}</h3>
            {dishDetail(dish, lang) && <p className="mt-2 text-[1.0625rem] text-muted">{dishDetail(dish, lang)}</p>}
            {dish.price !== null && <p className="mt-4 font-[family-name:var(--font-display)] text-[1.5rem] tabular-nums">{fill(t.price, { price: price(dish.price, lang) })}</p>}
            <div className="mt-7 flex flex-wrap gap-3">
              <OrderLink href={`/${lang}#commander`} intent={{ product: "platDuJour" }} className="btn">
                {t.order}
              </OrderLink>
              <a href={`tel:${site.phoneIntl}`} className="btn-line">
                <PhoneIcon />
                {site.phone}
              </a>
            </div>
          </>
        ) : (
          <>
            <h3 className="display mt-3 text-[1.9rem] md:text-[2.3rem]">{t.none}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{open ? t.noneText : t.closedDay}</p>
            <a href={`tel:${site.phoneIntl}`} className="btn mt-7 self-start">
              <PhoneIcon />
              {t.call}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
