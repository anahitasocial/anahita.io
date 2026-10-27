'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ApiOutlined from '@mui/icons-material/ApiOutlined';
import Link from './Link';
import Method from './Method';

// The route being read: the last whose top has passed under the header.
function useReading(pathname) {
  const [reading, setReading] = useState(null);
  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    if (!sections.length) return undefined;
    const update = () => {
      let current = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 120) current = section.id;
        else break;
      }
      setReading(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);
  return reading;
}

const heading = { display: 'block', px: 1.5, pt: 2, pb: 0.5, typography: 'caption', fontWeight: 500, color: 'text.secondary' };

// The reference's services under their groups, and under the service open,
// each of its routes with its method: as Stripe's, so that a route is found
// by looking down one list.
function Services({ groups, onPick }) {
  const pathname = usePathname();
  const reading = useReading(pathname);
  const item = (href, label, selected) => (
    <ListItemButton component={Link} href={href} selected={selected} onClick={onPick} sx={{ borderRadius: 2, px: 1.5 }}>
      <ListItemText primary={label} />
    </ListItemButton>
  );

  return (
    <List dense disablePadding>
      <Box component="li" sx={{ listStyle: 'none' }}>{item('/api/', 'Overview', pathname === '/api/')}</Box>
      {groups.map(({ name, services }) => (
        <Box key={name} component="li" sx={{ listStyle: 'none' }}>
          <Box component="span" sx={heading}>{name}</Box>
          <List dense disablePadding>
            {services.map(({ slug, title, routes }) => {
              const href = `/api/${slug}/`;
              const open = pathname === href;
              return (
                <Box key={slug} component="li" sx={{ listStyle: 'none' }}>
                  {item(href, title, open)}
                  {open && (
                    <List dense disablePadding sx={{ mb: 1 }}>
                      {routes.map(({ id, method, summary }) => (
                        <Box key={id} component="li" sx={{ listStyle: 'none' }}>
                          <ListItemButton
                            component="a"
                            href={`#${id}`}
                            title={summary}
                            selected={reading === id}
                            onClick={onPick}
                            sx={{ borderRadius: 2, pl: 3, pr: 1.5, py: 0.25, gap: 1, alignItems: 'baseline' }}
                          >
                            <Method method={method} />
                            <ListItemText
                              primary={summary}
                              slotProps={{ primary: { variant: 'body2', color: 'text.secondary', noWrap: true } }}
                            />
                          </ListItemButton>
                        </Box>
                      ))}
                    </List>
                  )}
                </Box>
              );
            })}
          </List>
        </Box>
      ))}
      <Box component="li" sx={{ listStyle: 'none' }}>
        <Box component="span" sx={heading}>Reference</Box>
        {item('/api/shapes/', 'Shapes', pathname === '/api/shapes/')}
      </Box>
    </List>
  );
}

export default function ApiNav({ groups }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        component="nav"
        aria-label="API"
        data-pagefind-ignore
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 88,
          maxHeight: 'calc(100vh - 104px)',
          overflowY: 'auto',
        }}
      >
        <Services groups={groups} />
      </Box>
      <Box sx={{ display: { md: 'none' } }} data-pagefind-ignore>
        <Button onClick={() => setOpen(true)} startIcon={<ApiOutlined />} color="inherit" sx={{ color: 'text.secondary' }}>
          Services
        </Button>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 288, p: 2 }}>
            <Services groups={groups} onPick={() => setOpen(false)} />
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
