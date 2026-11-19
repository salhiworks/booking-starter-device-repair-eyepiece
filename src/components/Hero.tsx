import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationSpoken, indexOrder, kindOf, minutesLabel, priceLabel } from '../lib/services';
import type { OpeningInfo } from '../lib/useOpening';
import { Emphasis } from './Emphasis';
import { Eyepiece } from './Eyepiece';
import { Photo } from './Photo';

/** imagesizes must match the preloads in index.html. */
export const HERO_SIZES = '(min-width: 1080px) min(58vw, 62rem), 100vw';
const HERO_SMALL = { key: '/photos/hero-bench-phone-960.webp', media: '(max-width: 759.98px)', sizes: '100vw' };

interface HeroProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  opening: OpeningInfo;
  onBook: StartBooking;
}

/**
 * The first screen, on bench white. The headline set wide and firm, its emphasised words in a light
 * italic; the introduction, the main action and the live facts as callouts (the lowest assessment fee
 * and the free consultation, each with its length, straight from the engine). Beside it the bench
 * photograph fills the height the screen has, and over its corner the round eyepiece view of a part,
 * reticle and all. Phones: words and action first, then the photo with the eyepiece, then the facts.
 */
export function Hero({ values, ownerFields, services, business, opening, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const loupe = values['hero.loupe'];
  const own = ownerFields.includes('hero.photo');
  const kicker = values['hero.kicker'].trim();
  const place = values['hero.place'].trim();
  const secondary = values['hero.secondary'].trim();
  return (
    <section className={`hero${photo ? '' : ' hero--no-photo'}`} id="top" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <div className="hero__text">
          <p className="hero__kicker">
            {kicker && <span className="hero__kicker-what">{kicker}</span>}
            {place && <span className="hero__kicker-where">{place}</span>}
          </p>
          <h1 id="hero-title" className="hero__title">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede">{values['hero.lede']}</p>}
          <div className="hero__actions">
            <a className="btn btn--primary btn--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            {secondary && (
              <a className="text-link" href="#find">
                {secondary}
              </a>
            )}
          </div>
          {opening.status && (
            <p className="hero__open" data-open={opening.status.open}>
              <span className="hero__open-dot" aria-hidden="true" />
              {opening.status.text}
            </p>
          )}
        </div>
        <div className="hero__visual">
          {photo && (
            <figure className="hero__figure">
              <Photo image={photo} sizes={HERO_SIZES} priority className="frame--hero" small={own ? undefined : HERO_SMALL} />
              {!own && <figcaption className="photo-label">Sample photo</figcaption>}
            </figure>
          )}
          {loupe && (
            <Eyepiece
              image={loupe}
              sizes="(min-width: 1080px) 18rem, 40vw"
              caption={values['hero.loupeCaption'].trim() || undefined}
              sample={!ownerFields.includes('hero.loupe')}
              className="hero__loupe"
            />
          )}
          <Facts services={services} business={business} onBook={onBook} />
        </div>
      </div>
    </section>
  );
}

/**
 * The live facts, as callouts: the lowest assessment fee (or the first priced appointment) and the free
 * consultation, each only if offered, each a link that opens that appointment's booking.
 */
function Facts({ services, business, onBook }: { services: Resource<Service[]>; business: Business | null; onBook: StartBooking }) {
  if (services.status !== 'ready' || services.data.length === 0) {
    return services.status === 'loading' ? <div className="facts facts--loading" aria-hidden="true" /> : null;
  }
  const locale = business?.locale ?? 'en-US';
  const list = indexOrder(services.data);
  const fixed = list.filter((s) => s.priceCents !== null && s.priceCents > 0 && !s.priceFrom).sort((a, b) => (a.priceCents ?? 0) - (b.priceCents ?? 0));
  const free = list.find((s) => s.priceCents === 0 && kindOf(s) === 'consult') ?? list.find((s) => s.priceCents === 0) ?? null;
  const rows: { n: string; term: string; service: Service; value: string }[] = [];
  if (fixed[0]) rows.push({ n: '01', term: fixed.length > 1 ? 'Assessments from' : fixed[0].name, service: fixed[0], value: priceLabel(fixed[0], locale) });
  if (free) rows.push({ n: rows.length ? '02' : '01', term: kindOf(free) === 'consult' ? 'Consultation' : free.name, service: free, value: 'Free' });
  if (rows.length === 0) return null;
  return (
    <ul className="facts" role="list">
      {rows.map((r) => (
        <li className="facts__row" key={r.term}>
          <a className="facts__link" href="#book" onClick={bookLink(onBook, r.service.id)}>
            <span className="facts__n" aria-hidden="true">
              {r.n}
            </span>
            <span className="facts__term">{r.term}</span>
            <span className="facts__value">{r.value}</span>
            <span className="facts__detail">
              <span aria-hidden="true">{minutesLabel(r.service.durationMinutes)}</span>
              <span className="sr-only">
                , {durationSpoken(r.service.durationMinutes)} — book {r.service.name}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
