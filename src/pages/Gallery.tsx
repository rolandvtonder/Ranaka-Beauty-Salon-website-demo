import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {Button, PageHero, Photo} from '../components/ui';
import {allImages, src} from '../lib/media';
import {lockScroll} from '../lib/scroll';
import {site} from '../content';

const filters = [
  {id: 'all', label: 'All'},
  {id: 'nails', label: 'Nails'},
  {id: 'hair', label: 'Hair'},
  {id: 'feet', label: 'Pedicures'},
  {id: 'lashes', label: 'Lashes'},
  {id: 'spa', label: 'Massage & salon'},
];

const photos = allImages.filter((p) => p.cat !== 'about');

export function Gallery() {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(-1);
  const list = filter === 'all' ? photos : photos.filter((p) => p.cat === filter);

  return (
    <>
      <PageHero
        slug="nude-gold-almond-nails"
        crumb="Gallery"
        lines={[['The'], ['gallery', true]]}
        lead="Nail art, braids, lashes, pedicures and our treatment rooms — all real work from the Ranaka chair."
      />

      <section className="bg-paper px-5 pt-16 pb-28 text-ink md:px-14" aria-label="Photo gallery">
        <div className="mx-auto max-w-[1680px]">
          <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className="caps min-h-11 cursor-pointer rounded-full border border-ink/20 px-5 transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white"
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {list.length} photos
          </p>

          <ul className="mt-10 columns-2 gap-[6px] md:columns-3 xl:columns-4">
            {list.map((p, i) => (
              <li key={p.slug} data-reveal style={{'--d': `${(i % 4) * 0.05}s`} as CSSProperties} className="mb-[6px] break-inside-avoid">
                <button type="button" onClick={() => setOpen(i)} className="group block w-full cursor-zoom-in overflow-hidden bg-sand" aria-label={`Open photo: ${p.alt}`}>
                  <Photo slug={p.slug} sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" className="block h-auto w-full transition-transform duration-700 ease-silk group-hover:scale-[1.04]" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-10">
            <p className="max-w-lg text-[18px] text-ink/75">More every week on our Facebook page — {site.followers} people already follow along.</p>
            <Button href={site.facebook} tone="ink" external>
              Follow on Facebook
            </Button>
          </div>
        </div>
      </section>

      {open >= 0 && <Lightbox items={list} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </>
  );
}

function Lightbox({items, index, onIndex, onClose}: {items: typeof photos; index: number; onIndex: (i: number) => void; onClose: () => void}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<Element | null>(null);
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);
  const p = items[index];

  useEffect(() => {
    returnTo.current = document.activeElement;
    lockScroll(true);
    closeBtn.current?.focus();
    return () => {
      lockScroll(false);
      (returnTo.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[65] flex flex-col bg-ink/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="caps text-white/75">
          {index + 1} / {items.length}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className="caps min-h-11 cursor-pointer bg-white px-6 text-ink hover:bg-blush">
          Close ×
        </button>
      </div>
      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-6">
        <img key={p.slug} src={src(p.slug)} alt={p.alt} className="max-h-full min-h-0 max-w-full object-contain" />
        <figcaption className="mt-4 text-center text-[15px] text-white/80">{p.alt}</figcaption>
      </figure>
      <div className="flex justify-center gap-3 pb-6">
        <button type="button" onClick={() => go(-1)} className="caps min-h-11 cursor-pointer border border-white/40 px-6 text-white hover:bg-white hover:text-ink">
          ← Previous
        </button>
        <button type="button" onClick={() => go(1)} className="caps min-h-11 cursor-pointer border border-white/40 px-6 text-white hover:bg-white hover:text-ink">
          Next →
        </button>
      </div>
    </div>
  );
}
