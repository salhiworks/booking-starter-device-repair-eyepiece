# Phone & Device Repair Booking Website — "Eyepiece" Starter

A finished, premium booking website for an independent device repair technician who works on one
customer's device at a time at one workshop bench, ready to make your own with Claude Code and
publish on Hostinger. It ships as **Pentalobe Device Repair**, a fictional workshop in
Over-the-Rhine, Cincinnati:

- a one-page website built on the view through a microscope eyepiece — cool bench white, one
  eyepiece-black band and one anti-static pink. A first screen with a wide, firm headline in Archivo
  ("Opened carefully. *Explained plainly.*"), **Book an appointment**, a photograph of the bench with
  a **round eyepiece view** of a part laid over its corner (a reticle in the lens), and the live
  facts from the booking system (the lowest assessment fee, the free consultation, each with its
  length); **what comes to the bench** — phones, tablets and laptops with their usual jobs, and a
  plain line about what the bench doesn't take; **What's going on with it?** — pick "The screen is
  cracked" or "It won't charge" and an **exploded drawing** of the device lifts out the part that
  answer is usually about, beside a card with the appointment to book, its live length and price,
  what happens at it and a Book button that writes the answer into the booking note;
  **appointments & fees** as a fee sheet beside *how a repair is priced* (the appointment → the
  written quote → the repair, only if you say yes); **on the bench, step by step** in five round
  photographs along a focus scale, with an honest note on timing; **your device, your data** (no
  passcode to book, ever); questions and sample policies (labelled); the booking band; the workshop;
  the name set wide in the footer — from 320 px phones to ultrawide monitors, with booking in a sheet
  over the page;
- online booking — **one appointment per booking** (one customer, one device, one service), a day and
  time, contact details and an optional note about the device, and an emailed 6-digit code;
- the owner dashboard at `/admin/` — appointments, services and fees, hours and closures, email
  health, and the website's own text, photos and accent colour.

The look — *Eyepiece*: bench white and bench grey, one eyepiece-black band, one bright accent that
carries ink text (every main button, the reticle marks, the chosen answer, the lifted part); Archivo
set wide for headings with emphasised words in a light italic, Archivo for text and figures, Martian
Mono for small labels; one ornament, the reticle.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.1** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your business. Claude edits a short list of files
(name, city, words, colours) — the booking system, the dashboard and the layout stay as they are.

Appointments, fees, hours and contact details are **not** code: you set them in the dashboard once
the booking backend is connected. The page reads each appointment's kind from the words in its name
(screen · battery · charging · diagnostic · laptop · consultation — see `CUSTOMIZE.md`). **Your own
photographs** go in the dashboard → Website. Each sample photo stays labelled "Sample photo" until
you replace it; never show a customer's screen, messages or data in a photo. Certifications,
warranties and years in business are yours to add if they are true: the starter invents none, and
it never shows a review or a testimonial it doesn't have.

**A booking is one appointment at the bench, not a repair.** The booking engine books single
appointments on one calendar — one technician, one customer, one device, one service, at one
workshop address. What it books is time at the bench: an assessment fee, a starting price for a part,
or a free consultation. Final repair prices and completion times depend on the inspection, the model
and the parts, and are quoted in writing before any work — the site says so everywhere it shows a
price. The engine does not take payments or deposits, track repair status, manage parts or
inventory, keep device accounts, or schedule several technicians (see *What the engine does not do*
in `CLAUDE.md`). The booking form never asks for a passcode.

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key (Windows Command Prompt: copy .env.example .env.local)
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells you
exactly what is left for you to do (your dashboard login and the two email secrets). Full steps:
the Profit Studio guide *Build a Premium Booking Website with Claude Code*, Step 3, or
`node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App** from it
(Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos (`samplePhotos.ts`: the sample photos for the device cards and the bench steps) |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero` with the eyepiece and the live facts, `Repairs`, `Finder` + `ExplodedView` (what's going on with it?), `Fees`, `Bench`, `Care`, `GoodToKnow`, `Visit`…), the ornament pieces (`Reticle.tsx`, `Eyepiece.tsx`, `Mark.tsx`, `SectionLabel.tsx`) and the booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample appointments and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How appointments find their kind (by the words in their names), the part of the drawing each one lifts, how an answer finds its appointment, "Good for:", lengths and what a price means |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5281
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed in [`ASSETS.md`](ASSETS.md)
(the photographs file by file in [`PHOTOS.md`](PHOTOS.md)).
