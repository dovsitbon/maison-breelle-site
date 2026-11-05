"use client";

import { Shot } from "@/components/Shot";
import { useLocale } from "@/components/providers";
import type { Dict } from "@/lib/i18n";

export const FILTER_EVENT = "mb:filter";

type TileId = keyof Dict["tiles"]["items"];
// photo : clé de public/media ; tant qu'elle manque, la tuile reste un aplat de couleur avec un filet doré.
const TILES: { id: TileId; photo: string; fallback?: string; tone: "bordeaux" | "green" | "ink" }[] = [
  { id: "charcuterie", photo: "boutique/vitrine-charcuterie", tone: "bordeaux" },
  { id: "plats", photo: "plats/plats-cuisines", tone: "green" },
  { id: "salades", photo: "plats/salades", fallback: "plats/salade-pommes-de-terre", tone: "ink" },
  { id: "plateaux", photo: "traiteur/plateaux", fallback: "traiteur/plateau-rosbif", tone: "bordeaux" },
  { id: "fetes", photo: "traiteur/fetes", tone: "green" },
];

/** Tuiles de catégories en capitales sur photo, juste après le hero : un clic filtre « La boutique » et y descend. */
export function Tiles() {
  const { d } = useLocale();
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">
      {TILES.map((t, i) => {
        const href = t.id === "fetes" ? "#fetes" : "#boutique";
        return (
          <li key={t.id} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
            <a
              href={href}
              onClick={() => t.id !== "fetes" && window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: t.id }))}
              className={`group relative block overflow-hidden ${i === 4 ? "aspect-[2/1] md:aspect-[3/4]" : "aspect-[4/5] md:aspect-[3/4]"}`}
            >
              <Shot k={t.photo} fallback={t.fallback} alt={() => ""} sizes="(min-width: 768px) 20vw, 50vw" className="absolute inset-0 h-full w-full" tone={t.tone} />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" aria-hidden="true" />
              <span className="pointer-events-none absolute inset-2.5 border border-gold/60 transition-[inset] duration-500 group-hover:inset-3.5" aria-hidden="true" />
              <span className="absolute inset-x-5 bottom-5 text-center font-[family-name:var(--font-body)] text-[0.8125rem] font-medium tracking-[0.2em] text-cream uppercase md:text-[0.875rem]">{d.tiles.items[t.id]}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
