import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Archivo (variable: weight 100–900 AND width 62–125 %, with italics): headings set wide, reading text
// and every figure. Martian Mono: the small labels (callout numbers, kinds, captions).
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/archivo/wdth-italic.css';
import '@fontsource-variable/martian-mono';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
