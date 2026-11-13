import type {CSSProperties} from 'react';
import {faqs, policies, services, site, wa} from '../content';
import {Button, Label, PageHero, Photo} from '../components/ui';
import {WhatsAppIcon} from '../components/Shell';

export function Services() {
  return (
    <>
      <PageHero
        slug="geometric-colour-nail-art"
        crumb="Services & prices"
        lines={[['Services'], ['& prices', true]]}
        lead="Hair, nails, feet, lashes and massage — honest prices, careful hands and satisfaction guaranteed."
      />

      <nav aria-label="Service categories" className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
        <ul className="mx-auto flex max-w-[1680px] gap-2 overflow-x-auto py-4 pr-36 pl-[136px] md:py-5 md:pr-48 md:pl-[230px]">
          {services.map((g) => (
            <li key={g.id} className="shrink-0">
              <a href={`#${g.id}`} className="caps inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-ink hover:border-ink hover:bg-ink hover:text-white">
                {g.title.replace('&', '').trim()}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-paper text-ink">
        {services.map((g, gi) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-20 border-b border-ink/10 px-5 py-24 md:px-14 md:py-32">
            <div className={`mx-auto grid max-w-[1680px] gap-12 md:grid-cols-2 md:items-start md:gap-20 ${gi % 2 ? 'md:[&>figure]:order-2' : ''}`}>
              <figure data-reveal className="aspect-[4/5] overflow-hidden bg-sand md:sticky md:top-24">
                <Photo slug={g.img} sizes="(max-width: 768px) 100vw, 45vw" className="h-full w-full object-cover" />
              </figure>
              <div>
                <div data-reveal>
                  <Label className="text-rose-deep">0{gi + 1} / 0{services.length}</Label>
                  <h2 id={`${g.id}-h`} className="display mt-6 text-[clamp(48px,5.4vw,96px)]">
                    <span className="block">{g.title}</span>
                    <span className="it block text-rose-deep">{g.italic}</span>
                  </h2>
                  <p className="mt-6 max-w-[520px] text-[18px] text-ink/75">{g.intro}</p>
                </div>
                <ul className="mt-12 border-t border-ink/15">
                  {g.items.map((it, i) => (
                    <li key={it.name} data-reveal style={{'--d': `${i * 0.05}s`} as CSSProperties} className="flex items-baseline gap-4 border-b border-ink/15 py-5">
                      <div className="min-w-0">
                        <h3 className="font-serif text-[26px] leading-tight uppercase">{it.name}</h3>
                        {it.note && <p className="mt-1 text-[15px] text-ink/65">{it.note}</p>}
                      </div>
                      <span aria-hidden className="mb-2 flex-1 border-b border-dotted border-ink/30" />
                      <span className="shrink-0 font-serif text-[24px] whitespace-nowrap text-navy">{it.price}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={wa(`Hi Ranaka! I would like to book: ${g.title.replace('&', '').trim()} / ${g.italic}.`)}
                  target="_blank"
                  rel="noopener"
                  className="caps mt-10 inline-flex min-h-12 items-center gap-3 bg-ink px-7 py-3.5 text-white transition-colors hover:bg-navy"
                >
                  <WhatsAppIcon /> Book {g.italic.toLowerCase()}
                </a>
              </div>
            </div>
          </section>
        ))}

        <section className="px-5 py-24 md:px-14" aria-labelledby="policy-h">
          <div className="mx-auto grid max-w-[1680px] gap-10 md:grid-cols-[1fr_2fr]">
            <h2 id="policy-h" className="display text-[clamp(40px,4vw,68px)]">
              Good <span className="it">to know</span>
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {policies.map((p) => (
                <li key={p} data-reveal className="border-t-2 border-gold pt-5 text-[17px] text-ink/80">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="bg-navy px-5 py-24 md:px-14 md:py-32" aria-labelledby="faq-h">
        <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1fr_1.6fr]">
          <div>
            <Label className="text-gold">FAQ</Label>
            <h2 id="faq-h" className="display mt-6 text-[clamp(44px,4.8vw,84px)] text-white">
              Questions, <span className="it block text-blush">answered</span>
            </h2>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 text-[19px] text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-[22px] text-gold transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[17px] text-white/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blush px-5 py-24 text-center text-ink md:py-32">
        <h2 className="display text-[clamp(44px,6vw,110px)]">
          Ready for <span className="it">your glow?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[460px] text-[18px] text-ink/80">WhatsApp us on {site.phone} — {site.deposit.toLowerCase()}</p>
        <div className="mt-10 flex justify-center">
          <Button href={wa()} tone="ink" external>
            Book on WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
