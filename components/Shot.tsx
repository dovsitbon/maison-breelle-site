import Image from "next/image";
import type { ReactNode } from "react";
import { photo } from "@/lib/media";

/**
 * Photo d'un emplacement (clé « categorie/nom » de public/media), ou sa remplaçante.
 * Tant que la photo n'a pas été prise et déposée dans assets/<categorie>/<nom>.jpg (puis `npm run media`),
 * on montre `fallback` (une autre photo), sinon un aplat sobre avec un motif discret et `children`.
 */
export function Shot({
  k,
  fallback,
  alt,
  sizes,
  className = "",
  priority = false,
  quality = 72,
  tone = "slot",
  fit = "",
  children,
}: {
  k: string | null | undefined;
  fallback?: string | null;
  alt: (key: string) => string;
  sizes: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  tone?: "slot" | "bordeaux" | "green" | "ink";
  /** Classes du cadrage de la photo (ex. object-top). */
  fit?: string;
  children?: ReactNode;
}) {
  const p = photo(k) ?? photo(fallback);
  if (p)
    return (
      <div className={`zoom bg-cream-deep ${className}`}>
        <Image src={p.src} alt={alt(p.key)} width={p.width} height={p.height} sizes={sizes} quality={quality} priority={priority} className={`h-full w-full object-cover ${fit}`} />
      </div>
    );
  const bg = tone === "bordeaux" ? "bg-bordeaux text-cream" : tone === "green" ? "bg-green text-cream" : tone === "ink" ? "bg-ink text-cream" : "text-muted";
  return <div className={`slot relative flex items-center justify-center ${bg} ${className}`}>{children}</div>;
}
