# Ranaka Beauty Salon website

- **Edit text, prices, phone and hours:** `src/content.ts` (search for `TODO`)
- **Edit page titles and Google descriptions:** `src/seo.ts`
- **Add photos:** drop them into `../media`, add a line for each in `scripts/images.mjs`, then run `npm run images`

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production files in dist/ (pre-rendered for SEO)
```

Upload the contents of `dist/` to any static host (Netlify, Cloudflare Pages, Vercel or cPanel hosting) on ranakabeauty.co.za.
After it is live, submit `https://ranakabeauty.co.za/sitemap.xml` in Google Search Console.

## Client demo (GitHub Pages)

Every push to `main` rebuilds the demo at
https://rolandvtonder.github.io/Ranaka-Beauty-Salon-website-demo/ (see `.github/workflows/demo.yml`).
The demo is marked `noindex`, so Google only ever indexes the real domain.
To build the demo locally:

```bash
BASE_PATH=/Ranaka-Beauty-Salon-website-demo/ SITE_URL=https://rolandvtonder.github.io/Ranaka-Beauty-Salon-website-demo npm run build
```
