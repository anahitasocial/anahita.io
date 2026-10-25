import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '../../components/Icon';
import Link from '../../components/Link';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import { apps, server } from '../../data/products';

export const metadata = {
  title: 'Products',
  description: 'Anahita Services, the server you run; Anahita Web, Mobile and CLI, the apps people use.',
};

export default function Products() {
  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Anahita is a server you run and apps people use. Every app reaches the server through the same open API, so anybody can build another."
      />

      <Section small overline="Server" title={server.name} subtitle={server.text}>
        <Card>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box component="ol" sx={{ m: 0, pl: 3, display: 'grid', gap: 1 }}>
              {server.facts.map((fact) => (
                <Typography key={fact} component="li" variant="body1">
                  {fact}
                </Typography>
              ))}
            </Box>
          </CardContent>
          <CardActions sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 }, gap: 1 }}>
            <Button component={Link} href="/products/services/" variant="contained">
              All services
            </Button>
            <Button component={Link} href="/docs/" variant="outlined">
              Docs
            </Button>
          </CardActions>
        </Card>
      </Section>

      <Section
        small
        overline="Apps"
        title="Anahita Web, Mobile and CLI"
        subtitle="What people use to reach the server: in a browser, on a phone, in a terminal."
      >
        <Grid container spacing={2}>
          {apps.map(({ name, icon, text, docs, github }) => (
            <Grid key={name} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 24 }}>
                    <Icon name={icon} />
                    <Box sx={{ flexGrow: 1 }} />
                    {!docs && <Chip label="Coming soon" size="small" />}
                  </Box>
                  <Typography variant="subtitle1" component="h3" sx={{ mt: 1, fontWeight: 500 }}>
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                </CardContent>
                {docs && (
                  <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                    <Button component={Link} href={docs} size="small" variant="outlined">
                      Docs
                    </Button>
                    <Button href={github} size="small">
                      GitHub
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
}
