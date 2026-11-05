import site from "@/data/site.json";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { weekHours } from "@/lib/hours";
import { pagePath } from "@/lib/pages";

const BUSINESS = `${site.url}/#shop`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function business(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": ["ButcherShop", "FoodEstablishment"],
    "@id": BUSINESS,
    name: site.fullName,
    alternateName: ["Maison Bréelle", "Charcuterie Traiteur Bréelle"],
    description: d.meta.description,
    url: `${site.url}/${lang}`,
    image: [`${site.url}/og.jpg`, `${site.url}/media/hero/plateaux-charcuterie.jpg`],
    logo: `${site.url}/icon.svg`,
    telephone: site.phoneIntl,
    ...(site.email ? { email: site.email } : {}),
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: { "@type": "PostalAddress", streetAddress: site.address.street, postalCode: site.address.postalCode, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    areaServed: [{ "@type": "City", name: "Amiens" }, { "@type": "Place", name: "Henriville, Amiens" }],
    founder: [{ "@type": "Person", name: "Olivier Bréelle" }, { "@type": "Person", name: "Cindy Bréelle" }],
    openingHoursSpecification: weekHours().flatMap((slots, i) => slots.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[i]}`, opens, closes }))),
    // Note Google relevée à la main (data/site.json → rating.checked) : à mettre à jour de temps en temps
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count, bestRating: 5, worstRating: 1, dateModified: site.rating.checked },
    knowsLanguage: ["fr", "en"],
    potentialAction: { "@type": "OrderAction", target: `${site.url}/${lang}#commander`, deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp" },
  };
}

/** Données structurées de l'accueil : ButcherShop / FoodEstablishment (adresse, horaires, note Google datée), site web, FAQ. */
export function homeJsonLd(lang: Locale) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: [...locales], publisher: { "@id": BUSINESS } },
      business(lang),
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
}

/** Page « Traiteur à Amiens » : le service traiteur, ses formules, le fil d'Ariane et la FAQ. */
export function cateringJsonLd(lang: Locale) {
  const d = getDict(lang);
  const url = `${site.url}${pagePath("catering", lang)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(lang),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: d.cateringPage.title,
        serviceType: "Catering",
        description: d.meta.cateringDescription,
        provider: { "@id": BUSINESS },
        areaServed: { "@type": "City", name: "Amiens" },
        url,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: d.cateringPage.formulasTitle,
          itemListElement: Object.values(d.catering.items).map((it) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: it.name, description: it.text } })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: d.cateringPage.eyebrow, item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: d.cateringPage.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
}
