// How round corners are, by Material UI's names for its shape tokens
// (borderRadiusSm and the others, on its Shape page), in pixels: the five
// steps of the corners slider in the colour picker, as anahita-web has them
// (src/utils/corners.js there). sm is the site's own.
export const CORNER_RADII = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
};

export const DEFAULT_CORNERS = 'sm';

// The most a corner is rounded, in pixels: xl.
export const MAX_CORNER = CORNER_RADII.xl;

// A corner a few times rounder than the theme's, for `sx`, kept to
// MAX_CORNER: at sm three times is 12, but at xl it would be 72. Plain CSS,
// from the theme's own variable, so that a server component may use it too.
const rounder = (times) => `min(calc(var(--mui-shape-borderRadius) * ${times}), ${MAX_CORNER}px)`;

export default rounder;
