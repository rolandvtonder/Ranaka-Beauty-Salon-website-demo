import type {CSSProperties} from 'react';
import {about, site, wa} from '../content';
import {Button, Label, Lines, PageHero, Photo} from '../components/ui';
import {WhatsAppIcon} from '../components/Shell';

export function About() {
  const t = about.training;
  return (
    <>
      <PageHero
        slug="ranaka-treatment-bed"
        crumb="About & training"
        lines={[['Our'], ['story', true]]}
        lead={about.lead}
      />

      <section className="bg-paper px-5 py-28 text-ink md:px-14 md:py-36">
        <div className="mx-auto grid max-w-[1680px] gap-14 md:grid-cols-[1fr_1fr] md:gap-24">
          <div data-reveal>
            <Label className="text-rose-deep">About Ranaka</Label>
            <Lines lines={[['Hair, nails,'], ['lashes & massage', true], ['under one roof.']]} className="mt-8 text-[clamp(44px,5.2vw,92px)]" />
          </div>
          <div data-reveal style={{'--d': '0.15s'} as CSSProperties} className="space-y-6 self-end text-[19px] text-ink/80">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-24 grid max-w-[1680px] gap-[3px] md:grid-cols-3">
          {about.values.map((v, i) => (
            <li key={v.k} data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties} className="bg-sand p-8 md:p-10">
              <h3 className="display text-[clamp(36px,3vw,52px)]">
                {v.k} <span className="it block text-rose-deep">{v.v}</span>
              </h3>
              <p className="mt-5 text-[17px] text-ink/75">{v.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <ul className="grid grid-cols-2 gap-[3px] bg-ink md:grid-cols-4" aria-label="Inside the salon">
        {['massage-treatment-room', 'pedicure-loungers', 'ranaka-massage-bed', 'pink-massage-bed'].map((s) => (
          <li key={s} className="aspect-square overflow-hidden">
            <Photo slug={s} sizes="(max-width: 768px) 50vw, 25vw" className="h-full w-full object-cover" />
          </li>
        ))}
      </ul>

      <section id="training" className="scroll-mt-10 bg-navy px-5 py-28 md:px-14 md:py-36" aria-labelledby="training-h">
        <div className="mx-auto grid max-w-[1680px] gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <div data-reveal>
              <Label className="text-gold">Training & community</Label>
              <h2 id="training-h" className="display mt-8 text-[clamp(44px,5.4vw,96px)] text-white">
                <span className="block">{t.title[0]}</span>
                <span className="it block text-blush">{t.title[1]}</span>
              </h2>
              <p className="mt-8 max-w-[560px] text-[19px] text-white/85">{t.body}</p>
            </div>
            <dl className="mt-12 divide-y divide-white/15 border-y border-white/15">
              {t.points.map(([k, v], i) => (
                <div key={k} data-reveal style={{'--d': `${i * 0.06}s`} as CSSProperties} className="grid grid-cols-[110px_1fr] gap-4 py-5">
                  <dt className="caps pt-1 text-gold">{k}</dt>
                  <dd className="text-[18px] text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <blockquote data-reveal className="mt-10 font-serif text-[clamp(26px,2.4vw,36px)] leading-snug text-gold-soft italic">“{t.quote}”</blockquote>
            <a
              href={wa('Hi Ranaka! I am interested in the short massage course.')}
              target="_blank"
              rel="noopener"
              className="caps mt-10 inline-flex min-h-12 items-center gap-3 bg-gold px-7 py-3.5 text-ink transition-colors hover:bg-gold-soft"
            >
              <WhatsAppIcon /> Ask about the next course
            </a>
          </div>
          <figure data-reveal className="self-start md:sticky md:top-24">
            <Photo slug={t.img} sizes="(max-width: 768px) 100vw, 45vw" className="w-full shadow-[0_30px_80px_rgb(0_0_0/0.35)]" />
            <figcaption className="caps mt-4 text-white/60">Our course flyer — WhatsApp only, {site.phone}</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-blush px-5 py-24 text-center text-ink md:py-32">
        <h2 className="display text-[clamp(44px,6vw,110px)]">
          Come and <span className="it">meet us</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[460px] text-[18px] text-ink/80">
          {site.address.street}, {site.address.suburb}, {site.address.city}.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/contact/" tone="ink">
            Contact & booking
          </Button>
        </div>
      </section>
    </>
  );
}
