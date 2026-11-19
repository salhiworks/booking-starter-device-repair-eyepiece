import type { SiteValues } from '../lib/content';
import { BENCH_SAMPLE_PHOTOS } from '../content/samplePhotos';
import { Emphasis } from './Emphasis';
import { Eyepiece } from './Eyepiece';
import { SectionLabel } from './SectionLabel';

/**
 * On the bench, step by step: up to five steps along one focus scale (a hairline with ticks), each a
 * round eyepiece photograph, a number, a title and a sentence. Phones: a vertical list, the circles to
 * the left. Under it, the honest note on timing — not every repair fits inside the appointment.
 */
export function Bench({ values }: { values: SiteValues }) {
  const steps = values['bench.steps'];
  if (steps.length === 0) return null;
  return (
    <section className="bench section" id="bench" aria-labelledby="bench-title">
      <div className="shell">
        <SectionLabel n="04">How it works</SectionLabel>
        <header className="section-head">
          <h2 id="bench-title" className="section-title" data-reveal="">
            <Emphasis text={values['bench.title']} />
          </h2>
          {values['bench.intro'] && <p className="section-intro">{values['bench.intro']}</p>}
        </header>
        <ol className={`steps steps--${steps.length}`} role="list">
          {steps.map((step, i) => {
            const photo = step.photo ?? BENCH_SAMPLE_PHOTOS[i] ?? null;
            return (
              <li className="step" key={`${i}-${step.title}`}>
                {photo && <Eyepiece image={photo} sizes="(min-width: 1080px) 14rem, 30vw" sample={!step.photo} className="step__lens" />}
                <span className="step__tick" aria-hidden="true" />
                <div className="step__body">
                  <p className="step__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="step__title">{step.title}</h3>
                  {step.text && <p className="step__text">{step.text}</p>}
                </div>
              </li>
            );
          })}
        </ol>
        {values['bench.note'] && (
          <p className="bench__note" data-reveal="">
            <span className="bench__note-label">On timing</span>
            <span className="prewrap">{values['bench.note']}</span>
          </p>
        )}
      </div>
    </section>
  );
}
