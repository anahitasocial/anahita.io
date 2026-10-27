'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import Link from './Link';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import Search from './Search';
import { navigation, site } from '../data/site';

export default function Header({ api = false }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href) => pathname.startsWith(href);
  const links = navigation.filter(({ needs }) => !needs || (needs === 'api' && api));

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: 'rgba(var(--mui-palette-background-defaultChannel) / 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Box component="nav" sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, mr: 1 }}>
            {links.map(({ label, href }) => (
              <Button
                key={href}
                component={Link}
                href={href}
                color="inherit"
                aria-current={isCurrent(href) ? 'page' : undefined}
                sx={{
                  minWidth: 0,
                  px: 1.5,
                  color: isCurrent(href) ? 'text.primary' : 'text.secondary',
                  // The page you are on: a short line under its name, in the
                  // secondary colour, on the bar's own bottom edge.
                  '&[aria-current="page"]::after': {
                    content: '""',
                    position: 'absolute',
                    left: 12,
                    right: 12,
                    bottom: -14,
                    height: 2,
                    borderRadius: 1,
                    bgcolor: 'secondary.main',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Search />
          <ModeToggle />
          <IconButton href={site.github} aria-label="GitHub" sx={{ color: 'text.secondary' }}>
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="Menu"
            onClick={() => setOpen(true)}
            sx={{ display: { sm: 'none' }, color: 'text.secondary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <Container>
          <Toolbar disableGutters>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton aria-label="Close" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Container>
        <List sx={{ pb: 2 }}>
          {links.map(({ label, href }) => (
            <ListItemButton
              key={href}
              component={Link}
              href={href}
              selected={isCurrent(href)}
              onClick={() => setOpen(false)}
              sx={{ px: 2 }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
