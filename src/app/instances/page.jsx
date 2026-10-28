import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../components/Link';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import { founder, instances, tellUs } from '../../data/instances';

export const metadata = {
  title: 'Instances',
  description: 'The instances of Anahita Services in the fediverse: banu.io, the first, and those that follow.',
};

export default function Instances() {
  return (
    <>
      <PageHeader
        title="Instances"
        subtitle="Anahita Services was released on 27 October 2026, and banu.io is its first instance in the fediverse."
      />

      <Section small>
        <Grid container spacing={3}>
          {instances.map(({ name, url, logo, description, joining, where, since }) => (
            <Grid key={url} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={logo} alt="" sx={{ width: 48, height: 48 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 500 }}>
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {[joining, where, `since ${since}`].filter(Boolean).join(' · ')}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button component="a" href={url}>
                    Visit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section small title="Running one?">
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
          If you have launched an Anahita instance, let us know, with a short form on GitHub or by
          following <MuiLink href={founder} underline="always">@rastin@banu.io</MuiLink> from your
          instance. We look at each one, and add those we would point people to. To start one,{' '}
          <MuiLink component={Link} href="/docs/services/getting-started/" underline="always">Getting started</MuiLink>{' '}
          says how.
        </Typography>
        <Button component="a" href={tellUs} variant="outlined" sx={{ mt: 3 }}>
          Let us know
        </Button>
      </Section>
    </>
  );
}
