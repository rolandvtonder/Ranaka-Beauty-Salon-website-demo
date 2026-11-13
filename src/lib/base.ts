/**
 * Site base path ('/' on ranakabeauty.co.za, '/<repo>/' on the GitHub Pages
 * demo). Wrap every internal link and asset path in `u()`.
 */
const BASE: string = import.meta.env?.BASE_URL ?? '/';
export const u = (p: string) => (p.startsWith('/') && !p.startsWith('//') ? BASE + p.slice(1) : p);
