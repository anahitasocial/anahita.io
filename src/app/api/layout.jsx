import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ApiNav from '../../components/ApiNav';
import { getApi } from '../../lib/api';

// The reference beside its list of services, as wide as the docs, so that
// it lines up with the header; each route is two columns, what it is and
// its code.
export default function ApiLayout({ children }) {
  const api = getApi();
  const groups = (api?.groups || []).map(({ name, services }) => ({
    name,
    services: services.map(({ slug, title, routes }) => ({
      slug,
      title,
      routes: routes.map(({ id, method, summary }) => ({ id, method, summary })),
    })),
  }));

  return (
    <Container sx={{ pt: { xs: 2, md: 6 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 6 } }}>
      <Box sx={{ width: { md: 224 }, flexShrink: 0 }}>
        <ApiNav groups={groups} />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>{children}</Box>
    </Container>
  );
}
