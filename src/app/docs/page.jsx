import Grid from '@mui/material/Grid';
import Icon from '../../components/Icon';
import LinkCard from '../../components/LinkCard';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import { builders, waysIn, webApp } from '../../data/docs';
import { getSource } from '../../lib/docs';

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

// A card links to its page once its source is fetched; until then it waits.
function link(items, key) {
  const fetched = Boolean(getSource(key));
  return items.map(({ slug, ...item }) => ({ ...item, href: fetched ? `/docs/${key}/${slug}/` : null }));
}

export default function Docs() {
  const tools = builders.map(({ needs, href, ...item }) => ({
    ...item,
    href: needs && !getSource(needs) ? null : href,
  }));

  return (
    <>
      <PageHeader
        title="Docs"
        subtitle="How to set up an Anahita instance, keep it running, make it your own, and build on it. The docs live with the code, so they change when it does."
      />
      <Section
        small
        title="Running an instance"
        subtitle="Anahita Services and its API. Four ways in, each a list of pages to read in order. They open with its public release."
      >
        <Cards items={link(waysIn, 'services')} quiet />
      </Section>
      <Section small title="Anahita Web" subtitle="The web app people use, in React and Material UI.">
        <Cards items={link(webApp, 'web')} />
      </Section>
      <Section small title="For builders" subtitle="For your own apps, services and agents.">
        <Cards items={tools} md={4} />
      </Section>
    </>
  );
}
