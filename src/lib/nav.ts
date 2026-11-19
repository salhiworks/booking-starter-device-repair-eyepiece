/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#repairs', label: 'What we repair' },
  { href: '#find', label: 'What to book' },
  { href: '#fees', label: 'Fees' },
  { href: '#bench', label: 'How it works' },
  { href: '#data', label: 'Your data', header: false },
  { href: '#questions', label: 'Before you book', header: false },
  { href: '#visit', label: 'Workshop' },
];
