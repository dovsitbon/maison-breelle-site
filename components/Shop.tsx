"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import produits from "@/data/produits.json";
import { FILTER_EVENT } from "@/components/Tiles";
import { OrderLink } from "@/components/OrderLink";
import { PlusIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { altOf, fill, type Dict } from "@/lib/i18n";
import { price } from "@/lib/format";
import { photo } from "@/lib/media";
import { ITEMS } from "@/lib/order";

type Cat = (typeof produits.categories)[number]["id"] | "all";

/** Prix en HTML : « À partir de 12,90 € le kg », ou « Prix au kilo en boutique » tant qu'il n'est pas renseigné (data/produits.json). */
export function PriceLine({ id }: { id: string }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  const m = d.shop;
  if (it.price === null) return <span className="text-[0.9375rem] text-muted">{it.availability === "order" ? m.priceOrder : it.unit === "kg" ? m.priceKg : m.pricePiece}</span>;
  return (
    <span className="text-[0.9375rem]">
      {it.from && <span className="text-muted">{m.from} </span>}
      <strong className="font-[family-name:var(--font-display)] text-[1.3rem] font-medium tabular-nums">{price(it.price, lang)}</strong>
      <span className="text-muted"> {it.unit === "kg" ? m.perKg : m.perPiece}</span>
    </span>
  );
}

/**
 * « La boutique » : filtre par rayon et cartes produits (photo si elle existe, nom, note, prix, « en boutique » / « sur commande »).
 * Les tuiles du haut de page règlent le filtre (événement FILTER_EVENT).
 */
export function Shop() {
  const { lang, d } = useLocale();
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<Cat>("all");

  useEffect(() => {
    const on = (e: Event) => setCat((e as CustomEvent<Cat>).detail);
    window.addEventListener(FILTER_EVENT, on);
    return () => window.removeEventListener(FILTER_EVENT, on);
  }, []);

  const cats = produits.categories.filter((c) => cat === "all" || c.id === cat);
  const tabs: Cat[] = ["all", ...produits.categories.map((c) => c.id)];

  return (
    <div>
      <div role="toolbar" aria-label={d.shop.filter} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {tabs.map((t) => (
          <button key={t} type="button" aria-pressed={cat === t} onClick={() => setCat(t)} className="chip shrink-0 whitespace-nowrap">
            {t === "all" ? d.shop.all : d.categories[t as keyof Dict["categories"]]}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {cats.map((c) => (
            <motion.section
              key={c.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-12"
              aria-labelledby={`cat-${c.id}`}
            >
              <h3 id={`cat-${c.id}`} className="display flex items-center gap-4 text-[1.6rem] md:text-[1.85rem]">
                {d.categories[c.id as keyof Dict["categories"]]}
                <span className="h-px flex-1 bg-gold/60" aria-hidden="true" />
              </h3>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {c.items.map((id) => {
                  const it = ITEMS[id];
                  const p = d.products[id as keyof Dict["products"]];
                  const ph = photo(it.photo);
                  return (
                    <li key={id} className="group flex flex-col border border-line bg-white">
                      {ph && (
                        <div className="zoom aspect-[4/3] bg-cream-deep">
                          <Image src={ph.src} alt={altOf(d, ph.key)} width={ph.width} height={ph.height} sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" quality={70} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-4 md:p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-[family-name:var(--font-display)] text-[1.2rem] leading-snug font-medium">{p.name}</h4>
                          <span className={`mt-0.5 shrink-0 border px-2 py-0.5 text-[0.75rem] font-medium whitespace-nowrap ${it.availability === "order" ? "border-green text-green" : "border-line text-muted"}`}>{it.availability === "order" ? d.shop.order : d.shop.shop}</span>
                        </div>
                        <p className="mt-1 text-[0.9375rem] text-muted">{p.note}</p>
                        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-2 pt-4">
                          <PriceLine id={id} />
                          <OrderLink href={`/${lang}#commander`} intent={{ product: id }} label={fill(d.shop.addLabel, { name: p.name })} className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-bordeaux">
                            <PlusIcon />
                            <span className="link-line">{d.shop.add}</span>
                          </OrderLink>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
