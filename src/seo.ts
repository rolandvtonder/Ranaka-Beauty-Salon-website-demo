/**
 * Per-page <head>: title, description, canonical, Open Graph / X cards and
 * JSON-LD structured data (BeautySalon local business, breadcrumbs, FAQ and
 * the service catalogue). Injected into each HTML shell by vite.config.ts at
 * dev and build time, so crawlers get it without running any JavaScript.
 */
import {faqs, services, site} from './content';

export type PageKey = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export const pages: Record<PageKey, {path: string; title: string; description: string; crumb: string; priority: string}> = {
  home: {
    path: '/',
    title: 'Ranaka Beauty Salon | Hair, Nails, Lashes & Massage in Goodwood, Cape Town',
    description: 'Trendy beauty salon in Goodwood, Cape Town. Braids, gel nails & nail art, pedicures, lash extensions and hot stone massage. Book on WhatsApp 075 284 7784.',
    crumb: 'Home',
    priority: '1.0',
  },
  services: {
    path: '/services/',
    title: 'Services & Prices | Braids, Gel Nails, Pedicures & Massage | Ranaka Beauty Salon',
    description: 'Ranaka Beauty Salon price list: braids from R100, gel hands + feet R340, tips from R250, full gel pedicure R250, lashes and hot stone massage in Goodwood.',
    crumb: 'Services & prices',
    priority: '0.9',
  },
  gallery: {
    path: '/gallery/',
    title: 'Gallery | Nail Art, Braids, Lashes & Spa | Ranaka Beauty Salon Goodwood',
    description: 'See real work from Ranaka Beauty Salon in Goodwood: nail art, gel nails, braids, classic lash extensions, pedicures and our treatment rooms.',
    crumb: 'Gallery',
    priority: '0.7',
  },
  about: {
    path: '/about/',
    title: 'About & Massage Training | Ranaka Beauty Salon, Goodwood',
    description: 'Meet Ranaka Beauty Salon — a trendy Goodwood salon with satisfaction guaranteed — and our short massage course empowering single mothers.',
    crumb: 'About & training',
    priority: '0.6',
  },
  contact: {
    path: '/contact/',
    title: 'Contact & Book | Ranaka Beauty Salon, 15 Anderson Street, Goodwood',
    description: 'Book at Ranaka Beauty Salon: WhatsApp or call 075 284 7784, email ranakabeauty@gmail.com. Visit us at 15 Anderson Street, Goodwood, Cape Town 7460.',
    crumb: 'Contact & booking',
    priority: '0.8',
  },
};

/**
 * Build-time options. On the GitHub Pages demo, `base` is the repo folder and
 * `origin` the demo URL, and pages are marked noindex so Google only ever
 * indexes the real domain.
 */
export type HeadOptions = {base?: string; origin?: string};
let origin = site.url;
let base = '/';
let demo = false;
export function configure(o: HeadOptions) {
  origin = (o.origin || site.url).replace(/\/$/, '');
  base = o.base || '/';
  demo = origin !== site.url;
}
const abs = (p: string) => `${origin}${p}`;
const asset = (p: string) => base + p.replace(/^\//, '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function business(withCatalog: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${origin}/#salon`,
    name: site.name,
    description: site.bio,
    url: origin,
    image: abs('/og-image.jpg'),
    logo: abs('/icon-512.png'),
    telephone: site.phoneIntl,
    email: site.email,
    priceRange: 'R50 – R450',
    currenciesAccepted: 'ZAR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: `${site.address.suburb}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    areaServed: ['Goodwood', 'Parow', 'Bellville', 'Elsies River', 'Vasco Estate', 'Cape Town'],
    hasMap: site.mapsUrl,
    sameAs: [site.facebook],
    ...(site.hours.length ? {openingHours: site.hours.map((h) => h.schema)} : {}),
    ...(withCatalog
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Beauty services',
            itemListElement: services.map((g) => ({
              '@type': 'OfferCatalog',
              name: `${g.title.replace('&', '').trim()} & ${g.italic}`,
              itemListElement: g.items.map((it) => {
                const nums = it.price.match(/\d+/g);
                return {
                  '@type': 'Offer',
                  itemOffered: {'@type': 'Service', name: it.name},
                  ...(nums ? {priceCurrency: 'ZAR', price: nums[0]} : {}),
                };
              }),
            })),
          },
        }
      : {}),
  };
}

export function headFor(key: PageKey): string {
  const p = pages[key];
  const url = abs(p.path);
  const ld: object[] = [business(key === 'services' || key === 'home')];
  if (key !== 'home') {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: abs('/')},
        {'@type': 'ListItem', position: 2, name: p.crumb, item: url},
      ],
    });
  }
  if (key === 'services') {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({'@type': 'Question', name: f.q, acceptedAnswer: {'@type': 'Answer', text: f.a}})),
    });
  }

  return [
    '<meta charset="UTF-8" />',
    '<script>document.documentElement.classList.add("js")</script>',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${demo ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    '<meta name="theme-color" content="#0d1230" />',
    '<meta name="geo.region" content="ZA-WC" />',
    '<meta name="geo.placename" content="Goodwood, Cape Town" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="en_ZA" />',
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${abs('/og-image.jpg')}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${site.name} — hair, nails, lashes and massage in Goodwood" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${abs('/og-image.jpg')}" />`,
    `<link rel="icon" href="${asset('/favicon.svg')}" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="${asset('/apple-touch-icon.png')}" />`,
    `<link rel="manifest" href="${asset('/site.webmanifest')}" />`,
    '<link rel="preconnect" href="https://fonts.googleapis.com" />',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
    '<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Condensed:ital,wght@0,400..700;1,400..700&family=Jost:wght@300..600&display=swap" rel="stylesheet" />',
    ...ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}

export function sitemap(lastmod: string): string {
  const urls = (Object.keys(pages) as PageKey[])
    .map((k) => `  <url><loc>${abs(pages[k].path)}</loc><lastmod>${lastmod}</lastmod><priority>${pages[k].priority}</priority></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const robots = () => (demo ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
