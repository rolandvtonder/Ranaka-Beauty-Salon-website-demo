import {useEffect, useRef, type ReactNode, type RefObject} from 'react';
import {clamp} from '../lib/math';
import {imgs, src, srcSet} from '../lib/media';
import {onFrame} from '../lib/scroll';
import {u} from '../lib/base';

/** A photo from public/media with its real size reserved (no layout shift). */
export function Photo({slug, className = '', sizes = '100vw', eager = false, alt}: {slug: string; className?: string; sizes?: string; eager?: boolean; alt?: string}) {
  const m = imgs[slug];
  return (
    <img
      src={src(slug)}
      srcSet={srcSet(slug)}
      sizes={sizes}
      width={m?.w}
      height={m?.h}
      alt={alt ?? m?.alt ?? ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...(eager ? {fetchPriority: 'high' as const} : {})}
      className={className}
    />
  );
}

export function Label({children, className = ''}: {children: ReactNode; className?: string}) {
  return <p className={`caps flex items-center gap-3 ${className}`}><span aria-hidden className="h-px w-8 bg-current opacity-60" />{children}</p>;
}

/** Display lines: `[text, italic?]` pairs. */
export function Lines({lines, className = '', as: Tag = 'h2'}: {lines: [string, boolean?][]; className?: string; as?: 'h1' | 'h2' | 'h3'}) {
  return (
    <Tag className={`display ${className}`}>
      {lines.map(([t, i], k) => (
        <span key={k} className={`block ${i ? 'it' : ''}`}>
          {t}
        </span>
      ))}
    </Tag>
  );
}

export function Button({href, children, tone = 'gold', external = false}: {href: string; children: ReactNode; tone?: 'gold' | 'ink' | 'line'; external?: boolean}) {
  const tones = {
    gold: 'bg-gold text-ink hover:bg-gold-soft',
    ink: 'bg-ink text-white hover:bg-navy',
    line: 'border border-current hover:bg-white hover:text-ink',
  };
  return (
    <a
      href={external ? href : u(href)}
      {...(external ? {target: '_blank', rel: 'noopener'} : {})}
      className={`caps inline-flex min-h-12 items-center gap-3 px-7 py-3.5 transition-colors duration-300 ${tones[tone]}`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

/**
 * Subpage opener: a full-bleed photo with a big headline. As you scroll on,
 * it blurs, dims and shrinks back — the same camera pull-back as the home hero.
 */
export function PageHero({slug, lines, lead, crumb}: {slug: string; lines: [string, boolean?][]; lead: string; crumb: string}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  usePullBack(root, stage);

  return (
    <section ref={root} className="relative h-[82svh] min-h-[560px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <Photo slug={slug} eager className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(13_18_48/0.78),rgb(13_18_48/0.25)_70%),linear-gradient(0deg,rgb(13_18_48/0.6),transparent_40%)]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-[clamp(48px,9vh,96px)] md:px-14">
          <nav aria-label="Breadcrumb" className="caps mb-6 text-white/75">
            <ol className="flex gap-2">
              <li>
                <a href={u('/')} className="hover:text-blush">Home</a>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-blush">{crumb}</li>
            </ol>
          </nav>
          <Lines as="h1" lines={lines} className="text-[clamp(52px,8vw,140px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]" />
          <p className="mt-6 max-w-[460px] text-[17px] text-white/90">{lead}</p>
        </div>
      </div>
    </section>
  );
}

/** Blur / dim / shrink a hero's stage as its section scrolls away. */
export function usePullBack(root: RefObject<HTMLElement | null>, stage: RefObject<HTMLDivElement | null>, onProgress?: (p: number) => void) {
  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        if (!el || !stage.current) return;
        const r = el.getBoundingClientRect();
        const h = window.innerHeight;
        const p = clamp(-r.top / r.height);
        onProgress?.(p);
        stage.current.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        stage.current.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );
}
