import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// The frame: white, wider at the bottom, with a soft shadow, and white in
// dark mode too, as a real one would be on a dark table. Every picture on
// the site is shown in one (the user, 2026-11-16): here, a post's card
// (blog/[slug]/page.jsx) and a picture in a post (Prose.jsx).
export const polaroidFrame = {
  p: 1.5,
  pb: 0,
  bgcolor: '#fdfdfb',
  boxShadow: '0 1px 2px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.12)',
  '.dark &': { bgcolor: '#f2f1ec', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' },
};

// What is written under a picture, or the frame's wide bottom without words.
export const polaroidCaption = {
  color: 'rgba(0,0,0,0.75)',
  textAlign: 'center',
  py: 1.5,
  minHeight: 48,
};

// A photo as a Polaroid: a square in the frame, its caption written in the
// wide bottom; tilted a little, by `tilt` degrees, as if laid on the page by
// hand.
export default function Polaroid({ src, alt, caption, tilt = 0, sx }) {
  return (
    <Box
      component="figure"
      sx={[
        {
          ...polaroidFrame,
          m: 0,
          width: '100%',
          maxWidth: 320,
          transform: `rotate(${tilt}deg)`,
        },
        sx,
      ]}
    >
      <Box
        component="img"
        src={`${src}-600.webp`}
        srcSet={`${src}-300.webp 300w, ${src}-600.webp 600w`}
        sizes="(max-width: 600px) 80vw, 320px"
        alt={alt}
        loading="lazy"
        width={600}
        height={600}
        sx={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1' }}
      />
      <Typography
        component="figcaption"
        variant="body2"
        sx={polaroidCaption}
      >
        {caption}
      </Typography>
    </Box>
  );
}
