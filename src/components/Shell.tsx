import {u} from '../lib/base';
import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {footerNote, nav, site, wa} from '../content';
import {useFitText} from '../hooks/useFitText';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {lockScroll, startScroll} from '../lib/scroll';
import {Monogram} from './Logo';
import {Menu} from './Menu';

/** Everything every page shares: smooth scroll, logo, menu, book button, footer, grain. */
export function Shell({current, children}: {current: string; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => startScroll(reduced), [reduced]);
  useReveals();

  useEffect(() => {
    lockScroll(open);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    button.current?.focus({preventScroll: true});
  }, []);

  return (
    <>
      <a href="#main" className="caps fixed top-3 left-3 z-[70] -translate-y-24 bg-gold px-4 py-3 text-ink focus:translate-y-0">
        Skip to content
      </a>

      <a
        href={u('/')}
        aria-label={`${site.name} — home`}
        className="display fixed top-6 left-5 z-[55] flex items-center gap-3 text-[22px] tracking-[0.22em] text-white mix-blend-difference md:top-8 md:left-14"
      >
        Ranaka
      </a>

      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-11 cursor-pointer items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-white' : 'bg-white/20 text-white hover:bg-white/30'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={wa()}
        target="_blank"
        rel="noopener"
        className={`caps fixed right-5 bottom-5 z-[55] flex min-h-11 items-center gap-2 px-7 py-4 shadow-[0_10px_40px_rgb(13_18_48/0.35)] transition-colors duration-500 md:right-8 md:bottom-7 ${
          open ? 'bg-blush text-ink' : 'bg-white text-ink hover:bg-blush'
        }`}
      >
        <WhatsAppIcon />
        Book <em className="font-serif text-[14px] tracking-[0.06em] normal-case">your visit</em>
      </a>

      <main id="main">{children}</main>
      <Footer current={current} />
      <Menu open={open} current={current} onClose={close} />
      <div className="grain" aria-hidden />
    </>
  );
}

export function WhatsAppIcon({className = 'size-4'}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3l-.5-.2Z" />
    </svg>
  );
}

function Footer({current}: {current: string}) {
  const big = useFitText<HTMLSpanElement>();
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pt-24 pb-28 md:px-14 md:pb-10">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Monogram size={64} />
          <p className="mt-6 text-white/75">{site.bio}</p>
        </div>
        <div>
          <h2 className="caps text-gold">Visit</h2>
          <address className="mt-4 text-white/85 not-italic">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.suburb}, {site.address.city} {site.address.postcode}
          </address>
          <a href={site.mapsUrl} target="_blank" rel="noopener" className="caps mt-3 inline-block text-blush hover:text-white">
            Get directions
          </a>
        </div>
        <div>
          <h2 className="caps text-gold">Talk to us</h2>
          <ul className="mt-4 space-y-1 text-white/85">
            <li>
              <a className="hover:text-blush" href={`tel:${site.phoneIntl}`}>
                {site.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-blush" href={wa()} target="_blank" rel="noopener">
                WhatsApp
              </a>
            </li>
            <li>
              <a className="break-all hover:text-blush" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-blush" href={site.facebook} target="_blank" rel="noopener">
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2 className="caps text-gold">Explore</h2>
          <ul className="mt-4 space-y-1 text-white/85">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={u(n.href)} aria-current={current === n.href ? 'page' : undefined} className="hover:text-blush aria-[current=page]:text-blush">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-20 max-w-[1680px]" aria-hidden>
        <span ref={big} className="display inline-block whitespace-nowrap text-[18vw] leading-[0.8] text-gold/90">
          Ranaka
        </span>
      </div>
      <p className="caps mx-auto mt-8 flex max-w-[1680px] flex-wrap justify-between gap-3 text-white/55">
        <span>© 2026 {site.name}</span>
        <span>{footerNote}</span>
      </p>
    </footer>
  );
}
