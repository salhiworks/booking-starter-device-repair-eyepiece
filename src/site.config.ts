/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (appointments, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Pentalobe Device Repair',
  /** IANA time zone of the business. */
  timezone: 'America/New_York',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'bench@pentalobe.example',
    phone: '+1 513-555-0162',
    address: '1418 Vine Street (workshop at the back, ring the bell), Cincinnati, OH 45202',
  },
};
