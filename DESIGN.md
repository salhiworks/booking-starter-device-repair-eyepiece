# Eyepiece — the visual system

**Idea:** the view through the eyepiece. A good repair is mostly *looking* — a stereo microscope over
a teal anti-static mat, a reticle in the lens, small screws laid out in the order they came out. What
someone booking a repair wants from the first screen is three things: *this person is careful*,
*they will tell me the truth about it*, and *what does it cost to find out*. The site answers in that
order — the technician at the bench with a round eyepiece view of a display connector laid over the
photo, "Opened carefully. *Explained plainly.*", and the lowest assessment fee and the free
consultation, live, as callouts.

Kept clear of the tech-support clichés and of the collection: no blue gradients, no glowing circuit
patterns, no stock "thumbs up" technicians, no cartoon phones with bandages, no cracked-screen
hero, no repair-tracking dashboards; no graphite bay (Clearcoat), no workshop-yellow price board or
measuring scale (Workbench), no guide signs (Guide Sign). Warmth comes from the photographs (the
teal mat, the technician's care) and the copy; precision from the reticle and the wide type; trust
from fees that say what they cover and a plain word about passcodes.

Every raw value lives in `src/styles/tokens.css`. Other stylesheets use the tokens only.

## Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--accent` (owner: *Accent colour*) | `#ff5f9e` anti-static pink | Every main button (ink text), the reticle's centre dot, the chosen answer, the lifted part of the exploded drawing, the first pricing step, selected days and times, the open FAQ icon, emphasised words on the eyepiece band | ink on it 6.5:1 (the editor checks any new colour against ink at 4.5:1); as text on eyepiece black 6.8:1; **never text on the light pages** |
| `--paper` | `#eff1ef` bench white | The page | — |
| `--paper-2` | `#e1e5e3` bench grey | Appointments & fees, Before you book | muted text 5.6:1 |
| `--raised` | `#fbfcfb` | Inputs, the booking card and sheet | — |
| `--ink` / `--ink-soft` / `--muted` | `#101416` / `#2a3034` / `#535b60` | Text | 17 / 12.7 / 6.4:1 on bench white |
| `--spruce` (`-2`, `-3`) — eyepiece black | `#0b0d0e` | "What's going on with it?", the footer, the booking sheet's header, the ring of every round photo | `--on-spruce` 18:1, `-soft` 12:1, `-faint` 7:1 |
| `--clay` | `#b3261e` | Errors only, always with words | — |

Why anti-static pink: it is the colour of the pink polyethylene bags electronics travel in — a real
workshop material, not a tech-brand blue — and it is unused in the collection. Beside the teal mat in
the photographs it is the one saturated note on the page. It carries ink text, so it can be bright.

## Type

- **Archivo** (variable, OFL; weight 100–900 and width 62–125 %). Headings at width 118 % and weight
  640, tightly tracked (−0.035em): wide, firm and technical, like the lettering on an instrument.
  Reading text at normal width, 1.5–1.6 leading; every figure (fees, lengths, times), tabular where
  they line up.
- **Emphasis.** The owner's `*emphasis*` in a heading turns the words light (280) and italic at
  normal width — the same voice, quieter: "Opened carefully. *Explained plainly.*" Ink on the light
  pages, the accent on the eyepiece band. No underline.
- **Martian Mono** — only the small labels: section numbers, kinds ("SCREEN", "NOT SURE YET"),
  callout numbers, "On the bench / Assessment fee", captions, "Sample photo". Uppercase at 0.04em.
- **The footer name** — Archivo at its widest (125 %), weight 700, sized to the page by container
  units, with the pentalobe beside it.

## The one ornament — the reticle

A fine ring, a crosshair with a gap at its centre and a scale of ticks along the horizontal hair, the
centre dot in the accent (`Reticle.tsx`). It is:

- laid over every **round photograph** (`Eyepiece.tsx`): a square photo cut to a circle inside a dark
  ring, like the view through a microscope — the hero's eyepiece, the five bench steps, your data;
- the small mark that opens every **section label** ("⊕ 03 FEES");
- the mark on the **chosen answer** in "What's going on with it?".

The **pentalobe** — the five-lobed screw head — is the workshop's mark (`Mark.tsx`): in the header,
the favicon and the footer. It is the name, not an ornament repeated on the page; the device cards'
list bullets are small screw heads (a ring with a pink dot).

## The signature — the exploded view

"What's going on with it?" sits on the eyepiece band. Six answers in the visitor's words (a tab
list); beside them an isometric line drawing of a phone pulled apart into its layers — cover glass,
display, battery, logic board, frame with the charging port, back — and the card with the
appointment to book. Choosing an answer lifts the part it is usually about out of the stack and fills
it with the accent (the port alone on the frame); "It's my laptop" swaps in a laptop drawing; the
consultation shows the device assembled, nothing opened. The drawing is an illustration of where a
problem usually lives — the note under the answers says it isn't a diagnosis.

## Layout

- One centred shell (`--page-max` 104rem) for every section; the eyepiece band runs edge to edge.
- **First screen** (≥ 1080): words on the left, the bench photo on the right filling exactly one
  screen's height, the eyepiece over the photo's lower-left corner, the live facts as two callouts
  under the photo. Phones: words and action first, the photo (a 4:5 crop) with the eyepiece in its
  corner, then the facts.
- **What comes to the bench**: three device cards (4:5 photos; 4:3 on phones) with lettered markers
  and parts-list jobs; one struck-through circle for what the bench doesn't take.
- **Appointments & fees**: a sticky heading with *how a repair is priced* (three numbered steps on a
  hairline) beside the fee sheet — number, kind, name, what it does, *good for*, the time on the bench,
  what the price is, Book.
- **On the bench**: five round photographs over one focus scale (a ruled line with ticks and a pink
  dot per step), then numbered steps; phones list them with the circles to the left. A bordered note
  on timing follows.
- **Your data**: a large eyepiece of cracked glass beside four numbered promises.
- **Before you book**, the booking band (a card over a wide microscope photo), **the workshop**
  (portrait photo, hours, address, finding it), the footer.

## Motion

Round photos come into focus (a blur that clears) and their reticles turn into place; section
labels' reticles turn as their hairline draws out; cards and rows rise; the drawing's layers slide when
an answer changes; the pentalobe turns in the footer and when the header mark is hovered. Everything
is off under `prefers-reduced-motion` (no `html.js-reveal`, durations of 1 ms).

## Accessibility

44 px targets throughout; a visible ink (or accent, on the dark band) focus ring; the answers are a
real tab list (one tab stop, arrows, Home, End); the drawing is `aria-hidden` and the card names the
part in words; every photo has alt text and a visible "Sample photo" label until replaced; every
text/background pair at 4.5:1 or better (`contrast.mjs`).
