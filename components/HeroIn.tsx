import type { ReactNode } from "react";

/**
 * Entrée du texte du hero en CSS (globals.css → .hero-in) : visible dès le premier rendu serveur,
 * sans attendre le JavaScript (meilleur LCP) ; neutralisée si l'on préfère réduire les animations.
 */
export function HeroIn({ children }: { children: ReactNode }) {
  return <div className="hero-in">{children}</div>;
}
