import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Appointments, prices, lengths, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 *
 * Headings may wrap words in *asterisks*: those words are set in a light
 * italic (and in the accent colour on the dark band).
 *
 * Copy rules (CLAUDE.md): honest repair — no invented certifications,
 * memberships, years, awards, press, reviews, testimonials, warranties or
 * success rates; no promised outcome ("guaranteed fix", "every repair in 30
 * minutes"); final prices and times depend on the inspection, the model and
 * the parts, and the site says so. Never ask for a passcode, PIN or password.
 */
const SAMPLE_HELP =
  'A “Sample photo” label stays on it until you replace it with your own photo — use only photos of your own workshop and work, or photos you have the right to use. Never show a customer’s screen, messages or personal data, and never present a stock photo as you, your bench or a repair you did.';

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-960.webp`, alt, width: 960, height: 640 });
const S = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 800 });
const EMPHASIS = 'Wrap a word or two in *asterisks* to set them in a light italic (in the accent colour on the dark band).';

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name or logo and the accent colour.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name',
          help: 'Shown beside the five-lobed mark in the header and very large in the footer. One or two short words read best.',
          default: 'Pentalobe',
          maxLength: 20,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name',
          help: 'What you are, in two or three words. Shown small beside the name.',
          default: 'Device repair',
          maxLength: 28,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide logo on a transparent background, drawn for a light background. It replaces the mark and name in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'Every main button, the reticle marks in the photographs, the chosen answer, the lifted part of the drawing and the chosen time. It carries dark text, so pick a BRIGHT colour — anti-static pink (the original), signal orange, a light teal. Dark colours are refused because dark text would not read on them.',
          default: '#ff5f9e',
          contrastWith: '#101416',
          minContrast: 4.5,
        },
      ],
    },
    {
      id: 'hero',
      label: 'First screen',
      description: 'The headline, a short introduction, the main photograph and the round eyepiece view beside it.',
      fields: [
        { type: 'text', id: 'hero.kicker', label: 'What you are', default: 'Phone, tablet & laptop repair', maxLength: 40 },
        { type: 'text', id: 'hero.place', label: 'Where you are', help: 'A neighbourhood and city.', default: 'Over-the-Rhine, Cincinnati', maxLength: 40 },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: `Short — it is set very large. ${EMPHASIS}`,
          default: 'Opened carefully. *Explained plainly.*',
          maxLength: 56,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'One technician, one bench, one device at a time. Book an appointment, see what we see under the microscope, and leave with a written quote — no repair starts until you say yes.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book an appointment', maxLength: 28, required: true },
        { type: 'text', id: 'hero.secondary', label: 'Second link', help: 'Leads to “What’s going on with it?”.', default: 'Not sure what to book?', maxLength: 32 },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (wide)',
          help: `Wide (3:2), shown beside the headline. Your bench, with you at work, reads best. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-bench-1440.webp',
            alt: 'A technician in a grey sweater bends over a phone at a white workbench with a teal mat, a stereo microscope beside him.',
            width: 1440,
            height: 960,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'hero.loupe',
          label: 'Eyepiece photo (square)',
          help: `Square, shown as a circle — like the view through a microscope. A close-up of a part reads best. ${SAMPLE_HELP}`,
          default: S('loupe-connector', 'Seen through a microscope eyepiece: the gold pins of a display connector on a phone’s logic board.'),
          aspectRatio: 1,
        },
        { type: 'text', id: 'hero.loupeCaption', label: 'Eyepiece caption', default: 'Display connector, ×20', maxLength: 32 },
      ],
    },
    {
      id: 'repairs',
      label: 'What you repair',
      description: 'The devices you work on, each with the jobs that usually come in, and a plain line about what you don’t take.',
      fields: [
        { type: 'text', id: 'repairs.title', label: 'Heading', help: EMPHASIS, default: 'What comes *to the bench.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'repairs.intro',
          label: 'Introduction',
          default: 'Most of what we see is everyday wear and accidents. If yours isn’t listed, ask before you book — or book a free consultation.',
          maxLength: 240,
          rows: 2,
        },
        {
          type: 'list',
          id: 'repairs.items',
          label: 'Devices',
          help: 'Up to four. A device and its usual jobs, one per line.',
          itemLabel: 'Device',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'device', label: 'Device', default: '', maxLength: 28, required: true },
            { type: 'longText', id: 'jobs', label: 'Usual jobs (one per line)', default: '', maxLength: 260, rows: 5 },
            { type: 'image', id: 'photo', label: 'Photo (portrait 4:5)', help: 'Leave empty to show the sample photo in this place (labelled “Sample photo”).', default: null },
          ],
          default: [
            { device: 'Phones', jobs: 'Cracked screens and back glass\nBatteries that die too fast\nCharging ports\nCameras and speakers\nWater and drop damage' },
            { device: 'Tablets', jobs: 'Cracked glass and displays\nBatteries\nCharging ports\nButtons that stick or stop' },
            { device: 'Laptops', jobs: 'Won’t start or runs hot\nBatteries and chargers\nKeyboards, trackpads and hinges\nCracked screens' },
          ],
        },
        {
          type: 'longText',
          id: 'repairs.not',
          label: 'What you don’t take',
          help: 'One or two sentences. Being clear here saves everyone a trip.',
          default: 'Not on this bench: game consoles, smartwatches, desktop PCs, or recovering data from storage that has failed.',
          maxLength: 240,
          rows: 2,
        },
      ],
    },
    {
      id: 'find',
      label: 'What’s going on with it?',
      description:
        'Visitors pick what is wrong and see the appointment for it, with its live length and price, beside a drawing of the device with the part lifted out. Each answer names an appointment by its name (or a word from it) — its Book button opens that appointment with the answer written into the booking note.',
      fields: [
        { type: 'text', id: 'find.title', label: 'Heading', help: EMPHASIS, default: 'What’s going *on with it?*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'find.intro',
          label: 'Introduction',
          default: 'Pick the one that sounds closest. You’ll see which appointment to book, what happens at it and what it costs.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'list',
          id: 'find.items',
          label: 'Answers',
          help: 'Up to eight. “Appointment” is the name of one of your appointments, or a word from it (“Battery”). An answer whose appointment can’t be found shows no Book button.',
          itemLabel: 'Answer',
          maxItems: 8,
          fields: [
            { type: 'text', id: 'symptom', label: 'In the visitor’s words', default: '', maxLength: 44, required: true },
            { type: 'text', id: 'service', label: 'Appointment', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'What the appointment does', default: '', maxLength: 260, rows: 3 },
            { type: 'longText', id: 'steps', label: 'Three things that happen (one per line)', default: '', maxLength: 220, rows: 3 },
          ],
          default: [
            {
              symptom: 'The screen is cracked',
              service: 'Phone Screen Repair Assessment',
              text: 'Cracked glass, lines on the display, touch that stops working. We find out what’s damaged — just the glass, or the display under it — and price the part for your exact model.',
              steps: 'Glass, display and touch checked\nYour model and the part confirmed\nA written quote, and a time',
            },
            {
              symptom: 'The battery dies too fast',
              service: 'Battery Replacement Appointment',
              text: 'Dead by lunchtime, shutting down at 20 %, or a battery that has started to swell. A swollen battery is worth booking soon — stop charging it if the case is lifting.',
              steps: 'Battery health checked first\nThe price for your model confirmed\nFitted and tested while you wait, if it’s in stock',
            },
            {
              symptom: 'It won’t charge',
              service: 'Charging Port Diagnosis',
              text: 'Only charges at an angle, the cable falls out, or nothing at all. Very often it’s pocket lint packed into the port.',
              steps: 'The port looked into, magnified\nCleaned and tested with a known-good cable\nA quote, if the port itself has failed',
            },
            {
              symptom: 'It got wet, fell or won’t turn on',
              service: 'Device Diagnostic Appointment',
              text: 'If it got wet, turn it off and don’t charge it. Bring it in as it is — no rice. We open it and look before anyone guesses.',
              steps: 'Opened and inspected under the microscope\nWhat we found, in plain words\nWhether a repair is worth it',
            },
            {
              symptom: 'It’s my laptop',
              service: 'Laptop Diagnostic Appointment',
              text: 'Won’t start, runs hot, keys that stopped, a loose hinge or a cracked screen. Bring the charger too.',
              steps: 'Tested with you at the bench\nOpened, if the fault needs it\nWritten findings and a quote',
            },
            {
              symptom: 'I’m not sure it’s worth fixing',
              service: 'Device Repair Consultation',
              text: 'An older device, a second opinion, or no idea what to book. A short look and an honest answer — repairing isn’t always the right call.',
              steps: 'A look, nothing opened\nWhat a repair would likely involve\nRepair, replace or leave it',
            },
          ],
        },
        {
          type: 'longText',
          id: 'find.note',
          label: 'A note under the answers',
          help: 'Keep it honest: the drawing shows where a problem usually lives, the inspection decides.',
          default: 'The drawing shows where a problem usually lives — it isn’t a diagnosis. The inspection decides, and nothing is repaired before you’ve seen the quote.',
          maxLength: 260,
          rows: 2,
        },
      ],
    },
    {
      id: 'fees',
      label: 'Appointments & fees',
      description:
        'The words around your appointments and how a repair is priced. The appointments themselves — names, descriptions, lengths and prices — are edited in Services. A description can end with “Good for: cracked glass”, shown as its own line.',
      fields: [
        { type: 'text', id: 'fees.title', label: 'Heading', help: EMPHASIS, default: 'Appointments *& fees.*', maxLength: 44, required: true },
        {
          type: 'longText',
          id: 'fees.intro',
          label: 'Introduction',
          default: 'What you book here is time at the bench — not the final price of a repair. Each appointment says what it costs and what that covers.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'list',
          id: 'fees.steps',
          label: 'How a repair is priced',
          help: 'Up to three short steps, in order.',
          itemLabel: 'Step',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 28, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 220, rows: 3 },
          ],
          default: [
            { title: 'The appointment', text: 'What you book online: an assessment fee, a starting price for a part, or free. Paid at the bench.' },
            { title: 'The quote', text: 'After the inspection, in writing: the part, the work, the price and when it can be ready. Nothing starts before you say yes.' },
            { title: 'The repair', text: 'Only if you go ahead. Some are done within the appointment; others wait for a part — the quote says which.' },
          ],
        },
        {
          type: 'text',
          id: 'fees.footnote',
          label: 'Small print under the appointments',
          default: 'Paid at the workshop, by card or cash. Nothing is paid online and there are no deposits.',
          maxLength: 200,
        },
      ],
    },
    {
      id: 'bench',
      label: 'On the bench',
      description: 'How an appointment goes — up to five steps, each with a round photograph.',
      fields: [
        { type: 'text', id: 'bench.title', label: 'Heading', help: EMPHASIS, default: 'On the bench, *step by step.*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'bench.intro',
          label: 'Introduction',
          default: 'You can watch. Every step happens at the bench in front of you, and nothing goes further than you’ve agreed.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'list',
          id: 'bench.steps',
          label: 'Steps',
          help: 'Up to five, in order: a short title, a sentence or two, and a square photo (shown as a circle).',
          itemLabel: 'Step',
          maxItems: 5,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 28, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 220, rows: 3 },
            { type: 'image', id: 'photo', label: 'Photo (square)', help: 'Leave empty to show the sample photo in this place (labelled “Sample photo”).', default: null },
          ],
          default: [
            { title: 'You show us', text: 'What happened, what it does now, what matters most. We write it down with you.' },
            { title: 'We open it', text: 'Only if the appointment needs it — the right screwdriver, the screws laid out in order.' },
            { title: 'We look closer', text: 'Under the microscope, the part that failed and anything else we notice. You can look too.' },
            { title: 'You decide', text: 'A written quote: the part, the work, the price, the time. Repair now, later, or not at all.' },
            { title: 'We test it with you', text: 'Before it goes back in your hands: the repaired part tested, at the bench, in front of you.' },
          ],
        },
        {
          type: 'longText',
          id: 'bench.note',
          label: 'A note on timing',
          help: 'Say plainly that not every repair is finished within the appointment.',
          default:
            'Not every repair fits inside the appointment. When a part has to be ordered or a fault needs a longer test, the quote says when it can be ready — and the device can go home with you until then.',
          maxLength: 300,
          rows: 3,
        },
      ],
    },
    {
      id: 'care',
      label: 'Your data',
      description: 'How you treat customers’ devices and data — a few plain promises beside a round photograph.',
      fields: [
        { type: 'text', id: 'care.title', label: 'Heading', help: EMPHASIS, default: 'Your device. *Your data.*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'care.items',
          label: 'Promises',
          help: 'Up to four. Describe what you do — never promise a result.',
          itemLabel: 'Promise',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 40, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 240, rows: 3 },
          ],
          default: [
            { title: 'No passcode to book', text: 'The booking form never asks for one. Please don’t type a passcode, PIN, pattern or password anywhere in it.' },
            { title: 'Unlocked at the bench', text: 'If a repair needs testing on the home screen, we’ll ask you to unlock it in front of us — never to write a code down.' },
            { title: 'Back it up first', text: 'If it still turns on, back it up before you come. A repair shouldn’t touch your data, but it should never depend on one.' },
            { title: 'Only what the repair needs', text: 'We test the part we worked on — the screen, the camera, the charging — and nothing else.' },
          ],
        },
        {
          type: 'image',
          id: 'care.photo',
          label: 'Photo (square)',
          help: `Square, shown as a circle. ${SAMPLE_HELP}`,
          default: S('glass-cracked', 'Close-up of shattered glass on a black background, fine cracks running across it like a web.'),
          aspectRatio: 1,
        },
      ],
    },
    {
      id: 'faq',
      label: 'Before you book',
      description: 'Practical answers and policies. Until you edit them they are labelled “Sample policies”.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Heading', help: EMPHASIS, default: 'Before *you book.*', maxLength: 44, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 12,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 90, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'Will my repair be finished during the appointment?',
              answer:
                'Sometimes. A battery or a screen that’s in stock can often be fitted the same day; a part that has to be ordered, or a fault that needs a longer test, takes longer. The quote tells you which before you decide.',
            },
            {
              question: 'How much will the repair cost?',
              answer:
                'It depends on the model, the part and what the inspection finds, so nobody can honestly price it before looking. You get a written quote first, and nothing is repaired until you say yes.',
            },
            {
              question: 'Do I pay the assessment fee if I don’t go ahead?',
              answer:
                'Yes — it pays for the inspection and the quote. If you go ahead with the repair, the fee comes off the repair price.',
            },
            {
              question: 'What parts do you use?',
              answer:
                'The quote names the part — original where one is available, or a good third-party part — and what the difference means for price and quality. You choose.',
            },
            {
              question: 'Is there a warranty on repairs?',
              answer: 'Any warranty on a repair is written on your quote and your receipt. If it matters to you, ask before you book.',
            },
            {
              question: 'Will a repair affect the manufacturer’s warranty or water resistance?',
              answer:
                'Opening a device can affect both. If your device is still under the maker’s warranty, check with them first; we’ll mention it before any work.',
            },
            {
              question: 'Do you need my passcode?',
              answer:
                'Not to book, and never written down. If a repair needs testing on the home screen, you unlock the device yourself at the bench.',
            },
            {
              question: 'Can I leave my device with you?',
              answer: 'Yes, when a repair needs longer. We agree a time to collect it and keep it in the workshop until then.',
            },
            {
              question: 'What should I bring?',
              answer: 'The device, its charger or cable if it won’t charge, and — for a laptop — the charger. Remove the case if you can.',
            },
            {
              question: 'What if I need to cancel or move my appointment?',
              answer: 'Please let us know at least two hours before, so the time can go to someone else. Arriving late may mean a shorter appointment.',
            },
            {
              question: 'How do I pay?',
              answer: 'At the workshop, by card or cash. Nothing is paid online and there are no deposits.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The closing booking band and the top of the booking sheet.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Heading', help: EMPHASIS, default: 'Pick a time *at the bench.*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose an appointment and a time. A 6-digit code from your email confirms it — no account needed.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'image',
          id: 'book.photo',
          label: 'Photo (wide)',
          help: `Wide (3:2), shown in the closing booking band. Remove it for text only. ${SAMPLE_HELP}`,
          default: L('book-microscope', 'A technician looks into a white stereo microscope at a workbench, a red light glowing on the wall behind him.'),
          aspectRatio: 3 / 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'The workshop',
      description: 'Hours, address, phone and email come from your Business settings. Add how to find the workshop.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Heading', help: EMPHASIS, default: 'Find *the workshop.*', maxLength: 44, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding the workshop',
          default:
            'The workshop is at the back of the building: walk through the passage beside the café and ring the bell on the grey door. Street parking on Vine and 14th. By appointment — so the bench is clear when you arrive.',
          maxLength: 400,
          rows: 3,
        },
        {
          type: 'image',
          id: 'visit.photo',
          label: 'Photo (portrait 4:5)',
          help: `Portrait (4:5). The workshop itself reads best. ${SAMPLE_HELP}`,
          default: P('visit-workshop', 'A long white repair bench under a strip light, a technician in an office chair working at a microscope at the far end.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [{ type: 'text', id: 'footer.tagline', label: 'Line under the name', default: 'Phone, tablet and laptop repair at one bench in Over-the-Rhine, Cincinnati.', maxLength: 80 }],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Pentalobe Device Repair — phone, tablet & laptop repair in Cincinnati',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'Independent phone, tablet and laptop repair in Over-the-Rhine, Cincinnati: screens, batteries, charging ports and diagnostics. One technician, written quotes. Book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
  ],
});
