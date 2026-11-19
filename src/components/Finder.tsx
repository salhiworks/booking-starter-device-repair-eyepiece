import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { KIND_LABEL, KIND_PART, PART_NAME, durationSpoken, kindOf, minutesLabel, priceTerms, serviceFor, shortName } from '../lib/services';
import type { Part } from '../lib/services';
import { Emphasis } from './Emphasis';
import { ExplodedView } from './ExplodedView';
import { Reticle } from './Reticle';
import { SectionLabel } from './SectionLabel';

interface FinderProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * "What's going on with it?" — on the eyepiece band. The visitor picks what sounds closest (a tab list:
 * arrow keys, Home, End); the exploded drawing lifts out the part that answer is usually about, and the
 * card names the appointment it points at (`serviceFor`: the owner names it in the answer) with its LIVE
 * length and price, what happens at it and what the price covers. Book opens that appointment with
 * "Looking at: The screen is cracked" written into the booking note (never over what the customer
 * typed). An answer whose appointment isn't offered shows no Book button — never a stored price or id.
 * The drawing is an illustration, never a diagnosis; the note under the answers says so.
 */
export function Finder({ values, services, business, onBook }: FinderProps) {
  const items = values['find.items'];
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  if (items.length === 0) return null;
  const index = Math.min(active, items.length - 1);
  const item = items[index];
  const list = services.status === 'ready' ? services.data : [];
  const service = serviceFor(list, item.service);
  const part: Part = service ? KIND_PART[kindOf(service)] : 'whole';
  const locale = business?.locale ?? 'en-US';
  const steps = item.steps
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 4);

  // A tap on a phone: the answers sit above the card, so bring the card into view.
  const choose = (i: number) => {
    setActive(i);
    if (!window.matchMedia('(max-width: 899.98px)').matches) return;
    requestAnimationFrame(() => {
      const el = panel.current;
      if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.55) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    });
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = items.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = moves[e.key];
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="finder section" id="find" aria-labelledby="find-title">
      <div className="shell">
        <SectionLabel n="02" tone="night">
          What to book
        </SectionLabel>
        <header className="section-head finder__head">
          <h2 id="find-title" className="section-title" data-reveal="">
            <Emphasis text={values['find.title']} />
          </h2>
          {values['find.intro'] && <p className="section-intro">{values['find.intro']}</p>}
        </header>

        <div className="finder__grid">
          <div className="finder__answers">
            <div className="symptoms" role="tablist" aria-label="What’s going on with it?" aria-orientation="vertical">
              {items.map((it, i) => (
                <button
                  key={`${i}-${it.symptom}`}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={i === index}
                  aria-controls={`${id}-panel`}
                  tabIndex={i === index ? 0 : -1}
                  className="symptom"
                  onClick={() => choose(i)}
                  onKeyDown={onKey}
                >
                  <span className="symptom__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="symptom__text">{it.symptom}</span>
                  <Reticle className="symptom__reticle" scale={false} />
                </button>
              ))}
            </div>
            {values['find.note'] && <p className="finder__note prewrap">{values['find.note']}</p>}
          </div>

          <div className="finder__drawing">
            <ExplodedView part={part} />
            <p className="finder__part">
              <span className="finder__part-label">Usually in</span>
              {PART_NAME[part]}
            </p>
          </div>

          <div className="finder__card" ref={panel} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${index}`} key={index}>
            <p className="finder__quote">“{item.symptom}”</p>
            {item.text && <p className="finder__text">{item.text}</p>}
            {steps.length > 0 && (
              <ol className="finder__steps" role="list">
                {steps.map((s, i) => (
                  <li key={s}>
                    <span className="finder__step-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            )}
            <Booking service={service} loading={services.status === 'loading'} locale={locale} symptom={item.symptom} onBook={onBook} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking({
  service,
  loading,
  locale,
  symptom,
  onBook,
}: {
  service: Service | null;
  loading: boolean;
  locale: string;
  symptom: string;
  onBook: StartBooking;
}) {
  if (loading) {
    return (
      <div className="finder__book" aria-hidden="true">
        <span className="skeleton skeleton--row" />
      </div>
    );
  }
  if (!service) return null;
  const price = priceTerms(service, locale);
  return (
    <div className="finder__book">
      <p className="finder__kind">Book · {KIND_LABEL[kindOf(service)]}</p>
      <p className="finder__service">{shortName(service.name)}</p>
      <dl className="finder__figures">
        <div>
          <dt>On the bench</dt>
          <dd>
            <span aria-hidden="true">{minutesLabel(service.durationMinutes)}</span>
            <span className="sr-only">{durationSpoken(service.durationMinutes)}</span>
          </dd>
        </div>
        <div>
          <dt>{price.label}</dt>
          <dd>{price.amount}</dd>
        </div>
      </dl>
      {price.note && <p className="finder__price-note">{price.note}</p>}
      <a className="btn btn--primary finder__cta" href="#book" onClick={bookLink(onBook, service.id, `Looking at: ${symptom}`)}>
        Book this appointment<span className="sr-only">: {service.name}</span>
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
