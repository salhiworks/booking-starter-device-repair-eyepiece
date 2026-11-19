import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Eyepiece } from './Eyepiece';
import { SectionLabel } from './SectionLabel';

/**
 * Your device, your data: a large eyepiece photograph beside a few plain promises about passcodes,
 * backups and what gets tested. Promises describe practice — never a result.
 */
export function Care({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const items = values['care.items'];
  const photo = values['care.photo'];
  if (items.length === 0) return null;
  return (
    <section className={`care section${photo ? '' : ' care--text'}`} id="data" aria-labelledby="care-title">
      <div className="shell">
        <SectionLabel n="05">Your data</SectionLabel>
        <div className="care__grid">
          {photo && <Eyepiece image={photo} sizes="(min-width: 1080px) 34rem, 80vw" sample={!ownerFields.includes('care.photo')} className="care__lens" />}
          <div className="care__body">
            <h2 id="care-title" className="section-title" data-reveal="">
              <Emphasis text={values['care.title']} />
            </h2>
            <ul className="promises" role="list">
              {items.map((item, i) => (
                <li className="promise" key={`${i}-${item.title}`} data-reveal="">
                  <span className="promise__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="promise__title">{item.title}</h3>
                  {item.text && <p className="promise__text">{item.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
