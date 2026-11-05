import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import produits from "@/data/produits.json";
import { altOf, fill, getDict, isLocale } from "@/lib/i18n";
import { formatDay, isoDay } from "@/lib/format";
import { photo } from "@/lib/media";
import { homeJsonLd } from "@/lib/jsonld";
import { pagePath } from "@/lib/pages";
import { CateringCards } from "@/components/CateringCards";
import { DishOfDay } from "@/components/DishOfDay";
import { HeroIn } from "@/components/HeroIn";
import { HoursTable } from "@/components/HoursTable";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderForm } from "@/components/OrderForm";
import { OrderLink } from "@/components/OrderLink";
import { Rating } from "@/components/Rating";
import { Reveal } from "@/components/Reveal";
import { Seasons } from "@/components/Seasons";
import { Shop } from "@/components/Shop";
import { Shot } from "@/components/Shot";
import { Tiles } from "@/components/Tiles";
import { BagIcon, DomeIcon, PhoneIcon, PinIcon, PlusIcon, PotIcon } from "@/components/icons";
import { Pig } from "@/components/Logo";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const hero = photo("hero/plateaux-charcuterie")!;
  const alt = (k: string) => altOf(d, k);
  const orderHref = `/${lang}#commander`;
  const cateringHref = pagePath("catering", lang);
  const today = isoDay(new Date());

  const services = [
    { id: "pickup", icon: <BagIcon />, href: orderHref },
    { id: "catering", icon: <DomeIcon />, href: cateringHref },
    { id: "dish", icon: <PotIcon />, href: `/${lang}#plat-du-jour` },
    { id: "phone", icon: <PhoneIcon className="h-7 w-7" />, href: `tel:${site.phoneIntl}` },
  ] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* Hero : texte sur crème, la photo encadrée d'un double filet doré ; une seule pièce forte */}
      <section className="grid lg:min-h-[calc(100svh-10.5rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" aria-labelledby="hero-title">
        <div className="order-2 flex flex-col justify-center px-5 pt-10 pb-14 md:px-10 lg:order-1 lg:px-14 lg:py-16 xl:px-20">
          <HeroIn>
            <p className="eyebrow">{d.hero.eyebrow}</p>
            <h1 id="hero-title" className="display mt-5 text-[2.9rem] sm:text-[3.8rem] xl:text-[4.9rem]">
              {d.hero.title}
            </h1>
            <p className="lead mt-6 max-w-lg">{d.hero.sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <OrderLink href={orderHref} className="btn">
                {d.hero.ctaOrder}
              </OrderLink>
              <Link href={`${cateringHref}#devis`} className="btn-line">
                {d.hero.ctaQuote}
              </Link>
            </div>
            <div className="mt-7 flex flex-col gap-2 text-[0.9375rem] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Rating lang={lang} d={d} />
              <OpenStatus />
            </div>
          </HeroIn>
        </div>
        <div className="order-1 p-3 md:p-5 lg:order-2 lg:self-center lg:py-10 lg:ps-0 lg:pe-8">
          <div className="relative aspect-[16/10] border border-gold p-1.5 lg:aspect-[4/3] xl:aspect-[3/2]">
            <div className="relative h-full w-full overflow-hidden border border-gold/50">
              <Image src={hero.src} alt={alt(hero.key)} fill priority sizes="(min-width: 1024px) 56vw, 100vw" quality={80} className="object-cover object-[45%_50%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Tuiles de catégories, en capitales sur photo */}
      <section className="mx-auto max-w-[90rem] px-3 md:px-5" aria-labelledby="tiles-title">
        <h2 id="tiles-title" className="sr-only">
          {d.tiles.title}
        </h2>
        <Tiles />
      </section>

      {/* Bande de services en 4 pictos */}
      <section className="mx-auto max-w-[90rem] px-4 py-14 md:px-8 md:py-20" aria-labelledby="services-title">
        <h2 id="services-title" className="sr-only">
          {d.services.title}
        </h2>
        <ul className="grid grid-cols-1 border-y border-gold/60 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const it = d.services.items[s.id];
            return (
              <li key={s.id} className={`border-line ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-s" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-s" : ""}`}>
                <a href={s.href} className="group flex h-full gap-4 px-2 py-6 sm:px-6 md:py-8">
                  <span className="text-bordeaux">{s.icon}</span>
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-[1.25rem] font-medium group-hover:text-bordeaux">{it.title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{it.text}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* La boutique */}
      <section id="boutique" className="paper scroll-mt-32 px-4 py-20 md:px-8 md:py-28" aria-labelledby="boutique-title">
        <div className="mx-auto max-w-[90rem]">
          <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="eyebrow">{d.shop.eyebrow}</p>
              <h2 id="boutique-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
                {d.shop.title}
              </h2>
            </div>
            <p className="lead max-w-xl">{d.shop.lead}</p>
          </Reveal>
          <div className="mt-10">
            <Shop />
          </div>
          <p className="mt-10 text-[0.875rem] text-muted">{fill(d.shop.checked, { date: formatDay(produits.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
        </div>
      </section>

      {/* Le plat du jour */}
      <section id="plat-du-jour" className="scroll-mt-32 px-4 py-20 md:px-8 md:py-28" aria-labelledby="plat-title">
        <div className="mx-auto max-w-[80rem]">
          <div className="mb-10 text-center">
            <p className="eyebrow">{d.dish.eyebrow}</p>
            <h2 id="plat-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
              {d.dish.title}
            </h2>
          </div>
          <DishOfDay buildDay={today} />
        </div>
      </section>

      {/* Le traiteur */}
      <section id="traiteur" className="paper scroll-mt-32 px-4 py-20 md:px-8 md:py-28" aria-labelledby="traiteur-title">
        <div className="mx-auto max-w-[90rem]">
          <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="eyebrow">{d.catering.eyebrow}</p>
              <h2 id="traiteur-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
                {d.catering.title}
              </h2>
            </div>
            <p className="lead max-w-xl">{d.catering.lead}</p>
          </Reveal>
          <div className="mt-12">
            <CateringCards lang={lang} d={d} />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`${cateringHref}#devis`} className="btn">
              {d.catering.cta}
            </Link>
            <Link href={cateringHref} className="btn-line">
              {d.catering.more}
            </Link>
          </div>
        </div>
      </section>

      {/* Les fêtes */}
      <Seasons buildDay={today} />

      {/* Commande à retirer */}
      <section id="commander" className="scroll-mt-32 px-4 py-20 md:px-8 md:py-28" aria-labelledby="commander-title">
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">{d.order.eyebrow}</p>
            <h2 id="commander-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
              {d.order.title}
            </h2>
            <p className="lead mt-5 max-w-md">{d.order.lead}</p>
            <div className="mt-8 border-s border-gold ps-5">
              <p className="text-[0.9375rem] text-muted">{d.order.callInstead}</p>
              <a href={`tel:${site.phoneIntl}`} className="mt-1 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-[1.9rem] tabular-nums hover:text-bordeaux">
                <PhoneIcon className="h-6 w-6" />
                {site.phone}
              </a>
              <div className="mt-2 text-[0.9375rem]">
                <OpenStatus />
              </div>
            </div>
          </div>
          <OrderForm />
        </div>
      </section>

      {/* La maison */}
      <section id="maison" className="paper scroll-mt-32 px-4 py-20 md:px-8 md:py-28" aria-labelledby="maison-title">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Shot k="facade/facade" fallback="boutique/equipe" alt={alt} sizes="(min-width: 1024px) 45vw, 92vw" className="aspect-[4/5] border border-gold p-1.5 lg:sticky lg:top-36">
              <span className="flex flex-col items-center gap-4 text-bordeaux">
                <Pig className="h-12 w-auto" />
                <span className="font-[family-name:var(--font-display)] text-[1.35rem] tracking-[0.16em] uppercase">Maison Bréelle</span>
                <span className="text-[0.75rem] font-medium tracking-[0.22em] text-muted uppercase">11 rue Gaulthier de Rumilly</span>
              </span>
            </Shot>
          </Reveal>
          <div className="self-center">
            <Reveal>
              <p className="eyebrow">{d.house.eyebrow}</p>
              <h2 id="maison-title" className="display mt-3 text-[2.4rem] md:text-[3.2rem]">
                {d.house.title}
              </h2>
              <p className="lead mt-6">{d.house.p1}</p>
              <p className="lead mt-4">{d.house.p2}</p>
            </Reveal>
            <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
              {(["home", "district", "rating"] as const).map((k) => {
                const f = d.house.facts[k];
                const v = { value: site.rating.value.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB"), count: site.rating.count };
                return (
                  <div key={k} className="bg-cream p-5">
                    <dt className="display text-[1.5rem] text-bordeaux">{fill(f.title, v)}</dt>
                    <dd className="mt-1 text-[0.9375rem] leading-snug text-muted">{fill(f.text, v)}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section id="infos" className="on-dark scroll-mt-32 bg-ink px-4 py-20 text-cream md:px-8 md:py-28" aria-labelledby="infos-title">
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-gold-light">{d.infos.eyebrow}</p>
            <h2 id="infos-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
              {d.infos.title}
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow !text-gold-light">{d.infos.address}</h3>
                <address className="mt-3 text-[1.0625rem] not-italic">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city} · {site.address.district}
                </address>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium">
                  <PinIcon />
                  <span className="link-line">{d.infos.directions}</span>
                </a>
                <h3 className="eyebrow mt-8 !text-gold-light">{d.infos.phone}</h3>
                <a href={`tel:${site.phoneIntl}`} className="mt-3 inline-block font-[family-name:var(--font-display)] text-[1.7rem] tabular-nums">
                  {site.phone}
                </a>
                <h3 className="eyebrow mt-8 !text-gold-light">{d.infos.access}</h3>
                <p className="mt-3 leading-relaxed text-cream/80">{d.infos.accessText}</p>
              </div>
              <div>
                <h3 className="eyebrow !text-gold-light">{d.infos.hours}</h3>
                <div className="mt-3 text-[0.9375rem]">
                  <OpenStatus />
                </div>
                <HoursTable lang={lang} d={d} className="mt-3 text-cream/90" />
                <p className="mt-4 text-[0.9375rem] text-cream/75">{d.infos.lunch}</p>
              </div>
            </div>
          </div>
          <div className="min-h-80 border border-gold/40 p-1.5 lg:min-h-full">
            <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-80 w-full border-0 grayscale-[35%]" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 px-4 py-20 md:px-8 md:py-28" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">{d.faq.eyebrow}</p>
            <h2 id="faq-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
              {d.faq.title}
            </h2>
          </div>
          <div className="border-t border-gold/60">
            {d.faq.items.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-[1.0625rem] font-medium">
                  {f.q}
                  <PlusIcon className="faq-plus h-5 w-5 shrink-0 text-bordeaux" />
                </summary>
                <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
