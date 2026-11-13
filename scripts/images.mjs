/**
 * Turns the raw Facebook/Instagram photos in ../media into web-ready files:
 * descriptive, SEO-friendly names, WebP at two sizes (gallery thumbnails and
 * full), plus the social-share card and app icons. Writes src/lib/images.json
 * with each image's size so pages can reserve space and never shift (CLS).
 *
 * Run with `npm run images` whenever photos are added to ../media.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.resolve(root, '../media');
const OUT = path.join(root, 'public/media');
fs.mkdirSync(OUT, {recursive: true});

// Source file prefix → [slug, category, alt text]. Flyers are left out on purpose.
const MAP = {
  '481976333': ['pedicure-loungers', 'spa', 'Two leather pedicure loungers with striped throws and rolled towels at Ranaka Beauty Salon'],
  '482247301': ['hot-stone-massage', 'spa', 'Hot stone massage with smooth basalt stones placed along the back'],
  '482250493': ['nude-almond-gel-nails', 'nails', 'Nude almond-shaped gel nails'],
  '483099906': ['navy-french-tip-nail-art', 'nails', 'Navy French tips with silver line nail art'],
  '484050563': ['massage-treatment-room', 'spa', 'Massage treatment room with pink walls, beds and fresh towels'],
  '484331112': ['abstract-line-nail-art', 'nails', 'Pink and white abstract line nail art on square nails'],
  '484701035': ['coral-gel-pedicure', 'feet', 'Bright coral gel pedicure'],
  '484704039': ['hot-stone-back-treatment', 'spa', 'Hot stones along the spine during a back treatment'],
  '485029506': ['black-white-nail-art', 'nails', 'Black and grey colour-block gel nails'],
  '485708524': ['nude-gold-almond-nails', 'nails', 'Nude almond nails with gold detail'],
  '485717784': ['red-stiletto-nails', 'nails', 'Glossy red stiletto nails'],
  '485768526': ['nude-french-coffin-nails', 'nails', 'Long nude coffin nails with a white French outline'],
  '485793009': ['turquoise-pink-gel-nails', 'nails', 'Turquoise and pink gel nails'],
  '485947758': ['colourful-coffin-nail-art', 'nails', 'Colourful coffin nail art in blue, pink and yellow'],
  '486017268': ['pink-white-coffin-nails', 'nails', 'Pink coffin nails with white tip outline'],
  '486019225': ['nude-white-tip-almond-nails', 'nails', 'Soft nude almond nails with white tips'],
  '486067538': ['knotless-braids-red-ombre', 'hair', 'Long knotless braids with red ombre ends'],
  '486068386': ['brown-french-tip-nails', 'nails', 'Chocolate brown French tip nails'],
  '486086018': ['geometric-colour-nail-art', 'nails', 'Bold geometric nail art in red, yellow and turquoise'],
  '486228605': ['hot-pink-gel-nails', 'nails', 'Hot pink square gel nails'],
  '486312965': ['red-glitter-nail-art', 'nails', 'Red nails with a glitter accent'],
  '486601945': ['red-almond-heart-nails', 'nails', 'Red almond nails with heart accent'],
  '486641809': ['braids-red-ends', 'hair', 'Braids with red ends, back view'],
  '486957563': ['classic-lash-extensions', 'lashes', 'Classic lash extensions, close-up after the treatment'],
  '487140596': ['natural-lashes-before', 'lashes', 'Natural lashes before a classic lash set'],
  '504720676': ['blue-leopard-nail-art', 'nails', 'Sky blue nails with leopard print accent'],
  '645513392': ['ranaka-treatment-bed', 'spa', 'Ranaka Beauty treatment bed under the salon sign'],
  '645809576': ['pedicure-foot-soak', 'feet', 'Foot soak during a Ranaka pedicure'],
  '645889215': ['ranaka-massage-bed', 'spa', 'Massage bed dressed with a branded Ranaka towel'],
  '645931173': ['pedicure-sugar-scrub', 'feet', 'Strawberry sugar scrub being applied during a pedicure'],
  '649218694': ['back-massage', 'spa', 'Relaxing back massage'],
  '649222168': ['pink-massage-bed', 'spa', 'Pink-dressed massage bed ready for a treatment'],
  '724230731': ['red-plaid-nail-art', 'nails', 'Red almond nails with plaid nail art and the Ranaka logo card'],
  '748264892': ['womens-massage-course-flyer', 'about', 'Flyer for the Ranaka free short massage course for single mothers'],
  '893460051': ['neon-rainbow-nail-tips', 'nails', 'Neon rainbow French tip nails'],
  '897220113': ['orange-line-almond-nails', 'nails', 'Orange and nude almond nails with fine black lines'],
  '898167811': ['lash-lift-closeup', 'lashes', 'Close-up of lashes and brows after treatment'],
};

const manifest = {};
for (const file of fs.readdirSync(SRC).sort()) {
  const entry = MAP[file.split('_')[0]];
  if (!entry) continue;
  const [slug, cat, alt] = entry;
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  const full = Math.min(1600, meta.width);
  await sharp(input).rotate().resize({width: full}).webp({quality: 78}).toFile(path.join(OUT, `${slug}.webp`));
  await sharp(input).rotate().resize({width: Math.min(640, meta.width)}).webp({quality: 72}).toFile(path.join(OUT, `${slug}-640.webp`));
  manifest[slug] = {cat, alt, w: full, h: Math.round((meta.height * full) / meta.width)};
}
fs.writeFileSync(path.join(root, 'src/lib/images.json'), JSON.stringify(manifest, null, 2));

// Brand mark used for favicons and the share card.
const mark = (size) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="#141a3d"/>
  <circle cx="32" cy="32" r="23" fill="none" stroke="#c9a45c" stroke-width="1.6"/>
  <text x="32" y="42.5" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#c9a45c">R</text>
</svg>`);
await sharp(mark(180)).png().toFile(path.join(root, 'public/apple-touch-icon.png'));
await sharp(mark(192)).png().toFile(path.join(root, 'public/icon-192.png'));
await sharp(mark(512)).png().toFile(path.join(root, 'public/icon-512.png'));

// 1200×630 share card for Facebook / WhatsApp / X previews.
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0d1230" stop-opacity="0.95"/><stop offset="0.65" stop-color="#0d1230" stop-opacity="0.2"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="70" y="250" font-family="Georgia, serif" font-size="96" fill="#ffffff" letter-spacing="6">RANAKA</text>
  <text x="74" y="310" font-family="Georgia, serif" font-size="34" fill="#c9a45c" letter-spacing="10">BEAUTY SALON</text>
  <text x="74" y="420" font-family="Arial, sans-serif" font-size="28" fill="#f2c9d1">Hair · Nails · Lashes · Massage</text>
  <text x="74" y="465" font-family="Arial, sans-serif" font-size="26" fill="#ffffff" fill-opacity="0.8">15 Anderson Street, Goodwood, Cape Town</text>
</svg>`);
await sharp(path.join(OUT, 'orange-line-almond-nails.webp'))
  .resize(1200, 630, {fit: 'cover', position: 'right'})
  .composite([{input: card}])
  .jpeg({quality: 82})
  .toFile(path.join(root, 'public/og-image.jpg'));

console.log(`Wrote ${Object.keys(manifest).length} images + icons + share card.`);
