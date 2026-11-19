import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { KIND_LABEL, durationSpoken, indexOrder, kindOf, minutesLabel, priceTerms, shortName, splitDescription } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { SectionLabel } from './SectionLabel';

interface FeesProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Appointments & fees, on bench grey. Beside the fee sheet: the heading, an introduction and how a
 * repair is priced in three steps (the appointment → the quote → the repair), so nobody mistakes an
 * assessment fee for the price of a repair. The fee sheet: one row per engine service, in page order —
 * a callout number, the kind, the name, what it does and what it suits, the time on the bench and what
 * the price IS (an assessment fee, a starting price, or free) with its own Book. Nothing is stored:
 * rename a service in the dashboard and the row follows.
 */
export function Fees({ values, services, business, onRetry, onBook }: FeesProps) {
  const locale = business?.locale ?? 'en-US';
  const steps = values['fees.steps'];
  return (
    <section className="fees section" id="fees" aria-labelledby="fees-title">
      <div className="shell">
        <SectionLabel n="03">Fees</SectionLabel>
        <div className="fees__grid">
          <header className="fees__head">
            <h2 id="fees-title" className="section-title" data-reveal="">
              <Emphasis text={values['fees.title']} />
            </h2>
            {values['fees.intro'] && <p className="section-intro">{values['fees.intro']}</p>}
            {steps.length > 0 && (
              <ol className="pricing" role="list" aria-label="How a repair is priced">
                {steps.map((s, i) => (
                  <li className="pricing__step" key={`${i}-${s.title}`}>
                    <span className="pricing__n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="pricing__title">{s.title}</span>
                    {s.text && <span className="pricing__text">{s.text}</span>}
                  </li>
                ))}
              </ol>
            )}
          </header>
          <div className="fees__sheet">
            <Rows services={services} locale={locale} onRetry={onRetry} onBook={onBook} />
            {values['fees.footnote'] && services.status === 'ready' && services.data.length > 0 && (
              <p className="fees__footnote">{values['fees.footnote']}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Rows({ services, locale, onRetry, onBook }: { services: Resource<Service[]>; locale: string; onRetry: () => void; onBook: StartBooking }) {
  if (services.status === 'loading') {
    return (
      <div className="fee-rows fee-rows--loading" aria-busy="true">
        <p className="sr-only" role="status">
          Loading appointments…
        </p>
        {[0, 1, 2].map((i) => (
          <span className="skeleton skeleton--block fee-rows__skeleton" key={i} aria-hidden="true" />
        ))}
      </div>
    );
  }
  if (services.status === 'error') {
    if (services.error.code === 'NOT_CONFIGURED') {
      return <p className="quiet-state">Appointments and fees will be listed here soon.</p>;
    }
    return (
      <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
        <p>We couldn’t load the appointments just now.</p>
      </Notice>
    );
  }
  if (services.data.length === 0) return <p className="quiet-state">Appointments will be listed here soon — call or email to book in the meantime.</p>;

  return (
    <ol className="fee-rows" role="list">
      {indexOrder(services.data).map((s, i) => {
        const kind = kindOf(s);
        const { lead, goodFor } = splitDescription(s.description);
        const price = priceTerms(s, locale);
        return (
          <li className={`fee fee--${kind}`} key={s.id} data-reveal="">
            <span className="fee__n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="fee__main">
              <p className="fee__kind">{KIND_LABEL[kind]}</p>
              <h3 className="fee__name">{shortName(s.name)}</h3>
              {lead && <p className="fee__desc">{lead}</p>}
              {goodFor && (
                <p className="fee__good">
                  <span className="fee__good-label">Good for</span> {goodFor}
                </p>
              )}
            </div>
            <dl className="fee__figures">
              <div>
                <dt>On the bench</dt>
                <dd>
                  <span aria-hidden="true">{minutesLabel(s.durationMinutes)}</span>
                  <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                </dd>
              </div>
              <div>
                <dt>{price.label}</dt>
                <dd className={`fee__price fee__price--${price.kind}`}>{price.amount}</dd>
              </div>
              {price.note && <p className="fee__note">{price.note}</p>}
            </dl>
            <a className={`btn ${kind === 'consult' ? 'btn--outline' : 'btn--primary'} fee__book`} href="#book" onClick={bookLink(onBook, s.id)}>
              Book<span className="sr-only"> {s.name}</span>
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
