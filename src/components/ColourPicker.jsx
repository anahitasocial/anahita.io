'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import PaletteOutlined from '@mui/icons-material/PaletteOutlined';
import Check from '@mui/icons-material/Check';
import { palettes } from '../data/palettes';

// The palettes under their groups (Bauhaus, Mid-Century…), in the order of
// the list.
const groups = palettes.reduce((all, palette) => {
  const last = all[all.length - 1];
  if (last && last.name === palette.group) last.palettes.push(palette);
  else all.push({ name: palette.group, palettes: [palette] });
  return all;
}, []);

// A palette's two colours in one circle, split on the diagonal.
function Swatch({ palette }) {
  const { primary, secondary } = palette.light;
  return (
    <Box
      component="span"
      sx={{
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${primary} 50%, ${secondary} 50%)`,
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.08)',
      }}
    />
  );
}

// Anahita's colours tried again, on the dev server only: a quiet button at
// the bottom right (Next.js' own is at the bottom left) opens the palettes,
// under their groups, and the one chosen is the site's colours at once, in
// light mode and dark, kept in this browser (SiteTheme).
export default function ColourPicker({ current, onChoose }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <IconButton
          aria-label="Colours"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: 40,
            height: 40,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            border: 1,
            borderColor: 'divider',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            '&:hover': { bgcolor: 'background.paper', color: 'text.primary' },
          }}
        >
          <PaletteOutlined fontSize="small" />
        </IconButton>
      )}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} slotProps={{ backdrop: { invisible: true } }}>
        <Box sx={{ width: 360, maxWidth: '100vw', px: 2, pt: 3, pb: 2 }} data-pagefind-ignore>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Colours
            </Typography>
            <Button size="small" onClick={() => onChoose(undefined)} disabled={!current}>
              Default
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1, mb: 2 }}>
            Tried in this browser alone, and kept here until you change them.
          </Typography>
          {groups.map((group) => (
            <List
              key={group.name}
              dense
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ px: 1, pt: 2, bgcolor: 'transparent', lineHeight: '24px', typography: 'overline', color: 'text.secondary' }}
                >
                  {group.name}
                </ListSubheader>
              }
            >
              {group.palettes.map((palette) => {
                const selected = current?.id === palette.id;
                return (
                  <ListItemButton
                    key={palette.id}
                    selected={selected}
                    onClick={() => onChoose(palette)}
                    sx={{ gap: 1.5, borderRadius: 2, px: 1, py: 1 }}
                  >
                    <Swatch palette={palette} />
                    <ListItemText primary={palette.name} slotProps={{ primary: { noWrap: true } }} sx={{ minWidth: 0, my: 0 }} />
                    {selected && <Check fontSize="small" color="primary" />}
                  </ListItemButton>
                );
              })}
            </List>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
