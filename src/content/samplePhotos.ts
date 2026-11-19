import type { SiteImage } from '@profitstudio/booking-engine';

/**
 * Sample photos for list items (the engine's content lists cannot carry an image default): an item
 * whose photo field is empty shows the sample photo in its place, labelled "Sample photo".
 * Keys are photo-variant keys (src/content/photoVariants.ts). Sources: see PHOTOS.md.
 */
const P = (name: string, alt: string): SiteImage => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const S = (name: string, alt: string): SiteImage => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 800 });

/** "What comes to the bench" — by position. */
export const REPAIRS_SAMPLE_PHOTOS: readonly SiteImage[] = [
  P('repairs-phone', 'Two hands on a teal mat: one steadies an opened phone, the other holds a small screwdriver over it.'),
  P('repairs-tablet', 'A technician works on a device held upright in a repair stand at a white bench.'),
  P('repairs-laptop', 'Two hands hold the red and black probes of a meter against a laptop’s logic board.'),
];

/** "On the bench" — by position. */
export const BENCH_SAMPLE_PHOTOS: readonly SiteImage[] = [
  S('step-checkin', 'A technician in glasses turns a phone over in his hands at the bench.'),
  S('step-open', 'A fine screwdriver lifts a tiny screw out of an opened phone lying on a teal mat.'),
  S('step-inspect', 'Seen from above: a technician’s hands under a white stereo microscope on a teal mat.'),
  S('step-repair', 'A soldering tip and copper braid on a phone’s logic board.'),
  S('step-test', 'A technician looks down at a phone he holds in both hands, a microscope beside him.'),
];

