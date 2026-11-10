import Box from '@mui/material/Box';

// The band behind a page's hero: a light tint of the primary colour just
// below the top bar, fading to the page's background just below the hero.
// From the theme's own colour, so it follows light, dark and a new palette.
export default function HeroBackground({ component = 'div', children, sx }) {
  return (
    <Box
      component={component}
      sx={[
        {
          background:
            'linear-gradient(to bottom, rgba(var(--mui-palette-primary-mainChannel) / 0.18), rgba(var(--mui-palette-primary-mainChannel) / 0.06) 60%, transparent)',
          '.dark &': {
            background:
              'linear-gradient(to bottom, rgba(var(--mui-palette-primary-mainChannel) / 0.20), rgba(var(--mui-palette-primary-mainChannel) / 0.06) 60%, transparent)',
          },
          pb: { xs: 3, md: 5 },
        },
        sx,
      ]}
    >
      {children}
    </Box>
  );
}
