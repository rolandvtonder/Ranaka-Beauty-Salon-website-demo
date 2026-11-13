import {u} from '../lib/base';
import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {about, hero, signatures, site, wa} from '../content';
import {Button, Label, Lines, Photo, usePullBack} from '../components/ui';
import {WhatsAppIcon} from '../components/Shell';

export function Home() {
  return (
    <>
      <Hero />
      <Signatures />
      <Intro />
      <GalleryStrip />
      <Training />
      <Visit />
    </>
  );
}

/**
 * Slow cross-fading photos of the salon's own work under the big mixed
 * upright/italic headline. As you scroll on, the stage blurs, dims and
 * shrinks back as the page transition. The slideshow pauses off screen.
 */
function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const [slide, setSlide] = useState(0);
  usePullBack(root, stage, (p) => {
    visible.current = p < 0.98;
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      if (visible.current && !document.hidden) setSlide((s) => (s + 1) % hero.slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section ref={root} id="top" className="relative h-svh min-h-[620px] overflow-hidden bg-ink" aria-label="Welcome">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <div role="img" aria-label={hero.alt} className="absolute inset-0">
          {hero.slides.map((s, i) => (
            <div key={s} className={`slide absolute inset-0 overflow-hidden ${i === slide ? 'on opacity-100' : 'opacity-0'}`}>
              <Photo slug={s} eager={i === 0} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(13_18_48/0.72),rgb(13_18_48/0.1)_65%),linear-gradient(0deg,rgb(13_18_48/0.5),transparent_35%)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(88px,12vh,140px)] md:px-14">
          <p className="caps mb-4 text-gold-soft md:mb-6">Beauty salon · Goodwood, Cape Town</p>
          <h1 className="display text-[clamp(46px,8vw,146px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <span className="sr-only">{site.name} — </span>
            {hero.lines.map((l, i) => (
              <span key={l.t} className={`block ${l.i ? 'it text-blush' : ''} ${i === 0 ? 'pl-[1.6em]' : ''}`}>
                {l.t}
              </span>
            ))}
          </h1>
          <p className="mt-6 ml-[clamp(0px,19vw,330px)] max-w-[340px] md:mt-10 text-[17px] text-white/90 max-md:ml-0">{hero.body}</p>
          <div className="mt-8 ml-[clamp(0px,19vw,330px)] flex flex-wrap gap-3 max-md:ml-0">
            <Button href="/services/">See services & prices</Button>
          </div>
        </div>

        <div className="absolute bottom-7 left-5 flex gap-2 md:left-14" aria-hidden>
          {hero.slides.map((s, i) => (
            <span key={s} className={`h-[2px] w-10 transition-colors duration-700 ${i === slide ? 'bg-gold' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Three tall panels slide in from the right one after another — hair, nails
 * and massage — each a link through to its section of the price list.
 */
function Signatures() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {threshold: 0.2});
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="signatures" className="relative bg-ink" aria-labelledby="sig-title">
      <h2 id="sig-title" className="sr-only">Our signature services</h2>
      <div className="grid h-svh min-h-[620px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {signatures.map((b, i) => (
          <a
            key={b.id}
            href={u(b.href)}
            className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[80svh] ${shown ? 'translate-x-0' : 'js-off'}`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: b.tint} as CSSProperties}
          >
            <Photo slug={b.img} sizes="(max-width: 768px) 100vw, 34vw" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(13_18_48/0.7),transparent_45%,rgb(13_18_48/0.55))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-24 md:p-9 md:pt-28">
              <div>
                <p className="caps text-gold-soft">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{b.name[0]}</span>
                  <span className="it block text-blush">{b.name[1]}</span>
                </h3>
              </div>
              <div>
                <dl className={`space-y-3 transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'js-fade'}`}>
                  {b.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/75">{k}</dt>
                      <dd className="font-serif text-[22px] text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="caps mt-6 inline-flex items-center gap-2 border-b border-white/50 pb-1 text-white group-hover:border-gold group-hover:text-gold-soft">
                  View prices <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-paper px-5 py-28 text-ink md:px-14 md:py-40">
      <div className="mx-auto grid max-w-[1680px] gap-14 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div data-reveal>
          <Label className="text-rose-deep">Welcome to Ranaka</Label>
          <Lines
            lines={[['A trendy salon'], ['in Goodwood,', true], ['where every client'], ['is family.', true]]}
            className="mt-8 text-[clamp(44px,5.6vw,100px)]"
          />
        </div>
        <div data-reveal style={{'--d': '0.15s'} as CSSProperties}>
          <p className="text-[19px] text-ink/80">{about.story[0]}</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/15 pt-8">
            {[
              [site.followers, 'Facebook followers'],
              ['5', 'Services under one roof'],
              ['100%', 'Satisfaction guaranteed'],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="sr-only">{v}</dt>
                <dd className="font-serif text-[clamp(34px,3.4vw,54px)] leading-none text-navy">{k}</dd>
                <dd className="caps mt-2 text-[11px] text-ink/65">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Button href="/about/" tone="ink">
              Our story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const strip = ['red-plaid-nail-art', 'braids-red-ends', 'pedicure-foot-soak', 'classic-lash-extensions', 'colourful-coffin-nail-art', 'ranaka-treatment-bed'];

function GalleryStrip() {
  return (
    <section className="bg-paper pb-28 text-ink md:pb-40" aria-labelledby="work-title">
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-6 px-5 md:px-14">
        <div data-reveal>
          <Label className="text-rose-deep">Real clients, real work</Label>
          <h2 id="work-title" className="display mt-6 text-[clamp(40px,4.4vw,76px)]">
            Fresh from <span className="it">the chair</span>
          </h2>
        </div>
        <Button href="/gallery/" tone="ink">
          Full gallery
        </Button>
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-[3px] md:grid-cols-6">
        {strip.map((s, i) => (
          <li key={s} data-reveal style={{'--d': `${i * 0.06}s`} as CSSProperties} className="aspect-[3/4] overflow-hidden bg-sand">
            <a href={u('/gallery/')} className="block h-full">
              <Photo slug={s} sizes="(max-width: 768px) 50vw, 17vw" className="h-full w-full object-cover transition-transform duration-700 ease-silk hover:scale-105" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Training() {
  return (
    <section className="relative overflow-hidden bg-navy px-5 py-28 md:px-14 md:py-40">
      <div className="mx-auto grid max-w-[1680px] gap-14 md:grid-cols-2 md:items-center">
        <div data-reveal>
          <Label className="text-gold">Training & community</Label>
          <Lines lines={[[about.training.title[0]], [about.training.title[1], true]]} className="mt-8 text-[clamp(44px,5.4vw,96px)] text-white [&_.it]:text-blush" />
        </div>
        <div data-reveal style={{'--d': '0.15s'} as CSSProperties}>
          <p className="text-[19px] text-white/85">{about.training.body}</p>
          <blockquote className="mt-8 border-l-2 border-gold pl-5 font-serif text-[26px] text-gold-soft italic">“{about.training.quote}”</blockquote>
          <div className="mt-10">
            <Button href="/about/#training">About the course</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="bg-blush px-5 py-28 text-ink md:px-14 md:py-36" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div data-reveal>
          <Label className="text-rose-deep">Visit us</Label>
          <h2 id="visit-title" className="display mt-8 text-[clamp(44px,6vw,110px)]">
            15 Anderson St,
            <span className="it block">Goodwood.</span>
          </h2>
        </div>
        <div data-reveal style={{'--d': '0.15s'} as CSSProperties} className="space-y-6">
          <p className="text-[18px] text-ink/80">
            Book on WhatsApp and tell us the service and day you would like. {site.deposit}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={wa()} target="_blank" rel="noopener" className="caps inline-flex min-h-12 items-center gap-3 bg-ink px-7 py-3.5 text-white transition-colors hover:bg-navy">
              <WhatsAppIcon /> WhatsApp {site.phone}
            </a>
            <Button href="/contact/" tone="line">
              Contact & directions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
