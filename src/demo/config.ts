import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample business (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 * Sample notes name the device and what is going on — never a passcode, PIN or password.
 */
export const demoConfig: DemoConfig = {
  id: 'device-repair-eyepiece',
  preset: sitePreset,
  business: {
    name: 'Pentalobe Device Repair',
    timezone: 'America/New_York',
    email: 'bench@pentalobe.example',
    phone: '+1 513-555-0162',
    address: '1418 Vine Street (workshop at the back, ring the bell), Cincinnati, OH 45202',
  },
  ownerEmail: 'owner@pentalobe.example',
  referencePrefix: 'PL',
  sampleNotes: [
    'Looking at: Cracked or broken screen — Pixel 7, touch still works at the top.',
    'Battery dies by early afternoon. iPhone 12, bought second-hand.',
    'Looking at: It won’t charge — only charges if I hold the cable at an angle.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Dana Whitfield', email: 'dana.whitfield@example.com', phone: '+1 513 555 0112' },
    { name: 'Marcus Bell', email: 'marcus.bell@example.com', phone: '+1 513 555 0126' },
    { name: 'Aisha Rahman', email: 'aisha.rahman@example.com', phone: '+1 513 555 0133' },
    { name: 'Tomás Herrera', email: 'tomas.herrera@example.com', phone: '+1 513 555 0148' },
    { name: 'Claire Novak', email: 'claire.novak@example.com', phone: '+1 513 555 0150' },
    { name: 'Ben Okafor', email: 'ben.okafor@example.com', phone: '+1 513 555 0161' },
    { name: 'Mei Lin', email: 'mei.lin@example.com', phone: '+1 513 555 0174' },
    { name: 'Gabe Schuster', email: 'gabe.schuster@example.com', phone: '+1 513 555 0187' },
    { name: 'Nora Feld', email: 'nora.feld@example.com', phone: '+1 513 555 0195' },
    { name: 'Isaac Moreno', email: 'isaac.moreno@example.com', phone: '+1 513 555 0109' },
  ],
};
