'use client';

import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

// Switches between light and dark. It starts from the system's setting on
// every visit, and remembers nothing.
export default function ModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const current = mode === 'system' ? systemMode : mode;
  const next = current === 'dark' ? 'light' : 'dark';

  return (
    <IconButton
      aria-label={next === 'dark' ? 'Dark mode' : 'Light mode'}
      onClick={() => setMode(next)}
      disabled={!current}
      sx={{ color: 'text.secondary' }}
    >
      {current === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
}
