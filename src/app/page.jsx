import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '../components/Icon';
import Link from '../components/Link';
import Section from '../components/Section';
import Graph from '../components/diagrams/Graph';
import Network from '../components/diagrams/Network';
import { BlueskyMark } from '../components/diagrams/marks';
import HubOutlined from '@mui/icons-material/HubOutlined';
import { audiences, features, graph, promises, start } from '../data/home';
import { getSource } from '../lib/docs';
import { site } from '../data/site';

// A word that matters in a line of grey text: in the text's own colour, bold.
function Strong({ children }) {
  return (
    <Box component="strong" sx={{ color: 'text.primary', fontWeight: 500 }}>
      {children}
    </Box>
  );
}

// A tile's text: plain words, or words with small icons before some of them.
function TileText({ text }) {
  if (typeof text === 'string') return text;
  return text.map((part) =>
    typeof part === 'string' ? (
      part
    ) : (
      <Box key={part[1]} component="span" sx={{ whiteSpace: 'nowrap' }}>
        <Icon name={part[0]} sx={{ fontSize: '1.15em', verticalAlign: '-0.2em', mr: 0.25 }} />
        {part[1]}
      </Box>
    ),
  );
}

export default function Home() {
  // The ways to start lead to Anahita Services' docs once they are on the site.
  const servicesDocs = Boolean(getSource('services'));
  return (
    <>
      <Container
        component="section"
        sx={{ pt: { xs: 10, md: 16 }, display: 'flex', alignItems: 'center', gap: { md: 6 } }}
      >
        <Box sx={{ maxWidth: 680, flex: '1 1 600px' }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}
          >
            Connect your people, here and everywhere.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 3, fontSize: { xs: '1.125rem', md: '1.25rem' }, maxWidth: 640 }}
          >
            The open-source social network your organisation hosts itself: a
            home for your community, open to the fediverse and Bluesky.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 5 }} data-pagefind-ignore>
            <Button href="#start" variant="contained" size="large">
              Get started
            </Button>
            <Button href={site.github} variant="outlined" size="large">
              GitHub
            </Button>
          </Stack>
        </Box>
        {/* A network beside the words, on screens wide enough for both. */}
        <Network sx={{ display: { xs: 'none', md: 'block' }, flex: '1 1 420px', maxWidth: 440, minWidth: 0 }} />
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
        title="Digital sovereignty"
        subtitle="For organisations moving off mainstream, centralised platforms: a place of their own, under their own rules, with a voice on the open web."
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
        title="One complete platform"
        subtitle="A complete set of services and features for your community to connect with each other, and with the world outside."
      >
        <Grid container spacing={2}>
          {features.map(({ icon, title, text, wide, chips }) => (
            <Grid key={title} size={wide ? { xs: 12, md: 6 } : { xs: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Icon name={icon} />
                  <Typography variant="subtitle1" component="h3" sx={{ mt: 1, fontWeight: 500 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <TileText text={text} />
                  </Typography>
                  {chips && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {chips.map((chip) => (
                        <Chip key={chip} label={chip} size="small" variant="outlined" />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        title={
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5 }}>
            Fediverse ready
            <Box
              component="span"
              aria-hidden="true"
              sx={{ display: 'inline-flex', gap: 1, color: 'common.black', '.dark &': { color: 'common.white' } }}
            >
              <HubOutlined sx={{ fontSize: '0.9em' }} />
              <BlueskyMark sx={{ fontSize: '0.85em' }} />
            </Box>
          </Box>
        }
        subtitle={
          <>
            Through <Strong>ActivityPub</Strong>, your instance joins the fediverse as an equal; through
            the <Strong>AT Protocol</Strong>, it reaches Bluesky. Each profile chooses whether to take part, and
            nothing leaves without consent.
          </>
        }
      >
        <Button component={Link} href="/faq/" variant="outlined" data-pagefind-ignore>
          Read the FAQ
        </Button>
      </Section>

      <Section
        title="Built on a graph"
        subtitle="Under everything Anahita does is one graph of nodes and edges. It is how search ranks, how recommendations are found, and how one rule of who may see what holds everywhere."
      >
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box component="dl" sx={{ m: 0, display: 'grid', gap: 3 }}>
              {graph.map(({ title, text }) => (
                <Box key={title}>
                  <Typography component="dt" variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {title}
                  </Typography>
                  <Typography component="dd" variant="body2" color="text.secondary" sx={{ m: 0 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Graph />
          </Grid>
        </Grid>
      </Section>

      <Section
        id="start"
        title="Start your own instance"
        subtitle="Everything you need is here, and free: the code, the docs, and guides to running it."
      >
        <Grid container spacing={2}>
          {start.map(({ icon, title, text, action, doc, href }) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Icon name={icon} />
                  <Typography variant="subtitle1" component="h3" sx={{ mt: 1, fontWeight: 500 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end' }} data-pagefind-ignore>
                  <Button
                    component={Link}
                    href={href || (servicesDocs ? `/docs/services/${doc}/` : '/docs/')}
                    variant={title === 'Try it first' ? 'contained' : 'outlined'}
                  >
                    {action}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
}
