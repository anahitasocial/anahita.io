import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Icon from '../../components/Icon';
import Link from '../../components/Link';
import { groupIcons } from '../../data/docs';
import WrittenBy from '../../components/WrittenBy';
import { getApi } from '../../lib/api';

export const metadata = {
  title: 'API reference',
  description: "Every route of Anahita's API: what it takes, what it answers, and who may call it.",
};

// What is true of every route, each in a line, with the page that says it in
// full.
const basics = [
  { title: 'Signing in', text: 'An access token from OAuth 2.0, sent as a bearer token.', href: '/docs/services/oauth/' },
  { title: 'Reading and writing', text: 'JSON, snake_case names, numbers for ids, times in UTC.', href: '/docs/services/api/#reading-and-writing' },
  { title: 'Lists', text: 'Paged by offset and limit, with the total beside.', href: '/docs/services/api/#lists' },
  { title: 'Refusals', text: 'A status, and a word that says why.', href: '/docs/services/api/#refusals' },
];

export default function Api() {
  const api = getApi();
  if (!api) notFound();

  return (
    <Box sx={{ maxWidth: 960 }}>
      <Typography variant="body2" color="text.secondary">
        Anahita Services
      </Typography>
      <Typography variant="h1" sx={{ mt: 1, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
        API reference
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
        Every route of every service, made from the code: what it takes, what it answers, and who may call it. Each
        installation has its own address; here it is <code>https://{api.server}</code>. Tools that read OpenAPI can
        take it all as one file,{' '}
        <MuiLink href="/api/anahita.json" underline="hover">
          anahita.json
        </MuiLink>
        .
      </Typography>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {basics.map(({ title, text, href }) => (
          <Grid key={title} size={{ xs: 12, sm: 6, md: 3 }}>
            <MuiLink component={Link} href={href} underline="none" color="inherit" sx={{ display: 'block', height: '100%' }}>
              <Card sx={{ height: '100%', '&:hover': { borderColor: 'text.secondary' } }}>
                <CardContent>
                  <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 500 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {text}
                  </Typography>
                </CardContent>
              </Card>
            </MuiLink>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {api.groups.map(({ name, services }) => (
          <Grid key={name} size={{ xs: 12, sm: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
                  {groupIcons[name] && <Icon name={groupIcons[name]} />}
                  <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {name}
                  </Typography>
                </Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1 }}>
                  {services.map(({ slug, title, routes }) => (
                    <Box key={slug} component="li" sx={{ display: 'flex', alignItems: 'baseline', gap: 1, py: 0.5 }}>
                      <MuiLink component={Link} href={`/api/${slug}/`} variant="body2" underline="hover">
                        {title}
                      </MuiLink>
                      <Typography variant="caption" color="text.secondary">
                        {routes.length}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <WrittenBy sx={{ mt: 6 }} />
    </Box>
  );
}
