'use client';

import { createTheme } from '@mui/material/styles';
import palettes from './data/palettes';
import { CORNER_RADII, DEFAULT_CORNERS } from './lib/corners';

// The site's colours: Peacock + copper, from the picker's palettes, chosen
// by the user on 2026-11-21 for anahita.io (anahita-web keeps ink and signal
// red, chosen 2026-10-25). Light or dark is a class on <html>: set from the
// operating system before the page paints (InitColorSchemeScript), then by
// the toggle in the header. A palette from the colour picker takes the place
// of the site's own, in this browser (components/SiteTheme.jsx), and so do
// the corners chosen there: sm, Material UI's own 4 pixels, unless chosen.
export const DEFAULT_PALETTE = palettes.find((each) => each.id === 'peacock-copper');

export const makeTheme = (palette = DEFAULT_PALETTE, corners = CORNER_RADII[DEFAULT_CORNERS]) => createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: { palette: { primary: { main: palette.light.primary }, secondary: { main: palette.light.secondary } } },
    dark: { palette: { primary: { main: palette.dark.primary }, secondary: { main: palette.dark.secondary } } },
  },
  shape: {
    borderRadius: corners,
    borderRadiusSm: CORNER_RADII.sm,
    borderRadiusMd: CORNER_RADII.md,
    borderRadiusLg: CORNER_RADII.lg,
    borderRadiusXl: CORNER_RADII.xl,
  },
  typography: {
    h1: { fontSize: '3rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h2: { fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2 },
    h3: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.3 },
    h4: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.4 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },
  },
});

export default makeTheme();
