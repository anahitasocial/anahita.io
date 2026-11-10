'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme } from '../theme';
import palettes from '../data/palettes';

// The same key as anahita-web's, though the two are on different sites and
// each browser keeps its own.
const KEY = 'anahita-palette';

// The palette chosen, and choosing one, for the colour picker in the header.
export const PaletteContext = createContext({ palette: undefined, choose: () => {} });
export const usePalette = () => useContext(PaletteContext);

// The theme, in the palette chosen in this browser, or in Anahita's own. The
// page is first drawn in Anahita's, then in the one chosen, once the browser
// has said which.
export default function SiteTheme({ children }) {
  const [palette, setPalette] = useState(undefined);

  useEffect(() => {
    try {
      const id = window.localStorage.getItem(KEY);
      setPalette(palettes.find((each) => each.id === id));
    } catch {
      // No storage: Anahita's own.
    }
  }, []);

  const theme = useMemo(() => makeTheme(palette), [palette]);
  const value = useMemo(() => ({
    palette,
    choose: (chosen) => {
      setPalette(chosen);
      try {
        if (chosen) window.localStorage.setItem(KEY, chosen.id);
        else window.localStorage.removeItem(KEY);
      } catch {
        // Not remembered, which is all.
      }
    },
  }), [palette]);

  return (
    // Nothing of the light or dark mode is stored: every visit starts from
    // the system's setting.
    <ThemeProvider theme={theme} storageManager={null} disableTransitionOnChange>
      <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
    </ThemeProvider>
  );
}
