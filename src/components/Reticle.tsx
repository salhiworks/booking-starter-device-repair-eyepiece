/**
 * The reticle in a microscope eyepiece — the page's one ornament: a fine ring, a crosshair with a gap at
 * its centre and a scale of ticks along the horizontal hair. Laid over every round photograph, drawn
 * small beside every section label, and around the chosen answer. Decorative.
 */
const TICKS = Array.from({ length: 17 }, (_, i) => 18 + i * 4).filter((x) => x < 44 || x > 56);

export function Reticle({ className, scale = true }: { className?: string; scale?: boolean }) {
  return (
    <svg className={`reticle ${className ?? ''}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle className="reticle__ring" cx="50" cy="50" r="48.5" />
      <path className="reticle__hair" d="M50 6V42M50 58V94M6 50H42M58 50H94" />
      {scale && (
        <path
          className="reticle__ticks"
          d={TICKS.map((x) => `M${x} ${(x - 18) % 8 === 0 ? 46.5 : 48}V50`).join('')}
        />
      )}
      <circle className="reticle__dot" cx="50" cy="50" r="1.6" />
    </svg>
  );
}
