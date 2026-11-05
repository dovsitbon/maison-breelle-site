import type { Dict, Locale } from "@/lib/i18n";
import { formatTime } from "@/lib/format";
import { weekHours } from "@/lib/hours";

/** Horaires de la semaine (data/horaires.json), coupure du midi comprise. */
export function HoursTable({ lang, d, className = "" }: { lang: Locale; d: Dict; className?: string }) {
  const week = weekHours();
  return (
    <table className={`w-full text-[0.9375rem] ${className}`}>
      <tbody>
        {week.map((slots, i) => (
          <tr key={i} className="border-b border-current/15 last:border-0">
            <th scope="row" className="py-2 pe-4 text-start align-top font-normal">
              {d.infos.days[i]}
            </th>
            <td className="py-2 text-end tabular-nums">
              {slots.length
                ? slots.map(([a, b], j) => (
                    <span key={j} className="block sm:inline">
                      {j > 0 && <span className="hidden sm:inline">, </span>}
                      {formatTime(a, lang)} – {formatTime(b, lang)}
                    </span>
                  ))
                : d.infos.closed}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
