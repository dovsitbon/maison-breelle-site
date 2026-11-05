import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { getDict, isLocale, locales, ogLocale, type Dict, type Locale } from "@/lib/i18n";
import { cateringJsonLd } from "@/lib/jsonld";
import { PAGE_IDS, pageOfSlug, pagePath, SLUGS, type PageId } from "@/lib/pages";
import { CateringCards } from "@/components/CateringCards";
import { QuoteForm } from "@/components/QuoteForm";
import { Rating } from "@/components/Rating";
import { PhoneIcon, PlusIcon } from "@/components/icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}
export const dynamicParams = false;

function resolve(lang: string, slug: string): { lang: Locale; id: PageId } | null {
  if (!isLocale(lang)) return null;
  const id = pageOfSlug(slug, lang);
  return id ? { lang, id } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) return {};
  const d = getDict(r.lang);
  const alternates = {
    canonical: pagePath(r.id, r.lang),
    languages: { ...Object.fromEntries(locales.map((x) => [x, pagePath(r.id, x)])), "x-default": pagePath(r.id, "fr") },
  };
  if (r.id === "legal") return { title: d.meta.legalTitle, alternates, robots: { index: false, follow: true } };
  return {
    title: d.meta.cateringTitle,
    description: d.meta.cateringDescription,
    alternates,
    openGraph: { type: "website", url: pagePath(r.id, r.lang), siteName: site.name, title: d.meta.cateringTitle, description: d.meta.cateringDescription, locale: ogLocale[r.lang], images: [{ url: "/og.jpg", width: 1200, height: 630, alt: d.meta.ogAlt }] },
  };
}

function Catering({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.cateringPage;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cateringJsonLd(lang)) }} />
      <section className="px-4 pt-14 pb-16 md:px-8 md:pt-20" aria-labelledby="catering-title">
        <div className="mx-auto max-w-[90rem]">
          <nav aria-label="Breadcrumb" className="text-[0.875rem] text-muted">
            <Link href={`/${lang}`} className="link-line">
              {site.name}
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page">{p.eyebrow}</span>
          </nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow">{p.eyebrow}</p>
              <h1 id="catering-title" className="display mt-4 text-[2.7rem] sm:text-[3.6rem] xl:text-[4.4rem]">
                {p.title}
              </h1>
            </div>
            <div>
              <p className="lead">{p.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#devis" className="btn">
                  {d.catering.cta}
                </a>
                <a href={`tel:${site.phoneIntl}`} className="btn-line">
                  <PhoneIcon />
                  {site.phone}
                </a>
              </div>
              <div className="mt-6 text-[0.9375rem]">
                <Rating lang={lang} d={d} />
              </div>
            </div>
          </div>
          <div className="filet mt-14" />
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8 md:pb-28" aria-labelledby="formules-title">
        <div className="mx-auto max-w-[90rem]">
          <h2 id="formules-title" className="display text-[2.2rem] md:text-[2.8rem]">
            {p.formulasTitle}
          </h2>
          <div className="mt-10">
            <CateringCards lang={lang} d={d} />
          </div>
        </div>
      </section>

      <section className="paper px-4 py-20 md:px-8 md:py-24" aria-labelledby="how-title">
        <div className="mx-auto max-w-[90rem]">
          <h2 id="how-title" className="display text-[2.2rem] md:text-[2.8rem]">
            {p.howTitle}
          </h2>
          <ol className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {p.steps.map((s, i) => (
              <li key={s.t} className="bg-cream p-6 md:p-8">
                <span className="font-[family-name:var(--font-display)] text-[2.4rem] text-gold" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="display mt-2 text-[1.5rem]">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="devis" className="scroll-mt-32 px-4 py-20 md:px-8 md:py-28" aria-labelledby="devis-title">
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">{d.quote.eyebrow}</p>
            <h2 id="devis-title" className="display mt-3 text-[2.5rem] md:text-[3.4rem]">
              {d.quote.title}
            </h2>
            <p className="lead mt-5 max-w-md">{d.quote.lead}</p>
            <div className="mt-8 border-s border-gold ps-5">
              <p className="text-[0.9375rem] text-muted">{d.order.callInstead}</p>
              <a href={`tel:${site.phoneIntl}`} className="mt-1 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-[1.9rem] tabular-nums hover:text-bordeaux">
                <PhoneIcon className="h-6 w-6" />
                {site.phone}
              </a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="paper px-4 py-20 md:px-8 md:py-24" aria-labelledby="cfaq-title">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 id="cfaq-title" className="display text-[2.2rem] md:text-[2.8rem]">
            {p.faqTitle}
          </h2>
          <div className="border-t border-gold/60">
            {p.faq.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-[1.0625rem] font-medium">
                  {f.q}
                  <PlusIcon className="faq-plus h-5 w-5 shrink-0 text-bordeaux" />
                </summary>
                <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
            <Link href={`/${lang}`} className="link-line mt-8 inline-block text-[0.9375rem] text-bordeaux">
              {p.back}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Legal({ d }: { d: Dict }) {
  const p = d.pages.legal;
  const pending = <em className="text-muted">{p.pending}</em>;
  const blocks: [string, React.ReactNode][] = [
    [p.editor, p.editorText],
    [p.company, site.legal.company || pending],
    [p.siret, site.legal.siret || pending],
    [p.host, site.legal.host],
    [p.data, p.dataText],
    [p.cookies, p.cookiesText],
    [p.photos, p.photosText],
  ];
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <h1 className="display text-[2.8rem] md:text-[3.6rem]">{p.title}</h1>
      {blocks.map(([title, body]) => (
        <section key={title} className="mt-10">
          <h2 className="eyebrow">{title}</h2>
          <p className="mt-3 leading-relaxed">{body}</p>
        </section>
      ))}
    </div>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) notFound();
  const d = getDict(r.lang);
  return r.id === "catering" ? <Catering lang={r.lang} d={d} /> : <Legal d={d} />;
}
