# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session opened in
this folder. It changes identity and words only, so it finishes in one short session.

```text
Customize this phone & device repair starter for my business.

Business name: <YOUR BUSINESS NAME>
City and area: <CITY, AREA, STATE>
Time zone (IANA): <e.g. America/Chicago>
What I repair and how I work, in a few words: <e.g. phones and tablets only, screens and batteries, workshop above a bike shop, walk-ins by appointment>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the business name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my business: the name and the line beside
   it, what I am and where, the headline (short — it is set very large), introduction, main button,
   second link and the eyepiece caption, "What comes to the bench" (heading, introduction, each device
   and its usual jobs, and what I don't take), "What's going on with it?" (heading, introduction, each
   answer in a visitor's words, the appointment it points at — the exact name of one of my
   appointments or a word from it — what the appointment does and three things that happen, and the
   note under the answers), the fees heading, introduction, three pricing steps and small print, the
   bench heading, introduction, five steps and the timing note, the data heading and promises, the
   questions & policies (my real policies — what an assessment fee covers, whether it comes off the
   repair, the parts I use, any warranty I really give, cancellations), the booking heading and
   introduction, the workshop note, the footer line and the search title and description.
   Keep field ids, types, limits and photos. Keep the sample photos (they stay labelled "Sample
   photo" until I upload my own).
   Keep the honesty rules: one booking is one appointment for one customer and one device at my one
   bench — never a repair price, never a promise that a repair is finished within the appointment;
   final prices and times depend on the inspection, the model and the parts and are quoted before any
   work; no invented certifications, authorised-provider status, warranties, years in business,
   awards, press, reviews or testimonials; no guaranteed fixes; the booking form never asks for a
   passcode, PIN or password, and the copy never asks visitors to share one; nothing is paid online
   and there are no deposits; no appointment lengths or prices written into the copy.
4. Only if anti-static pink clearly doesn't fit my brand (otherwise skip this step): change the
   default of brand.accent in src/content/site.ts (a BRIGHT colour that keeps ink text at 4.5:1 —
   signal orange, a light teal, a warm yellow) and both colours in src/admin-theme.css. The bench
   white pages and the eyepiece-black band are part of the design and stay.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json. Do not invent
appointments, prices, opening hours or credentials I haven't told you about — appointments, fees
and hours are set in the dashboard. When done, run npm run build and fix any error, then show me the
result with npm run dev.
```

## After the prompt

- **Your appointments:** dashboard → Services. One booking is one appointment with you, for one
  service, one customer and one device.
  - **What a price means.** A fixed price is shown as an *assessment fee* (the inspection and a
    written quote — the repair is quoted separately); tick "from" for a part fitted at the
    appointment whose final price depends on the model (*from $69*); 0 is shown as *Free* (a
    consultation). Never put the price of a whole repair on an appointment you can't finish in it.
  - **Kinds.** The page reads each appointment's kind from the words in its name (then its
    description): *laptop, MacBook, notebook, computer* → **Laptop** (its own group in the booking
    sheet); *consultation, advice, opinion, not sure* → **Not sure yet** (listed last); *screen,
    display, glass, cracked, touch* → **Screen**; *battery, power* → **Battery**; *charging, port,
    USB, connector* → **Charging**; *diagnostic, assessment, inspection, water, drop* →
    **Diagnostic**. Each kind lifts its part out of the exploded drawing (the cover glass and display,
    the battery, the port, the logic board; a laptop shows the laptop; a consultation shows the
    device assembled). Anything else is a plain appointment.
  - **Who it's for.** End a description with `Good for:` — `Good for: cracked glass, touch that
    stops working`. Describe a situation, never a promised result.
  - **Credentials and warranties.** If you hold a real certification or give a real warranty, add it
    in your own words (for example in the questions). The starter invents none.
- **What's going on with it?:** Website → that section. Each answer names an appointment by its
  exact name or a word from it ("Battery"); its Book button opens that appointment and writes
  "Looking at: The battery dies too fast" into the booking note. An answer whose appointment can't
  be found shows no Book button. The drawing illustrates where a problem usually lives — it is never
  a diagnosis, and the note under the answers says so.
- **Headings:** wrap a word or two in *asterisks* to set them in a light italic (in the accent colour
  on the dark band).
- **Photos:** Website → each section. Round photos (the eyepiece, the bench steps, your data) are
  square photos cut to a circle. Use only your own photos, and never show a customer's screen,
  messages or data. The "Sample photo" label disappears from each one you replace.
- **Online booking:** dashboard → Settings, once email sending works (see BOOKING_ENGINE.md).
