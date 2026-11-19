import { Reticle } from './Reticle';

/**
 * A section's label, like a callout in a repair manual: a small reticle, the section's number, its name
 * in the label face, then a hairline run out to the edge of the text (decorative). One per section, in
 * order — the page reads like the numbered steps of a teardown.
 */
export function SectionLabel({ n, children, tone }: { n?: string; children: string; tone?: 'night' }) {
  return (
    <div className={`label${tone ? ` label--${tone}` : ''}`} data-reveal="">
      <p className="label__name">
        <Reticle className="label__reticle" scale={false} />
        {n && (
          <span className="label__n" aria-hidden="true">
            {n}
          </span>
        )}
        <span className="label__text">{children}</span>
      </p>
      <span className="label__line" aria-hidden="true" />
    </div>
  );
}
