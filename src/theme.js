'use client';

import { createTheme } from '@mui/material/styles';

// Anahita's colours: ink and signal red, chosen by the user on 2026-10-25
// (shared with anahita-web). Ink matches the black-and-white logo; in dark
// mode it turns to near-white. The red is an accent, used sparingly: red
// also means an error. Light or dark is a class on <html>: set from the
// operating system before the page paints (InitColorSchemeScript), then by
// the toggle in the header.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: { palette: { primary: { main: '#1F2328' }, secondary: { main: '#D62828' } } },
    dark: { palette: { primary: { main: '#E6E8EB' }, secondary: { main: '#E57575' } } },
  },
  shape: { borderRadius: 12 },
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

export default theme;
