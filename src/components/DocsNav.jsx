'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import Link from './Link';

// The pages of every source, one flat list under each source's name. Beside
// the page on wide screens; from a button above it on narrow ones.
function Pages({ sources, onPick }) {
  const pathname = usePathname();

  return (
    <List dense disablePadding>
      {sources.map(({ key, title, side, pages }) => (
        <Box key={key} component="li" sx={{ listStyle: 'none', mb: 2 }}>
          <List dense disablePadding>
            <ListSubheader disableSticky sx={{ bgcolor: 'transparent', px: 1.5, lineHeight: '20px', pb: 1 }}>
              <Box component="span" sx={{ display: 'block', typography: 'overline', color: 'primary.main', lineHeight: 2 }}>
                {side}
              </Box>
              {title}
            </ListSubheader>
            {[{ href: `/docs/${key}/`, title: 'Overview' }, ...pages.map((page) => ({ href: `/docs/${key}/${page.slug}/`, title: page.title }))].map(
              ({ href, title: label }) => (
                <ListItemButton
                  key={href}
                  component={Link}
                  href={href}
                  selected={pathname === href}
                  onClick={onPick}
                  sx={{ borderRadius: 2, px: 1.5 }}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              ),
            )}
          </List>
        </Box>
      ))}
    </List>
  );
}

export default function DocsNav({ sources }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        component="nav"
        aria-label="Docs"
        data-pagefind-ignore
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 88,
          maxHeight: 'calc(100vh - 104px)',
          overflowY: 'auto',
        }}
      >
        <Pages sources={sources} />
      </Box>
      <Box sx={{ display: { md: 'none' } }} data-pagefind-ignore>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<MenuBookOutlined />}
          color="inherit"
          sx={{ color: 'text.secondary' }}
        >
          Pages
        </Button>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 288, p: 2 }}>
            <Pages sources={sources} onPick={() => setOpen(false)} />
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
