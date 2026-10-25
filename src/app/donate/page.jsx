import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '../../components/Icon';
import LinkCard from '../../components/LinkCard';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import { platforms, uses } from '../../data/donate';
import { site } from '../../data/site';

export const metadata = {
  title: 'Donate',
  description: 'Support Anahita: free, open source, and paid for by the people who use it.',
};

export default function Donate() {
  return (
    <>
      <PageHeader
        title="Donate"
        subtitle="Anahita is free and open source, with no ads and nothing tracking anybody. It is paid for by the people and organisations who find it useful."
      />

      <Section small title="Where it goes">
        <Grid container spacing={3}>
          {uses.map(({ title, text }) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
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

      <Section small title="How to give">
        <Grid container spacing={2}>
          {platforms.map(({ icon, title, text, href }) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <LinkCard icon={<Icon name={icon} />} title={title} text={text} href={href} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section small>
        <Card sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { sm: 'center' } }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 500 }}>
              For organisations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To have Anahita set up, hosted or built on for you, talk to rmd Studio, who make it.
            </Typography>
          </Box>
          <Button href={site.contact} variant="outlined" sx={{ flexShrink: 0, alignSelf: { xs: 'flex-end', sm: 'center' } }}>
            Contact
          </Button>
        </Card>
      </Section>
    </>
  );
}
