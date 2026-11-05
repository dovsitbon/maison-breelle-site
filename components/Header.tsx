"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderLink } from "@/components/OrderLink";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { pagePath } from "@/lib/pages";

/**
 * En-tête sur deux lignes (comme une enseigne) : téléphone et statut à gauche, logo centré,
 * langue + « Devis traiteur » + « Commander » à droite ; la navigation dessous, entre deux filets dorés.
 */
export function Header() {
  const { lang, d } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (menu) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const home = `/${lang}`;
  const order = `${home}#commander`;
  const quote = `${pagePath("catering", lang)}#devis`;
  const links = [
    { href: `${home}#boutique`, label: d.nav.boutique },
    { href: pagePath("catering", lang), label: d.nav.traiteur },
    { href: `${home}#plat-du-jour`, label: d.nav.dish },
    { href: `${home}#fetes`, label: d.nav.fetes },
    { href: `${home}#infos`, label: d.nav.infos },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 bg-cream/96 backdrop-blur-sm transition-shadow duration-500 ${scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-10 focus:bg-cream focus:px-4 focus:py-2">
          {d.nav.skip}
        </a>
        <div className="mx-auto grid h-[4.25rem] max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:h-20 md:px-8">
          {/* Gauche : téléphone + statut (bureau), menu (mobile) */}
          <div className="flex items-center gap-4">
            <button type="button" className="-ms-2 flex h-11 w-11 items-center justify-center lg:hidden" onClick={() => setMenu(true)} aria-label={d.nav.menu} aria-expanded={menu}>
              <MenuIcon />
            </button>
            <div className="hidden flex-col text-[0.875rem] leading-tight lg:flex">
              <a href={`tel:${site.phoneIntl}`} className="inline-flex items-center gap-2 font-medium tabular-nums transition-colors hover:text-bordeaux">
                <PhoneIcon />
                {site.phone}
              </a>
              <OpenStatus className="mt-1 text-[0.8125rem] text-muted" />
            </div>
          </div>

          <Link href={home} aria-label={d.nav.home} className="justify-self-center">
            <Logo compact />
          </Link>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <LangSwitch lang={lang} label={d.nav.lang} className="hidden md:flex" />
            <a href={`tel:${site.phoneIntl}`} className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label={`${d.nav.call} ${site.phone}`}>
              <PhoneIcon />
            </a>
            <Link href={quote} className="btn-line hidden !min-h-11 !px-4 whitespace-nowrap xl:inline-flex">
              {d.nav.quoteCta}
            </Link>
            <OrderLink href={order} className="btn hidden !min-h-11 !px-5 whitespace-nowrap md:inline-flex">
              {d.nav.orderCta}
            </OrderLink>
          </div>
        </div>

        <nav className="hidden border-y border-gold/50 lg:block" aria-label={d.nav.menu}>
          <ul className="mx-auto flex h-11 max-w-[90rem] items-center justify-center gap-10 px-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link whitespace-nowrap transition-colors duration-300 hover:text-bordeaux">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {menu && (
        <div className="fade-in fixed inset-0 z-[60] flex flex-col overscroll-contain bg-cream text-ink" role="dialog" aria-modal="true" aria-label={d.nav.menu}>
          <div className="grid h-[4.25rem] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-8">
            <span />
            <Logo compact />
            <button type="button" className="-me-2 flex h-11 w-11 items-center justify-center justify-self-end" onClick={() => setMenu(false)} aria-label={d.nav.close}>
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center px-6" aria-label={d.nav.menu}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenu(false)} className="display border-b border-line py-3.5 text-[2.1rem]">
                {l.label}
              </Link>
            ))}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <OrderLink href={order} className="btn" onNavigate={() => setMenu(false)}>
                {d.nav.orderCta}
              </OrderLink>
              <Link href={quote} className="btn-line" onClick={() => setMenu(false)}>
                {d.nav.quoteCta}
              </Link>
            </div>
          </nav>
          <div className="flex items-center justify-between border-t border-gold/50 px-6 py-3">
            <LangSwitch lang={lang} label={d.nav.lang} />
            <a href={`tel:${site.phoneIntl}`} className="inline-flex min-h-11 items-center gap-2 font-medium tabular-nums">
              <PhoneIcon />
              {site.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/** Barre fixée en bas de l'écran sur mobile : « Commander », « Devis » et l'appel, toujours à portée de pouce. */
export function MobileBar() {
  const { lang, d } = useLocale();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_auto] gap-px border-t border-line bg-line pb-[env(safe-area-inset-bottom)] md:hidden">
      <OrderLink href={`/${lang}#commander`} className="btn !min-h-14 !rounded-none !px-3">
        {d.nav.orderCta}
      </OrderLink>
      <Link href={`${pagePath("catering", lang)}#devis`} className="nav-link flex min-h-14 items-center justify-center bg-cream px-3 text-center">
        {d.nav.quoteCta}
      </Link>
      <a href={`tel:${site.phoneIntl}`} className="flex min-h-14 w-14 items-center justify-center bg-cream text-bordeaux" aria-label={`${d.nav.call} ${site.phone}`}>
        <PhoneIcon className="h-5 w-5" />
      </a>
    </div>
  );
}
