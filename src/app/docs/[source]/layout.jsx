import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DocsNav from '../../../components/DocsNav';
import { getPages, getSources } from '../../../lib/docs';

export function generateStaticParams() {
  return getSources().map(({ key }) => ({ source: key }));
}

export default function DocsLayout({ children }) {
  const sources = getSources().map(({ key, title }) => ({
    key,
    title,
    pages: getPages(key).map(({ slug, title: page }) => ({ slug, title: page })),
  }));

  return (
    <Container sx={{ pt: { xs: 2, md: 6 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 6 } }}>
      <Box sx={{ width: { md: 224 }, flexShrink: 0 }}>
        <DocsNav sources={sources} />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>{children}</Box>
    </Container>
  );
}
