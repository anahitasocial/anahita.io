import Box from '@mui/material/Box';

// The short line between a hero's title and the line under it, in the
// secondary colour: signal red, lighter in dark mode. As the link cards
// shared elsewhere have it (anahita-web's statics/media/ogimage.jpg).
export default function HeroRule() {
  return <Box aria-hidden sx={{ width: 96, height: 2, bgcolor: 'secondary.main', mt: 3 }} />;
}
