/** Cochon au trait fin (logo, favicon, ouverture). Remplaçable : un seul composant. */
export const PIG = {
  body: "M16 15C22 9.2 39.5 9 46.6 13.6C50.6 14.6 53.9 16.8 56.2 19.2L58.4 19.6V23.2C55.3 24.2 52.6 24.3 50.2 25.2C46.4 28.2 27 29.2 18.6 27.3C13.4 26.1 12 18.4 16 15Z",
  ear: "M48.4 14.2L50.9 10.3L51.9 16",
  legs: "M21.6 27.6V33.4M25.6 28.1V33.4M42.4 27.8V33.4M46.4 26.6V33.4",
  tail: "M14.6 18.2C11.6 17 10.3 19.9 12.3 20.9C14.3 21.9 13.3 24.2 10.6 23.6",
  eye: "M52.6 18.3h0.01",
  snout: "M57.5 20.6v1.6",
};

export function Pig({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="8 7 52 28" className={className} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PIG.body} />
      <path d={PIG.ear} />
      <path d={PIG.legs} />
      <path d={PIG.tail} />
      <path d={PIG.eye} strokeWidth={1.8} />
      <path d={PIG.snout} strokeWidth={0.9} />
    </svg>
  );
}

/**
 * Logo typographique provisoire (à remplacer par le vrai logo s'il existe) :
 * « MAISON BRÉELLE » en capitales Fraunces, « CHARCUTERIE · TRAITEUR · AMIENS » en petit, un fin cochon au trait.
 */
export function Logo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`} translate="no">
      <Pig className={compact ? "h-[0.95rem] w-auto text-bordeaux md:h-[1.1rem]" : "h-6 w-auto"} />
      <span className={`mt-1 font-[family-name:var(--font-display)] leading-none font-medium whitespace-nowrap tracking-[0.16em] uppercase ${compact ? "text-[1.06rem] md:text-[1.35rem]" : "text-[1.7rem]"}`}>Maison Bréelle</span>
      <span className={`mt-1.5 flex items-center gap-2 font-[family-name:var(--font-body)] leading-none font-medium whitespace-nowrap tracking-[0.22em] uppercase opacity-80 ${compact ? "text-[0.5rem] md:text-[0.56rem]" : "text-[0.66rem]"}`}>
        <span className="h-px w-3 bg-gold" aria-hidden="true" />
        Charcuterie · Traiteur · Amiens
        <span className="h-px w-3 bg-gold" aria-hidden="true" />
      </span>
    </span>
  );
}
