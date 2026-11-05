"use client";

import { useEffect, useState, type CSSProperties } from "react";

const KEY = "mb-intro";
const at = (d: number, t?: number) => ({ "--d": `${d}s`, ...(t ? { "--t": `${t}s` } : {}) }) as CSSProperties;

/**
 * Ouverture (1,2 s, une fois par session), tout en CSS (globals.css) :
 * fond crème, une fine ligne dorée dessine l'enseigne d'une boutique ancienne (fronton, bandeau, devanture),
 * « MAISON BRÉELLE » s'y inscrit, puis « Charcuterie · Traiteur », fondu sur le hero.
 * Masquée d'office si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  const p = { pathLength: 1, className: "intro-draw" };
  return (
    <div className="intro-curtain flex items-center justify-center">
      <div className="relative w-[min(86vw,420px)]" aria-hidden="true">
        <svg viewBox="0 0 320 210" className="block h-auto w-full text-gold" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
          {/* Fronton et corniche */}
          <path {...p} d="M14 30H306M22 30L30 20H290L298 30" style={at(0, 0.34)} />
          {/* Bandeau de l'enseigne, double filet */}
          <path {...p} d="M22 36H298V92H22Z" style={at(0.08, 0.42)} />
          <path {...p} d="M29 42H291V86H29Z" strokeWidth={0.6} style={at(0.18, 0.36)} />
          {/* Devanture : pilastres, vitrine à petits bois, porte, seuil */}
          <path {...p} d="M30 92V196M290 92V196" style={at(0.26, 0.3)} />
          <path {...p} d="M48 112H190V178H48ZM95 112V178M143 112V178" strokeWidth={0.8} style={at(0.32, 0.34)} />
          <path {...p} d="M210 196V112H270V196" strokeWidth={0.8} style={at(0.36, 0.3)} />
          <path {...p} d="M6 196H314" style={at(0.42, 0.3)} />
        </svg>
        <p className="intro-name absolute inset-x-0 top-[17.5%] flex h-[16%] items-center justify-center font-[family-name:var(--font-display)] text-[clamp(1.05rem,5vw,1.55rem)] font-medium tracking-[0.16em] text-bordeaux uppercase" translate="no">
          Maison Bréelle
        </p>
        <p className="intro-sub absolute inset-x-0 top-[33%] text-center font-[family-name:var(--font-body)] text-[clamp(0.55rem,2.2vw,0.7rem)] font-medium tracking-[0.3em] text-ink uppercase" translate="no">
          Charcuterie · Traiteur
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="nav-link absolute end-4 bottom-4 min-h-11 px-4 text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
