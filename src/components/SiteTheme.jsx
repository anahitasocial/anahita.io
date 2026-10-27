'use client';

import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme } from '../theme';
import { palettes } from '../data/palettes';
import ColourPicker from './ColourPicker';

const KEY = 'anahita-palette';

// The colour picker is for the dev server alone, while the colours are tried
// again; elsewhere the site is in Anahita's own.
const picking = process.env.NODE_ENV === 'development';

// The theme, in the palette chosen in this browser on the dev server, or in
// Anahita's own. The page is first drawn in Anahita's, then in the one
// chosen, once the browser has said which.
export default function SiteTheme({ children }) {
  const [palette, setPalette] = useState(undefined);

  useEffect(() => {
    if (!picking) return;
    try {
      const id = window.localStorage.getItem(KEY);
      setPalette(palettes.find((each) => each.id === id));
    } catch {
      // No storage: Anahita's own.
    }
  }, []);

  const theme = useMemo(() => makeTheme(palette), [palette]);

  const choose = (chosen) => {
    setPalette(chosen);
    try {
      if (chosen) window.localStorage.setItem(KEY, chosen.id);
      else window.localStorage.removeItem(KEY);
    } catch {
      // Not remembered, which is all.
    }
  };

  return (
    // Nothing of the light or dark mode is stored: every visit starts from
    // the system's setting.
    <ThemeProvider theme={theme} storageManager={null} disableTransitionOnChange>
      {children}
      {picking && <ColourPicker current={palette} onChoose={choose} />}
    </ThemeProvider>
  );
}
