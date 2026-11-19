/**
 * The pentalobe: the five-lobed screw head that holds many phones together, drawn as the workshop's mark —
 * an ink screw head with the five-lobed recess cut into it in the accent colour. Decorative (the name
 * beside it is the text).
 */
const LOBES = (() => {
  const pts: string[] = [];
  const n = 90;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 5.4 + 1.9 * Math.cos(5 * t);
    const x = 12 + r * Math.cos(t - Math.PI / 2);
    const y = 12 + r * Math.sin(t - Math.PI / 2);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
})();

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={`mark ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle className="mark__head" cx="12" cy="12" r="11.25" />
      <path className="mark__lobes" d={LOBES} />
    </svg>
  );
}
