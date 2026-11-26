# Phone & Device Repair "Eyepiece" Starter — project rules

A one-page booking website for an independent device repair technician who works on one customer's
device at a time at one workshop bench, shipped as **Pentalobe Device Repair** (a fictional workshop
in Over-the-Rhine, Cincinnati: a phone screen repair assessment, a battery replacement appointment, a
charging port diagnosis, a device diagnostic appointment, a laptop diagnostic appointment and a free
repair consultation — one customer and one device per appointment, at one fixed workshop address) for
the owner to make their own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is the prompt
that personalizes it. Built around **@profitstudio/booking-engine** **2.0.0** (pinned; lock in
`booking-engine.lock.json`). The engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll check the bench and confirm the time shortly.",
  confirmed → "Your appointment is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- Read the engine's answer strictly (`src/lib/bookingStatus.ts`): say "booked" only when `status === 'confirmed'`
  and "request received" only when it is `'pending'` — never treat "not pending" as booked. `BOOKING_INACTIVE`
  (the code was accepted earlier, but the request was declined, cancelled or not confirmed in time) is never a
  success: show "This request is no longer active. Please choose a new time or contact the business." with the
  reference, go back to the times, and forget the remembered code so no recovery path verifies it again.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one appointment at the bench: a reserved block of the one technician's time, for ONE
customer and ONE device, for one service, on one calendar, at the workshop's fixed address.** Its
length is the time on the bench with the customer; the buffer after it is the bench cleared and the
notes written. An appointment is NOT a repair: a fixed price is an assessment fee (the inspection and
a written quote), a "from" price is a starting price for a part fitted at the appointment (confirmed
before any work), free is a consultation. Prices are paid at the workshop — never online, no
deposits. Bookings confirm on the code (`autoConfirm: true` in the preset); the owner may switch to
reviewing requests in the dashboard, and the flow then says "request".

**Never promise a repair or a finish time.** Final repair prices and completion times depend on the
inspection, the device model and parts availability, and are quoted in writing before any work —
every section that shows a price or a length says so (`priceTerms` notes, the fees' pricing steps,
the bench's timing note, the FAQ). Never write "fixed in 30 minutes", "same-day guaranteed" or a
repair's price into the copy.

**Kinds are read from names.** "Phone Screen Repair Assessment", "Battery Replacement Appointment",
"Charging Port Diagnosis", "Device Diagnostic Appointment", "Laptop Diagnostic Appointment" and
"Device Repair Consultation" are ordinary engine services; the website only reads their KIND (screen ·
battery · port · diagnostic · laptop · consult) from the words in the name (`src/lib/services.ts`) —
to group the booking sheet (phones & tablets · laptops · not sure yet), to list the consultation last,
to label each fee row, to lift the right part of the exploded drawing (`KIND_PART`), and to link each
"What's going on with it?" answer to an appointment (`serviceFor`: the exact name, else a name
containing the owner's words from the start of a word, else the first appointment of the kind the
words name; with none, the answer has no Book button).

**Answers.** An answer's Book button opens its appointment and writes "Looking at: The screen is
cracked" into the booking note — replacing only a note an earlier answer wrote, never what the
customer typed (`BookingFlow`, `intent.note`). The exploded drawing is an ILLUSTRATION of where a
problem usually lives — never a diagnosis, never a fake diagnostic tool; `find.note` says so.

**Honest repair.** Never invent the technician's name, certifications, authorised-provider status,
memberships, years, awards, press, reviews, testimonials, warranties, success rates or customer
stories. Never promise a fix ("guaranteed", "we fix anything"). The *Good for:* line names a situation
("cracked glass") — never an outcome. Warranty and parts wording stays in the sample policies,
labelled, for the owner to make true.

**Passcodes and data.** The booking form never asks for a passcode, PIN, pattern, password or any
account detail, and the notes hint says not to type one. The copy never asks visitors to share a
passcode; when a test needs the device unlocked, the customer unlocks it at the bench. Never show a
customer's screen, messages or data in a photo. Never add data recovery, device accounts or repair
tracking.

A new booking feature needs a new engine version — never custom database code or browser-side logic:

- deposits or any online payment; repair quotes or invoices online;
- repair status tracking, device check-in records, customer device accounts;
- parts ordering, inventory or stock levels;
- several technicians or benches, drop-off queues, linked or recurring bookings, waitlists;
- device intake forms (model pickers, IMEI or serial numbers, passcodes).

The booking notes field is **Your device and what's going on (optional)** with the helper "The model
if you know it, and what happened — for example “Pixel 7, cracked screen, touch still works”. Please
never type a passcode, PIN, pattern or password here: you'll never be asked for one to book." The
name field's hint: the person bringing the device; under 18, a parent or guardian books. Proposed
engine work: `docs/ENGINE-PROPOSAL-device-repair.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/New_York`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample appointments, hours, policies; "customers"/"appointments") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kind (screen · battery · port · diagnostic · laptop · consult · other) from the name, its label (`KIND_LABEL`), its part of the drawing (`KIND_PART`, `PART_NAME`), page order (`indexOrder`), booking-sheet groups (`kinds`), `serviceFor` (answer → appointment), "Good for:" parsing, length and price terms (what a price means) | `src/lib/services.ts` |
| What the owner can edit (every text and photo — name and descriptor, hero, eyepiece photo and caption, the devices and what the bench doesn't take, the answers (words, appointment, text, three steps) and their note, the fee words and pricing steps, the bench steps (with photos) and the timing note, the data promises and photo, questions & policies, booking words and photo, workshop note and photo, logo, accent colour) | `src/content/site.ts` (`defineSiteContent`); sample photos for the devices and the bench steps by position in `src/content/samplePhotos.ts` (lists can't carry image defaults) |
| Content store + brand → CSS variable (`--accent`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` (note: booking.css owns `.sheet` (the booking dialog), `.rail`, `.parts`, `.part`, `.pick`, `.time`, `.summary` — the page uses its own names: `.eyepiece`, `.reticle`, `.facts`, `.device`, `.symptom`, `.xv`, `.fee`, `.pricing`, `.step`, `.promise`) |
| Sections | `src/components/*.tsx` (Header (the mark and name), Hero `#top` (open-now, the eyepiece, the live facts), Repairs `#repairs`, Finder `#find` (tab list → exploded drawing + card), Fees `#fees` (pricing steps + fee sheet), Bench `#bench` (five steps on a focus scale + timing note), Care `#data`, GoodToKnow `#questions`, BookingSection `#book`, Visit `#visit` (the workshop), Footer (the name set wide)); the ornament `Reticle.tsx`, `Eyepiece.tsx` (round photo + reticle), `Mark.tsx` (the pentalobe); the drawing `ExplodedView.tsx`; section labels `SectionLabel.tsx`; scroll reveals `src/lib/reveal.ts` (`data-reveal`); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history, `startBooking(serviceId, note)`), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated by `concepts/device-repair-eyepiece/photo-pipeline/photos.mjs`) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, prices,
  lengths, hours, the address, phone and email are NOT content: they come from the engine.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A service's, a fact's
  or an answer's Book button passes THAT service's engine id — never a stored price or id.
- **Lengths and prices:** always from the engine (`minutesLabel`, `durationLabel`, `priceLabel`, `priceTerms`).
  Never hard-code a service, length, price or id in copy (questions, answers and steps included).
- **Sample photos:** every photo carries a "Sample photo" label until the owner replaces that field
  (`ownerFields`; for list items, while the item's photo is empty). Never present a stock photograph
  as the technician, the workshop, a customer's device or a repair.
- **Default photos:** add variants to `public/photos/` via the photo pipeline, keep the default `src`
  in `site.ts` / `samplePhotos.ts` equal to a key in `photoVariants.ts`, record the source in
  `PHOTOS.md`. If the first-screen default changes, update the two `<link rel="preload">` in
  `index.html` (`imagesizes` must match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Policies:** Before you book shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** calm, plain, precise ("opened carefully, explained plainly"); no "best repair shop",
  "certified", "authorised", "guaranteed", "fixed in minutes", invented warranties, no pressure, no
  promised outcomes, no fake urgency.
- **Style:** plain CSS with the tokens; no UI kit. 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, every text/background pair at 4.5:1 (`contrast.mjs` in the concept
  folder). The accent is owner-editable and is a BRIGHT colour that always carries ink text (the
  editor checks 4.5:1 against ink); it is never text on the light pages, and it is the emphasised
  words on the eyepiece band. On the light pages emphasised words are ink, light italic. The bench
  white pages and the eyepiece band are fixed.
- **Composition (DESIGN.md):** bench white, bench grey, eyepiece black, one accent; Archivo (set wide
  for headings, normal width for text and figures); Martian Mono for small labels only; the reticle as
  the one ornament (round eyepiece photos, section labels, the chosen answer); the pentalobe as the
  mark; every section inside the one centred shell (`.shell`, `--page-max`). The first screen on wide
  screens is exactly one screen tall (the photo takes the height left). Motion — eyepiece photos
  coming into focus, reticles turning into place, the drawing's layers lifting — is off under
  `prefers-reduced-motion`; never hide content without `html.js-reveal`.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5281 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
