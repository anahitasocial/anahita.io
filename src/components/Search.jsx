'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';

// Search through Pagefind: `yarn build` indexes the finished pages into
// out/pagefind/, and the visitor's browser searches that index. Nothing is
// sent anywhere. In `yarn dev` there is no index yet, and the dialog says so.
let pagefind;
async function loadPagefind() {
  if (!pagefind) {
    const url = '/pagefind/pagefind.js';
    pagefind = import(/* webpackIgnore: true */ /* turbopackIgnore: true */ url).then(
      async (module) => {
        await module.options({ excerptLength: 24 });
        return module;
      },
    );
  }
  return pagefind;
}

function Results({ query, onPick }) {
  const [results, setResults] = useState([]);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let current = true;
    (async () => {
      try {
        const module = await loadPagefind();
        const search = await module.debouncedSearch(query, {}, 200);
        if (search === null || !current) return;
        const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
        if (current) setResults(data);
      } catch {
        pagefind = undefined;
        if (current) setMissing(true);
      }
    })();
    return () => {
      current = false;
    };
  }, [query]);

  if (missing) {
    return <Message>Search works on the built site, after yarn build.</Message>;
  }
  if (!query.trim()) {
    return <Message>Search the docs, the FAQ and the blog.</Message>;
  }
  if (results.length === 0) {
    return <Message>Nothing found.</Message>;
  }
  return (
    <List>
      {results.map((result) => (
        <ListItemButton
          key={result.url}
          onClick={() => onPick(result.url)}
          sx={{ display: 'block', borderRadius: 2, mx: 1 }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {result.meta.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            // Pagefind's excerpt marks the words found with <mark>.
            dangerouslySetInnerHTML={{ __html: result.excerpt }}
            sx={{ '& mark': { bgcolor: 'transparent', color: 'primary.main', fontWeight: 500 } }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}

function Message({ children }) {
  return (
    <Typography variant="body2" color="text.secondary" sx={{ p: 3 }}>
      {children}
    </Typography>
  );
}

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const phone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const pick = (url) => {
    close();
    router.push(url);
  };

  return (
    <>
      <ButtonBase
        onClick={() => setOpen(true)}
        aria-label="Search"
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 1,
          width: 192,
          height: 36,
          px: 1.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          color: 'text.secondary',
          justifyContent: 'flex-start',
        }}
      >
        <SearchIcon fontSize="small" />
        <Typography variant="body2" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Search
        </Typography>
        <Typography variant="caption">⌘K</Typography>
      </ButtonBase>
      <IconButton
        aria-label="Search"
        onClick={() => setOpen(true)}
        sx={{ display: { md: 'none' }, color: 'text.secondary' }}
      >
        <SearchIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={close}
        fullScreen={phone}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { height: { sm: '60vh' }, alignSelf: { sm: 'flex-start' }, mt: { sm: 12 } } } }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <TextField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            fullWidth
            autoFocus
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: phone && (
                  <InputAdornment position="end">
                    <ButtonBase onClick={close} sx={{ typography: 'body2', color: 'primary.main' }}>
                      Cancel
                    </ButtonBase>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          {open && <Results query={query} onPick={pick} />}
        </Box>
      </Dialog>
    </>
  );
}
