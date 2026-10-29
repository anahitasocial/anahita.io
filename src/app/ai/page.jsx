import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '../../components/Icon';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import { site } from '../../data/site';
import { ai, current, planned, principles, questions, science } from '../../data/ai';

const path = '/ai/';

export const metadata = {
  // The name alone would read "Anahita AI · Anahita" under the template; the
  // words after it are what people search for, under 60 characters.
  title: { absolute: 'Anahita AI: open-source AI for self-hosted social networks' },
  description: ai.description,
  alternates: { canonical: path },
  // A page's own openGraph replaces the site's whole, so the card is named again.
  openGraph: { siteName: site.name, type: 'website', url: path, title: ai.title, description: ai.description, images: [site.card] },
  twitter: { card: 'summary_large_image', title: ai.title, description: ai.description, images: [site.card.url] },
};

// What search engines read of the page: where it sits, the page, the
// features it lists, the software, and its questions with their answers.
const updated = '2026-10-29';
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${site.url}${path}`,
      url: `${site.url}${path}`,
      name: ai.title,
      description: ai.description,
      inLanguage: 'en',
      datePublished: updated,
      dateModified: updated,
      keywords: 'open-source AI, self-hosted social network, fediverse, ActivityPub, Bluesky, alt text, translation, open science, knowledge graph, local language models',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
      breadcrumb: { '@id': `${site.url}${path}#breadcrumb` },
      publisher: { '@type': 'Organization', name: 'rmd studio', url: site.rmdStudio },
      about: {
        '@type': 'SoftwareApplication',
        name: site.name,
        applicationCategory: 'SocialNetworkingApplication',
        operatingSystem: 'Linux',
        url: site.url,
        sameAs: [site.github, site.fediverse, site.bluesky],
      },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Anahita AI features',
        itemListElement: [current, ...science.features, ...planned].map(({ name, text }, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          description: text,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${site.url}${path}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: site.name, item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${site.url}/products/` },
        { '@type': 'ListItem', position: 3, name: ai.title, item: `${site.url}${path}` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: questions.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
};

function FeatureCard({ name, icon, text, details = [] }) {
  return (
    <Card sx={{ height: '100%', p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Icon name={icon} />
        <Typography variant="subtitle1" component="h3" sx={{ minWidth: 0, flexGrow: 1, fontWeight: 500 }}>
          {name}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {text}
      </Typography>
      {details.length > 0 && (
        <Box component="dl" sx={{ m: 0, mt: 3, display: 'grid', gap: 2, columnGap: 4, gridTemplateColumns: { md: '1fr 1fr' } }}>
          {details.map(([lead, line]) => (
            <Box key={lead}>
              <Typography component="dt" variant="body2" sx={{ fontWeight: 500 }}>
                {lead}
              </Typography>
              <Typography component="dd" variant="body2" color="text.secondary" sx={{ m: 0 }}>
                {line.charAt(0).toUpperCase() + line.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
}

export default function AnahitaAi() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaped, so nothing in the text can close the script.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <PageHeader parent={{ href: '/products/', label: 'Products' }} title={ai.title} subtitle={ai.subtitle} />

      <Section small title="In development" subtitle="The first piece, being built now.">
        <FeatureCard {...current} />
      </Section>

      <Section small overline="Coming soon" title={science.title} subtitle={science.subtitle}>
        <Grid container spacing={2}>
          {science.features.map((feature) => (
            <Grid key={feature.name} size={{ xs: 12, md: 6 }}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        small
        title="Also coming"
        subtitle="Each built on its own, on the same service."
      >
        <Grid container spacing={2}>
          {planned.map((feature, index) => (
            // The last alone in its row takes the full width.
            <Grid key={feature.name} size={{ xs: 12, md: index === planned.length - 1 && planned.length % 2 ? 12 : 6 }}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section small title="How it is built" subtitle="The same rules for every feature.">
        <Card sx={{ p: { xs: 2, md: 3 } }}>
          <Box component="ol" sx={{ m: 0, pl: 3, display: 'grid', gap: 2 }}>
            {principles.map(([lead, line]) => (
              <Box component="li" key={lead}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {lead}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {line}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Section>

      <Section small title="Questions">
        <Box sx={{ display: 'grid', gap: 4, maxWidth: 680 }}>
          {/* Numbered past three, as every list is. */}
          {questions.map(({ question, answer }, index) => (
            <Box key={question}>
              <Typography variant="h6" component="h3">
                {questions.length > 3 && `${index + 1}. `}
                {question}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>
    </>
  );
}
