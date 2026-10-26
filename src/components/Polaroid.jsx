import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// A photo as a Polaroid: a square in a white frame, wider at the bottom,
// where its caption is written; tilted a little, by `tilt` degrees, as if
// laid on the page by hand. The frame stays white in dark mode, as a real
// one would on a dark table.
export default function Polaroid({ src, alt, caption, tilt = 0, sx }) {
  return (
    <Box
      component="figure"
      sx={[
        {
          m: 0,
          p: 1.5,
          pb: 0,
          bgcolor: '#fdfdfb',
          width: '100%',
          maxWidth: 320,
          transform: `rotate(${tilt}deg)`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.12)',
          '.dark &': { bgcolor: '#f2f1ec', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' },
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
        sx={{ color: 'rgba(0,0,0,0.75)', textAlign: 'center', py: 1.5, minHeight: 48 }}
      >
        {caption}
      </Typography>
    </Box>
  );
}
