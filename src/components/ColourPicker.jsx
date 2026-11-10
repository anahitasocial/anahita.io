'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Portal from '@mui/material/Portal';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import palettes from '../data/palettes';
import { usePalette } from './SiteTheme';

// The colour picker, as anahita-web has it (src/components/ColourPicker.jsx
// there): the button beside the light and dark one, showing the colours in
// use in one circle, and the palettes as rows of
// swatches under their groups. On a wider screen a small card under the
// button; on a mobile a sheet across the bottom, so that the page above it
// shows what each does. The one chosen is the site's colours at once, in
// light mode and dark, kept in this browser; Reset goes back to Anahita's.

// The palettes under their groups (Bauhaus, Mid-Century…), in the order of
// the list.
const groups = palettes.reduce((all, palette) => {
  const last = all[all.length - 1];
  if (last && last.name === palette.group) last.palettes.push(palette);
  else all.push({ name: palette.group, palettes: [palette] });
  return all;
}, []);

// A palette's two colours in one circle, split on the diagonal.
function Swatch({ palette, size }) {
  const { primary, secondary } = palette.light;
  return (
    <Box
      component="span"
      sx={{
        display: 'block',
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${primary} 50%, ${secondary} 50%)`,
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.08)',
      }}
    />
  );
}

function Palettes({ current, choose, onClose, mobile }) {
  const size = mobile ? 40 : 32;
  return (
    <Box sx={mobile ? { maxHeight: '50vh', display: 'flex', flexDirection: 'column' } : { width: 304 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 2, pr: 1, pt: 1 }}>
        <Typography variant="subtitle1" noWrap sx={{ flexGrow: 1, minWidth: 0, fontWeight: 500 }}>
          {current ? current.name : 'Anahita’s colours'}
        </Typography>
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ overflowY: mobile ? 'auto' : 'visible', px: 2 }}>
        {groups.map((group) => (
          <Box key={group.name} sx={{ mt: 1 }}>
            <Typography variant="overline" color="text.secondary" component="p" sx={{ lineHeight: 2 }}>
              {group.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: mobile ? 'flex-start' : 'space-between',
                overflowX: mobile ? 'auto' : 'visible',
                py: 1,
                px: 1,
              }}
            >
              {group.palettes.map((palette) => {
                const selected = Boolean(current) && current.id === palette.id;
                const swatch = (
                  <ButtonBase
                    key={palette.id}
                    aria-label={palette.name}
                    aria-pressed={selected}
                    onClick={() => choose(palette)}
                    sx={{
                      borderRadius: '50%',
                      flexShrink: 0,
                      outline: selected ? 2 : 0,
                      outlineColor: 'text.primary',
                      outlineOffset: 3,
                    }}
                  >
                    <Swatch palette={palette} size={size} />
                  </ButtonBase>
                );
                return mobile ? swatch : (
                  <Tooltip key={palette.id} title={palette.name} placement="top">
                    {swatch}
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1, py: 1 }}>
        <Button size="small" onClick={() => choose(undefined)} disabled={!current}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default function ColourPicker() {
  const { palette, choose } = usePalette();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const close = () => setAnchor(null);

  // Outside clicks close it from just after it opens: the click that opened
  // it is still on its way to the page when it opens, and would close it.
  const [listening, setListening] = useState(false);
  useEffect(() => {
    if (!open) {
      setListening(false);
      return undefined;
    }
    const timer = setTimeout(() => setListening(true), 0);
    return () => clearTimeout(timer);
  }, [open]);

  const body = (
    <ClickAwayListener onClickAway={listening ? close : () => {}}>
      <Box sx={{ display: 'contents' }}>
        <Palettes current={palette} choose={choose} onClose={close} mobile={mobile} />
      </Box>
    </ClickAwayListener>
  );

  return (
    <>
      <IconButton
        aria-label="Colours"
        aria-expanded={open}
        onClick={(event) => setAnchor(open ? null : event.currentTarget)}
        sx={{ color: 'text.secondary' }}
      >
        {/* The colours in use, Anahita's or those chosen, in one circle, as
            each palette is shown below. */}
        <Box
          component="span"
          aria-hidden
          sx={(theme) => ({
            display: 'block',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${(theme.vars || theme).palette.primary.main} 50%, ${(theme.vars || theme).palette.secondary.main} 50%)`,
            boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.08)',
          })}
        />
      </IconButton>
      {mobile ? (
        // Out of the header, whose blur makes it the frame of anything fixed
        // inside it: the sheet is across the bottom of the screen.
        <Portal>
        <Drawer
          anchor="bottom"
          variant="persistent"
          open={open}
          slotProps={{
            paper: { sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.12)' } },
          }}
        >
          {body}
        </Drawer>
        </Portal>
      ) : (
        <Popper
          open={open}
          anchorEl={anchor}
          placement="bottom-end"
          modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
          sx={{ zIndex: (theme) => theme.zIndex.modal }}
        >
          <Paper elevation={0} sx={{ borderRadius: 3, border: 1, borderColor: 'divider', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)' }}>
            {body}
          </Paper>
        </Popper>
      )}
    </>
  );
}
