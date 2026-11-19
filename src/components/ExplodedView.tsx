import type { ReactNode } from 'react';
import type { Part } from '../lib/services';

/**
 * The exploded view — a phone (or a laptop) drawn in isometric line work with its layers pulled apart,
 * the way a repair manual shows what sits under what. The part an appointment is about is lifted out of
 * the stack and filled with the accent colour: the cover glass and display for a screen, the battery,
 * the charging port at the foot of the frame, the logic board for a diagnostic. A consultation shows
 * the device assembled — nothing is opened. It is an ILLUSTRATION of where a problem usually lives,
 * never a diagnosis; the section says so. Decorative (aria-hidden): the card beside it names the part.
 *
 * Each layer is a flat shape drawn in its own plane (x across, y down the device) and projected with one
 * isometric matrix; a copy shifted down by the layer's thickness is its edge. The layers move with a CSS
 * transform (no motion under prefers-reduced-motion).
 */
const ISO = (tx: number, ty: number) => `matrix(0.866 0.5 -0.866 0.5 ${tx} ${ty})`;

type LayerId = 'glass' | 'display' | 'battery' | 'board' | 'frame' | 'back' | 'lid' | 'deck' | 'lboard' | 'lbattery' | 'case';

interface Layer {
  id: LayerId;
  /** The parts that light this layer. */
  parts: Part[];
  draw: ReactNode;
}

// ── The phone: 84 × 180 in its own plane ──────────────────────────────────
const PW = 84;
const PH = 180;
const plate = <rect x="0" y="0" width={PW} height={PH} rx="13" />;
const PHONE: Layer[] = [
  {
    id: 'glass',
    parts: ['glass'],
    draw: (
      <>
        {plate}
        <path className="xv__detail" d="M14 30L34 10M14 52L56 10" />
        <rect className="xv__detail" x="34" y="7" width="16" height="3" rx="1.5" />
      </>
    ),
  },
  {
    id: 'display',
    parts: ['glass'],
    draw: (
      <>
        {plate}
        <rect className="xv__inner" x="6" y="6" width={PW - 12} height={PH - 12} rx="9" />
        <path className="xv__detail" d="M30 176h24" />
      </>
    ),
  },
  {
    id: 'battery',
    parts: ['battery'],
    draw: (
      <>
        <rect x="14" y="56" width="56" height="96" rx="6" />
        <path className="xv__detail" d="M30 56v-6h24v6M24 72h36M24 80h22" />
      </>
    ),
  },
  {
    id: 'board',
    parts: ['board'],
    draw: (
      <>
        <path d="M10 10h64a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H52v104a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V52H10a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" />
        <rect className="xv__detail" x="40" y="18" width="16" height="16" rx="2" />
        <rect className="xv__detail" x="60" y="20" width="10" height="8" rx="1.5" />
        <rect className="xv__detail" x="14" y="36" width="20" height="8" rx="1.5" />
        <circle className="xv__detail" cx="20" cy="22" r="6" />
        <path className="xv__detail" d="M40 70h8M40 82h8M40 94h8M40 106h8" />
      </>
    ),
  },
  {
    id: 'frame',
    parts: ['port'],
    draw: (
      <>
        {plate}
        <rect className="xv__inner" x="6" y="6" width={PW - 12} height={PH - 12} rx="9" />
        <rect className="xv__port" x="32" y={PH - 4.5} width="20" height="4.5" rx="2.25" />
        <path className="xv__detail" d="M18 176.5h6M60 176.5h6" />
      </>
    ),
  },
  {
    id: 'back',
    parts: [],
    draw: (
      <>
        {plate}
        <rect className="xv__detail" x="8" y="8" width="30" height="30" rx="8" />
        <circle className="xv__detail" cx="18" cy="18" r="5" />
        <circle className="xv__detail" cx="29" cy="29" r="5" />
      </>
    ),
  },
];

// ── The laptop: 200 × 136 in its own plane ────────────────────────────────
const LW = 200;
const LH = 136;
const lplate = <rect x="0" y="0" width={LW} height={LH} rx="10" />;
const LAPTOP: Layer[] = [
  {
    id: 'lid',
    parts: [],
    draw: (
      <>
        {lplate}
        <rect className="xv__inner" x="8" y="8" width={LW - 16} height={LH - 16} rx="5" />
      </>
    ),
  },
  {
    id: 'deck',
    parts: [],
    draw: (
      <>
        {lplate}
        <rect className="xv__inner" x="16" y="14" width={LW - 32} height="62" rx="4" />
        <path className="xv__detail" d={Array.from({ length: 5 }, (_, i) => `M20 ${24 + i * 12}H180`).join('')} />
        <rect className="xv__inner" x="68" y="88" width="64" height="38" rx="4" />
      </>
    ),
  },
  {
    id: 'lboard',
    parts: ['laptop', 'board'],
    // Toward the front of its plane, so the deck above never hides it.
    draw: (
      <g transform="translate(54 42)">
        <path d="M14 10h120a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H70v18a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" />
        <rect className="xv__detail" x="24" y="20" width="22" height="22" rx="2" />
        <rect className="xv__detail" x="56" y="22" width="30" height="12" rx="2" />
        <circle className="xv__detail" cx="112" cy="34" r="12" />
        <path className="xv__detail" d="M20 58h36M20 66h28" />
      </g>
    ),
  },
  {
    id: 'lbattery',
    parts: ['battery'],
    draw: (
      <>
        <rect x="24" y="84" width="152" height="40" rx="5" />
        <path className="xv__detail" d="M74 84v40M124 84v40" />
      </>
    ),
  },
  {
    id: 'case',
    parts: ['port'],
    draw: (
      <>
        {lplate}
        <rect className="xv__port" x="-2" y="40" width="4" height="16" rx="2" />
        <path className="xv__detail" d="M30 20h40M30 26h40" />
      </>
    ),
  },
];

/** Where the stack sits: the top layer's origin, the gap between layers exploded and assembled. */
const MODELS = {
  phone: { layers: PHONE, tx: 250, top: 26, gap: 58, closed: 7, w: PW, h: PH, lift: { x: -38, y: -12 } },
  laptop: { layers: LAPTOP, tx: 186, top: 40, gap: 66, closed: 9, w: LW, h: LH, lift: { x: -28, y: -30 } },
} as const;


export function ExplodedView({ part }: { part: Part }) {
  const model = part === 'laptop' ? MODELS.laptop : MODELS.phone;
  const open = part !== 'whole';
  const n = model.layers.length;
  const mid = (n - 1) / 2;
  return (
    <svg className={`xv xv--${part === 'laptop' ? 'laptop' : 'phone'}${open ? ' is-open' : ''}`} viewBox="0 0 420 500" aria-hidden="true" focusable="false">
      {/* Drawn bottom-up, so upper layers cover the ones beneath. */}
      {model.layers
        .map((layer, i) => ({ layer, i }))
        .reverse()
        .map(({ layer, i }) => {
          const lit = open && layer.parts.includes(part);
          const centre = model.top + mid * model.gap;
          const y = open ? model.top + i * model.gap : centre + (i - mid) * model.closed;
          const dx = lit ? model.lift.x : 0;
          const dy = y + (lit ? model.lift.y : 0);
          return (
            <g key={layer.id} className={`xv__layer xv__layer--${layer.id}${lit ? ' is-lit' : ''}`} style={{ transform: `translate(${dx}px, ${dy}px)` }}>
              <g className="xv__edge" transform={ISO(model.tx, 0)}>
                <g transform="translate(5 5)">{layer.draw}</g>
              </g>
              <g className="xv__face" transform={ISO(model.tx, 0)}>
                {layer.draw}
              </g>
              {lit && (
                // The callout: a ring on the part's far corner and a hairline out to the drawing's edge.
                <g className="xv__callout">
                  <circle cx={model.tx + 0.866 * model.w - 6} cy={0.5 * model.w + 4} r="5" />
                  <path d={`M${model.tx + 0.866 * model.w} ${0.5 * model.w + 4}H412`} />
                </g>
              )}
            </g>
          );
        })}
    </svg>
  );
}
