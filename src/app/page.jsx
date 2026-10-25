import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '../components/Icon';
import Link from '../components/Link';
import Section from '../components/Section';
import { audiences, features, promises } from '../data/home';
import { site } from '../data/site';

export default function Home() {
  return (
    <>
      <Container component="section" sx={{ pt: { xs: 10, md: 16 } }}>
        <Box sx={{ maxWidth: 760 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}
          >
            A social network your organisation owns.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 3, fontSize: { xs: '1.125rem', md: '1.25rem' }, maxWidth: 640 }}
          >
            Anahita is open-source social software for your own community:
            people, groups, events, articles, photos and videos, in a calm,
            chronological feed. It connects to the fediverse and to Bluesky.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 5 }} data-pagefind-ignore>
            <Button component={Link} href="/docs/" variant="contained" size="large">
              Get started
            </Button>
            <Button href={site.github} variant="outlined" size="large">
              GitHub
            </Button>
          </Stack>
        </Box>
      </Container>

      <Section>
        <Grid container spacing={3}>
          {promises.map(({ icon, title, text }) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <Icon name={icon} />
              <Typography variant="h4" component="h2" sx={{ mt: 1 }}>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        title="Everything a community needs"
        subtitle="One install, not a different server for each kind of post."
      >
        <Grid container spacing={2}>
          {features.map(({ icon, title, text }) => (
            <Grid key={title} size={{ xs: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Icon name={icon} />
                  <Typography variant="subtitle1" component="h3" sx={{ mt: 1, fontWeight: 500 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        title="Made for the people leaving Meta and X"
        subtitle="Organisations that need a place of their own, and a voice on the open web."
      >
        <Grid container spacing={3}>
          {audiences.map(({ title, text }) => (
            <Grid key={title} size={{ xs: 12, sm: 6, md: 'grow' }}>
              <Box sx={{ borderTop: 2, borderColor: 'primary.main', pt: 2 }}>
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 500 }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        title="Part of the open social web"
        subtitle="Anahita speaks ActivityPub, the language of Mastodon, Pixelfed and the rest of the fediverse, and the AT Protocol of Bluesky. Federation is opt-in for each profile: sharing is consented to, never assumed."
      >
        <Button component={Link} href="/faq/" variant="outlined" data-pagefind-ignore>
          Read the FAQ
        </Button>
      </Section>

      <Section>
        <Card sx={{ p: { xs: 3, md: 6 }, textAlign: 'center' }}>
          <Typography variant="h2" component="h2">
            Run your own.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
            Docker Compose on a laptop, Kubernetes when you go live.
          </Typography>
          <Button component={Link} href="/docs/" variant="contained" size="large" data-pagefind-ignore>
            Get started
          </Button>
        </Card>
      </Section>
    </>
  );
}
