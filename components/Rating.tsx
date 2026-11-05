import site from "@/data/site.json";
import { StarIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";

/** « ★★★★★ 4,8/5 sur Google · 86 avis », lien vers la fiche ; date du relevé en infobulle (data/site.json → rating.checked). */
export function Rating({ lang, d, className = "" }: { lang: Locale; d: Dict; className?: string }) {
  const date = formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" });
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${className}`} title={fill(d.hero.ratingNote, { date })}>
      <span className="flex text-gold" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </span>
      <span>
        <strong className="font-medium">{fill(d.hero.rating, { value: site.rating.value.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB") })}</strong>
        <span className="text-muted"> · {fill(d.hero.ratingCount, { count: site.rating.count })}</span>
      </span>
    </a>
  );
}
