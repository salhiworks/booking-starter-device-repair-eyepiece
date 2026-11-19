import type { SiteValues } from '../lib/content';
import { REPAIRS_SAMPLE_PHOTOS } from '../content/samplePhotos';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * What comes to the bench: one card per device the workshop works on — a portrait photograph, the
 * device's name set wide, its usual jobs as a parts list with a pentalobe screw for a bullet — and one
 * plain line about what the bench doesn't take.
 */
export function Repairs({ values }: { values: SiteValues }) {
  const items = values['repairs.items'];
  if (items.length === 0) return null;
  return (
    <section className="repairs section" id="repairs" aria-labelledby="repairs-title">
      <div className="shell">
        <SectionLabel n="01">What we repair</SectionLabel>
        <header className="section-head">
          <h2 id="repairs-title" className="section-title" data-reveal="">
            <Emphasis text={values['repairs.title']} />
          </h2>
          {values['repairs.intro'] && <p className="section-intro">{values['repairs.intro']}</p>}
        </header>
        <ul className={`devices devices--${Math.min(items.length, 4)}`} role="list">
          {items.map((item, i) => {
            const photo = item.photo ?? REPAIRS_SAMPLE_PHOTOS[i] ?? null;
            const jobs = item.jobs
              .split('\n')
              .map((j) => j.trim())
              .filter(Boolean);
            return (
              <li className="device" key={`${i}-${item.device}`} data-reveal="">
                {photo && (
                  <figure className="device__photo">
                    <Photo image={photo} sizes="(min-width: 1080px) 28vw, (min-width: 640px) 45vw, 92vw" />
                    {!item.photo && <figcaption className="photo-label">Sample photo</figcaption>}
                  </figure>
                )}
                <div className="device__body">
                  <p className="device__n" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </p>
                  <h3 className="device__name">{item.device}</h3>
                  {jobs.length > 0 && (
                    <ul className="device__jobs" role="list">
                      {jobs.map((j) => (
                        <li key={j}>{j}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {values['repairs.not'] && (
          <p className="repairs__not">
            <span className="repairs__not-mark" aria-hidden="true" />
            <span className="prewrap">{values['repairs.not']}</span>
          </p>
        )}
      </div>
    </section>
  );
}
