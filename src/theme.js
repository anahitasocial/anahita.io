'use client';

import { createTheme } from '@mui/material/styles';

// MUI's default palette until Anahita's own colours are chosen. Light or
// dark is a class on <html>: set from the operating system before the page
// paints (InitColorSchemeScript), then by the toggle in the header.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: { light: true, dark: true },
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
