/**
 * All copy, prices and business details live here — edit this file to update
 * the site. Anything marked TODO still needs confirming by the salon.
 */

export const site = {
  url: 'https://ranakabeauty.co.za',
  name: 'Ranaka Beauty Salon',
  short: 'RANAKA',
  tagline: 'Beauty Salon',
  bio: 'We are a trendy salon based in Goodwood. We offer all hair, nail and massage services. Satisfaction guaranteed.',
  phone: '075 284 7784',
  phoneIntl: '+27752847784',
  whatsapp: '27752847784',
  email: 'ranakabeauty@gmail.com',
  address: {street: '15 Anderson Street', suburb: 'Goodwood', city: 'Cape Town', postcode: '7460', region: 'Western Cape', country: 'ZA'},
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=15+Anderson+Street+Goodwood+Cape+Town+7460',
  mapsEmbed: 'https://www.google.com/maps?q=15+Anderson+Street,+Goodwood,+Cape+Town,+7460&output=embed',
  facebook: 'https://www.facebook.com/ranakabeauty/',
  followers: '39K',
  /** TODO: opening hours. Leave empty until confirmed — the site then asks people to WhatsApp. */
  hours: [] as {days: string; time: string; schema: string}[],
  deposit: '50% payment secures your booking.',
};

export const wa = (text = 'Hi Ranaka! I would like to book an appointment.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  {href: '/', label: 'Home'},
  {href: '/services/', label: 'Services & prices'},
  {href: '/gallery/', label: 'Gallery'},
  {href: '/about/', label: 'About & training'},
  {href: '/contact/', label: 'Contact & booking'},
];

/** Headline lines; `i` lines are set in italic. */
export const hero = {
  lines: [{t: 'Beauty that'}, {t: 'Blooms.', i: true}, {t: 'Care that'}, {t: 'Lasts.', i: true}],
  body: 'Braids, nails, lashes and massage in the heart of Goodwood. Walk in as you are and leave feeling like the best version of yourself.',
  slides: ['orange-line-almond-nails', 'pedicure-sugar-scrub', 'classic-lash-extensions', 'navy-french-tip-nail-art'],
  alt: 'Nail art, pedicures, lash extensions and treatments at Ranaka Beauty Salon in Goodwood',
};

export type Signature = {id: string; name: [string, string]; img: string; specs: [string, string][]; href: string; tint: string};

/** The three tall panels that slide in on the home page. */
export const signatures: Signature[] = [
  {id: 'hair', name: ['Hair &', 'Braids'], img: 'knotless-braids-red-ombre', specs: [['Cornrows & lines', 'From R100'], ['Knowledge braids', 'From R400']], href: '/services/#hair', tint: '#1b2350'},
  {id: 'nails', name: ['Nails &', 'Art'], img: 'abstract-line-nail-art', specs: [['Gel hands + feet', 'R340'], ['Tips + gel feet', 'From R420']], href: '/services/#nails', tint: '#d9879b'},
  {id: 'spa', name: ['Massage &', 'Ritual'], img: 'back-massage', specs: [['Hot stone', 'Deep relief'], ['Pedicure soak', 'Full gel pedi R250']], href: '/services/#massage', tint: '#c9a45c'},
];

export type PriceItem = {name: string; price: string; note?: string};
export type ServiceGroup = {id: string; title: string; italic: string; intro: string; img: string; items: PriceItem[]};

export const services: ServiceGroup[] = [
  {
    id: 'hair',
    title: 'Hair &',
    italic: 'Braids',
    intro: 'Neat, long-lasting braiding styles done by hand — from simple lines to statement freehand designs.',
    img: 'knotless-braids-red-ombre',
    items: [
      {name: 'Wig lines', price: 'R100 – R120'},
      {name: 'Freehand with design', price: 'R150 – R180'},
      {name: 'Straight back', price: 'R200 – R250'},
      {name: 'Straight up', price: 'R250 – R300'},
      {name: 'Amabengu', price: 'R350 – R400'},
      {name: 'Knowledge braids', price: 'From R400'},
      {name: 'Wash', price: 'R50'},
    ],
  },
  {
    id: 'nails',
    title: 'Nails &',
    italic: 'Nail art',
    intro: 'Gel overlays, tips and hand-painted art — nude and minimal or bold and colourful, shaped the way you like.',
    img: 'geometric-colour-nail-art',
    items: [
      {name: 'Gel hands + gel feet', price: 'R340'},
      {name: 'Tips (short)', price: 'R250'},
      {name: 'Tips (long)', price: 'R280'},
      {name: 'Tips + gel feet', price: 'R420 – R450'},
      {name: 'Nail art & design', price: 'Ask us', note: 'Priced by design'},
    ],
  },
  {
    id: 'feet',
    title: 'Feet &',
    italic: 'Pedicures',
    intro: 'A warm soak, a sugar scrub and a flawless gel finish — feet that feel as good as they look.',
    img: 'pedicure-sugar-scrub',
    items: [
      {name: 'Gel feet', price: 'R170'},
      {name: 'Full gel pedicure', price: 'R250', note: 'Soak, scrub, cuticle care & gel'},
    ],
  },
  {
    id: 'lashes',
    title: 'Lashes &',
    italic: 'Brows',
    intro: 'Classic lash sets that open up the eyes, applied lash by lash for a natural, fluttery finish.',
    img: 'classic-lash-extensions',
    items: [
      {name: 'Classic lash extensions', price: 'Ask us'}, // TODO: price
      {name: 'Brows', price: 'Ask us'}, // TODO: price
    ],
  },
  {
    id: 'massage',
    title: 'Massage &',
    italic: 'Body',
    intro: 'Unwind in our treatment room with hot stones, warm oils and an unhurried, full-body massage.',
    img: 'hot-stone-massage',
    items: [
      {name: 'Hot stone massage', price: 'Ask us'}, // TODO: price
      {name: 'Full body massage', price: 'Ask us'}, // TODO: price
      {name: 'Back, neck & shoulders', price: 'Ask us'}, // TODO: price
    ],
  },
];

export const policies = [
  '50% payment secures your booking.',
  'Nail prices exclude soak-off of a previous set.',
  'Prices may change for specials — follow us on Facebook for the latest deals.',
];

export const faqs: {q: string; a: string}[] = [
  {q: 'How do I book an appointment at Ranaka Beauty Salon?', a: `Send us a WhatsApp on ${site.phone} with the service and the day you would like. A 50% payment secures your booking.`},
  {q: 'Where is Ranaka Beauty Salon?', a: 'We are at 15 Anderson Street, Goodwood, Cape Town, 7460.'},
  {q: 'Do your nail prices include soak-off?', a: 'No — removing a previous gel or acrylic set is charged separately. Let us know when you book so we can plan the time.'},
  {q: 'What hair services do you offer?', a: 'Braiding styles from wig lines and straight backs to freehand designs, amabengu and knowledge braids, plus hair washes.'},
  {q: 'Do you offer massage training?', a: 'Yes. We run short massage courses, including a community course to help unemployed single mothers learn a skill and start their own business.'},
];

export const about = {
  lead: 'A trendy salon in Goodwood where every client is treated like family.',
  story: [
    'Ranaka Beauty Salon started with a simple promise: beautiful work, honest prices and a space where you can relax. Today we offer hair, nails, lashes and massage under one roof on Anderson Street in Goodwood.',
    'Our team takes its time — clean lines on every braid, careful prep on every nail and a calm, unhurried massage. That is why we stand behind our work: satisfaction guaranteed.',
  ],
  values: [
    {k: 'Satisfaction', v: 'guaranteed', d: 'If something is not right, tell us and we will make it right.'},
    {k: 'Community', v: 'first', d: `${site.followers} people follow our work on Facebook — we are proud to be part of Goodwood.`},
    {k: 'Women', v: 'empowered', d: 'We train women in skills they can build a living on.'},
  ],
  training: {
    title: ['Empowering you.', 'Building futures.'],
    body: 'We believe every woman deserves a chance to grow, heal and create a better life for herself and her family. Our free short massage course gives unemployed single mothers a valuable skill and the confidence to start their own massage business.',
    points: [
      ['Course', 'Free short massage course'],
      ['Cost', 'R300 covers massage oils & a certificate of completion'],
      ['Venue', 'Goodwood'],
      ['Note', 'Training only — no employment is provided'],
    ] as [string, string][],
    quote: 'When you empower a woman, you empower a family.',
    img: 'womens-massage-course-flyer',
  },
};

export const footerNote = 'Hair · Nails · Lashes · Massage — Goodwood, Cape Town';
