import type { Preset } from '@profitstudio/booking-engine';

/**
 * Pentalobe Device Repair's own preset (INTEGRATION.md §5): the sample appointments, hours and policies
 * preview mode shows, and the starter set the dashboard offers an owner who has no services yet
 * (<BookingAdmin presets>). Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE appointment at the workshop bench: a reserved block of the
 * one technician's time, for ONE customer and ONE device, for one service, on the business's one
 * calendar, at the workshop's fixed address. Its length is the time on the bench with the customer;
 * the buffer after it is the bench cleared and the notes written. A repair is NOT promised to finish
 * inside the appointment: some do (a battery in stock, a port that only needed cleaning); others need a
 * part ordered or a longer test, and the quote says when.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of THAT appointment, paid at the
 * workshop — never online, no deposits. A fixed price is an assessment fee (the inspection and a
 * written quote); a "from" price is a starting price for a part fitted at the appointment, confirmed
 * before any work; free is a consultation. The final price of a repair depends on the device model, the
 * part and what the inspection finds, and is always quoted before any work.
 *
 * Honest repair: a description says what the appointment DOES, never what a repair WILL achieve — no
 * guaranteed fixes, no invented warranties, certifications or reviews. A description may end with
 * "Good for: …" — the situation it usually suits. The website shows it as its own line.
 *
 * The website reads each appointment's KIND (screen · battery · port · diagnostic · laptop · consult)
 * from its name (src/lib/services.ts) — to group the booking sheet, to lift the right part of the
 * exploded drawing and to link the "What's going on with it?" answers to an appointment.
 */
export const sitePreset = {
  id: 'device-repair',
  label: 'Phone & Device Repair Studio',
  terminology: { customer: 'customer', customers: 'customers', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Device Repair',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 513-555-0100',
      address: '100 Example Street, Cincinnati, OH',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 120,
    maxAdvanceDays: 30,
    autoConfirm: true,
    requirePhone: true,
    pendingHoldMinutes: 720,
    verificationWindowMinutes: 15,
  },
  // One technician, one bench: Tuesday to Saturday, a late Thursday for after work; closed Sunday and
  // Monday (parts orders and bench maintenance).
  workingHours: [
    { weekday: 2, start: '10:00', end: '18:00' },
    { weekday: 3, start: '10:00', end: '18:00' },
    { weekday: 4, start: '12:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '18:00' },
    { weekday: 6, start: '10:00', end: '16:00' },
  ],
  services: [
    {
      name: 'Phone Screen Repair Assessment',
      description:
        'We check the glass, the display underneath and the touch, confirm your exact model and look up the part. You leave with a written quote and a time. When the part is in stock, many screen repairs can be done the same day; otherwise we order it and book you back in. The assessment fee comes off the repair if you go ahead. Good for: cracked glass, lines or patches on the display, touch that stops working',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 2500,
      priceFrom: false,
    },
    {
      name: 'Battery Replacement Appointment',
      description:
        'A quick check that the battery is the problem, then a new battery fitted and tested while you wait, if one for your model is in stock. The final price depends on the model and the battery, and is confirmed before we start. If we need to order the part, you pay nothing today and we book you back in. Good for: a phone that dies by lunchtime, a battery that has started to swell',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 6900,
      priceFrom: true,
    },
    {
      name: 'Charging Port Diagnosis',
      description:
        'We look into the port under magnification, clean out lint and debris and test it with a known-good cable. Cleaning alone often fixes it. If the port itself has failed, you get a written quote for replacing it. Good for: a loose cable, charging only at an angle, not charging at all',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 2500,
      priceFrom: false,
    },
    {
      name: 'Device Diagnostic Appointment',
      description:
        'For a phone or tablet that won’t turn on, got wet, took a fall or behaves oddly. We open it, inspect it under the microscope and tell you plainly what we find, what a repair would involve and whether it is worth doing. Written findings and quote; the fee comes off the repair if you go ahead. Good for: water and drop damage, a device that won’t power on',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 4500,
      priceFrom: false,
    },
    {
      name: 'Laptop Diagnostic Appointment',
      description:
        'For a laptop that won’t start, runs hot, has a failing keyboard, hinge or battery, or a cracked screen. We test it with you, open it if needed and give you written findings and a quote. Some faults need a longer test — we will say so before keeping the laptop. Good for: laptops that won’t boot, overheat or have a damaged screen',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 5900,
      priceFrom: false,
    },
    {
      name: 'Device Repair Consultation',
      description:
        'Not sure it is worth fixing, or which appointment to book? Bring the device for a short look and an honest opinion — nothing is opened. Good for: deciding between repairing and replacing, second opinions',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 0,
      priceFrom: false,
    },
  ],
} satisfies Preset;
