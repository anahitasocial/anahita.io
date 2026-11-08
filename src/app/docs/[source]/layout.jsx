import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DocsNav from '../../../components/DocsNav';
import { recipes } from '../../../data/docs';
import { getPages, getSources } from '../../../lib/docs';

export function generateStaticParams() {
  return getSources().map(({ key }) => ({ source: key }));
}

// The recipes there are, at the end of the server's Start here: a site
// ready to run is where most begin. They open on GitHub.
const START = 'Start here';
const recipeLinks = recipes
  .filter(({ href }) => href)
  .map(({ title, href }) => ({ href, title: `${title} recipe`, group: START }));

function withRecipes(key, pages) {
  const last = pages.map(({ group }) => group).lastIndexOf(START);
  if (key !== 'services' || last < 0) {
    return pages;
  }
  return [...pages.slice(0, last + 1), ...recipeLinks, ...pages.slice(last + 1)];
}

export default function DocsLayout({ children }) {
  const sources = getSources().map(({ key, title, side }) => ({
    key,
    title,
    side,
    pages: withRecipes(key, getPages(key).map(({ slug, title: page, group }) => ({ slug, title: page, group }))),
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
