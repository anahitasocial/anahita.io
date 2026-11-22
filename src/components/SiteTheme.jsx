'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme } from '../theme';
import palettes from '../data/palettes';
import { CORNER_RADII, DEFAULT_CORNERS_MOBILE } from '../lib/corners';

// The same keys as anahita-web's, though the two are on different sites and
// each browser keeps its own.
const KEY = 'anahita-palette';
const CORNERS_KEY = 'anahita-corners';

// The palette and the corners chosen, and choosing them, for the colour
// picker in the header. Undefined is the site's own: Peacock + copper, and
// sm, or md on a mobile (theme.js, and below).
export const PaletteContext = createContext({
  palette: undefined, choose: () => {}, corners: undefined, chooseCorners: () => {},
});
export const usePalette = () => useContext(PaletteContext);

const remember = (key, value) => {
  try {
    if (value) window.localStorage.setItem(key, value);
    else window.localStorage.removeItem(key);
  } catch {
    // Not remembered, which is all.
  }
};

// The theme, in the palette and corners chosen in this browser, or in the
// site's own. The page is first drawn in the site's, then in those chosen,
// once the browser has said which.
export default function SiteTheme({ children }) {
  const [palette, setPalette] = useState(undefined);
  // The corners' name: none, sm, md, lg or xl.
  const [corners, setCorners] = useState(undefined);

  useEffect(() => {
    try {
      const id = window.localStorage.getItem(KEY);
      setPalette(palettes.find((each) => each.id === id));
      const name = window.localStorage.getItem(CORNERS_KEY);
      setCorners(Object.hasOwn(CORNER_RADII, name) ? name : undefined);
    } catch {
      // No storage: the site's own.
    }
  }, []);

  const theme = useMemo(
    () => makeTheme(palette, corners === undefined ? undefined : CORNER_RADII[corners]),
    [palette, corners],
  );
  const value = useMemo(() => ({
    palette,
    choose: (chosen) => {
      setPalette(chosen);
      remember(KEY, chosen && chosen.id);
    },
    corners,
    chooseCorners: (name) => {
      setCorners(name);
      remember(CORNERS_KEY, name);
    },
  }), [palette, corners]);

  return (
    // Nothing of the light or dark mode is stored: every visit starts from
    // the system's setting.
    <ThemeProvider theme={theme} storageManager={null} disableTransitionOnChange>
      {/* The site's own corners are rounder on a mobile, md below 600
          pixels: the theme's corner variable, set again there, in CSS so
          that nothing changes after the page is drawn. Not once somebody
          has chosen their own, which are for every screen. */}
      {corners === undefined && (
        <GlobalStyles
          styles={{
            '@media (max-width: 599.95px)': {
              ':root:root': { '--mui-shape-borderRadius': `${CORNER_RADII[DEFAULT_CORNERS_MOBILE]}px` },
            },
          }}
        />
      )}
      <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
    </ThemeProvider>
  );
}
