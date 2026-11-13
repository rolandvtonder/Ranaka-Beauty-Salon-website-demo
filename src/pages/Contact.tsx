import {useState, type FormEvent} from 'react';
import {services, site, wa} from '../content';
import {Label, PageHero} from '../components/ui';
import {WhatsAppIcon} from '../components/Shell';

const field = 'mt-2 block min-h-12 w-full border border-ink/25 bg-white px-4 py-3 text-[17px] text-ink outline-none transition-colors focus:border-ink focus-visible:outline-2 focus-visible:outline-gold';

export function Contact() {
  const [error, setError] = useState('');

  // No server needed: the form writes the WhatsApp message for the client.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '').trim();
    const service = String(f.get('service') ?? '');
    if (!name || !service) {
      setError(!name ? 'Please add your name so we know who is booking.' : 'Please choose a service.');
      (e.currentTarget.elements.namedItem(!name ? 'name' : 'service') as HTMLElement).focus();
      return;
    }
    setError('');
    const date = String(f.get('date') ?? '');
    const time = String(f.get('time') ?? '');
    const notes = String(f.get('notes') ?? '').trim();
    const msg = [`Hi Ranaka! My name is ${name}.`, `I would like to book: ${service}.`, date && `Preferred date: ${date}${time ? ` at ${time}` : ''}.`, notes && `Notes: ${notes}`]
      .filter(Boolean)
      .join('\n');
    window.open(wa(msg), '_blank', 'noopener');
  };

  return (
    <>
      <PageHero
        slug="pedicure-loungers"
        crumb="Contact & booking"
        lines={[['Book'], ['your visit', true]]}
        lead={`WhatsApp or call ${site.phone}. ${site.deposit}`}
      />

      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32">
        <div className="mx-auto grid max-w-[1680px] gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
          <div data-reveal>
            <Label className="text-rose-deep">Booking request</Label>
            <h2 className="display mt-6 text-[clamp(40px,4.4vw,76px)]">
              Tell us <span className="it">what you’d love</span>
            </h2>
            <p className="mt-5 max-w-[520px] text-[17px] text-ink/75">Fill this in and we’ll open WhatsApp with your message ready to send. We’ll confirm your time and the 50% deposit there.</p>

            <form onSubmit={submit} noValidate className="mt-10 grid gap-6 sm:grid-cols-2" aria-describedby={error ? 'form-error' : undefined}>
              <label className="sm:col-span-2">
                <span className="caps text-ink/80">Your name *</span>
                <input name="name" autoComplete="name" required className={field} aria-invalid={error.includes('name') || undefined} />
              </label>
              <label className="sm:col-span-2">
                <span className="caps text-ink/80">Service *</span>
                <select name="service" required defaultValue="" className={field} aria-invalid={error.includes('service') || undefined}>
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {services.map((g) => (
                    <optgroup key={g.id} label={`${g.title.replace('&', '').trim()} & ${g.italic}`}>
                      {g.items.map((it) => (
                        <option key={it.name} value={it.name}>
                          {it.name} — {it.price}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <label>
                <span className="caps text-ink/80">Preferred date</span>
                <input name="date" type="date" className={field} />
              </label>
              <label>
                <span className="caps text-ink/80">Preferred time</span>
                <input name="time" type="time" className={field} />
              </label>
              <label className="sm:col-span-2">
                <span className="caps text-ink/80">Anything else?</span>
                <textarea name="notes" rows={4} className={`${field} resize-y`} placeholder="Nail shape, colours, braid length, soak-off needed…" />
              </label>
              {error && (
                <p id="form-error" role="alert" className="text-[16px] font-medium text-rose-deep sm:col-span-2">
                  {error}
                </p>
              )}
              <div className="sm:col-span-2">
                <button type="submit" className="caps inline-flex min-h-12 cursor-pointer items-center gap-3 bg-ink px-8 py-4 text-white transition-colors hover:bg-navy">
                  <WhatsAppIcon /> Send on WhatsApp
                </button>
              </div>
            </form>
          </div>

          <aside data-reveal className="space-y-10 self-start md:sticky md:top-24" aria-label="Salon details">
            <div className="bg-navy p-8 text-white md:p-10">
              <h2 className="display text-[clamp(32px,2.8vw,46px)]">
                {site.name.replace(' Beauty Salon', '')} <span className="it text-blush">beauty salon</span>
              </h2>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="caps text-gold">Address</dt>
                  <dd className="mt-1 text-[18px]">
                    <address className="not-italic">
                      {site.address.street}
                      <br />
                      {site.address.suburb}, {site.address.city} {site.address.postcode}
                    </address>
                    <a href={site.mapsUrl} target="_blank" rel="noopener" className="caps mt-2 inline-block text-blush hover:text-white">
                      Get directions →
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="caps text-gold">Call or WhatsApp</dt>
                  <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-[18px]">
                    <a href={`tel:${site.phoneIntl}`} className="hover:text-blush">
                      {site.phone}
                    </a>
                    <a href={wa()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-blush">
                      <WhatsAppIcon /> WhatsApp
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="caps text-gold">Email</dt>
                  <dd className="mt-1 text-[18px] break-all">
                    <a href={`mailto:${site.email}`} className="hover:text-blush">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="caps text-gold">Opening hours</dt>
                  <dd className="mt-1 text-[18px]">
                    {site.hours.length ? (
                      <ul>
                        {site.hours.map((h) => (
                          <li key={h.days} className="flex justify-between gap-6">
                            <span>{h.days}</span>
                            <span>{h.time}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'WhatsApp us to check today’s availability.'
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="aspect-[4/3] overflow-hidden bg-sand">
              <iframe
                title={`Map showing ${site.name}, ${site.address.street}, ${site.address.suburb}`}
                src={site.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 grayscale-[0.3]"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
