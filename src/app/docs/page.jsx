import Grid from '@mui/material/Grid';
import Icon from '../../components/Icon';
import LinkCard from '../../components/LinkCard';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import { builders, waysIn, webApp } from '../../data/docs';

export const metadata = {
  title: 'Docs',
  description: 'How to set up, run, change and build on Anahita.',
};

function Cards({ items, md = 3, quiet }) {
  return (
    <Grid container spacing={2}>
      {items.map(({ icon, title, text, href }) => (
        <Grid key={title} size={{ xs: 12, sm: 6, md }}>
          <LinkCard icon={<Icon name={icon} />} title={title} text={text} href={href} quiet={quiet} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function Docs() {
  return (
    <>
      <PageHeader
        title="Docs"
        subtitle="How to set up an Anahita site, keep it running, make it your own, and build on it. The docs live with the code, so they change when it does."
      />
      <Section
        small
        title="Running a site"
        subtitle="The services and the API. Four ways in, each a list of pages to read in order. They open with the public release of anahita-services."
      >
        <Cards items={waysIn} quiet />
      </Section>
      <Section small title="The web app" subtitle="anahita-web, the React app people use.">
        <Cards items={webApp} />
      </Section>
      <Section small title="For builders" subtitle="For your own apps, services and agents.">
        <Cards items={builders} md={4} />
      </Section>
    </>
  );
}
