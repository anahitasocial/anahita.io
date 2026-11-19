import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../../components/Link';
import Prose from '../../../components/Prose';
import { polaroidCaption, polaroidFrame } from '../../../components/Polaroid';
import { formatDate } from '../../../lib/blog';
import { getReleaseDay, getReleaseDays, getReleaseHtml } from '../../../lib/releases';

export const dynamicParams = false;

export function generateStaticParams() {
  return getReleaseDays({ all: true }).map(({ date }) => ({ date }));
}

// What the day's card shows, in words.
function cardAlt(day) {
  return day.entries.length > 1
    ? 'A line drawing: the main branches of Anahita Services and Anahita Web, the day’s two releases tagged and tied together, over what changed.'
    : `A line drawing: the main branch of ${day.entries[0].repository.name}, its newest release tagged, over what changed.`;
}

export async function generateMetadata({ params }) {
  const { date } = await params;
  const day = getReleaseDay(date);
  // The day's card: the post the channel makes shows it, so each kind of
  // day has its own (services, web, or both).
  const card = { url: day.card, width: 1200, height: 630, alt: cardAlt(day) };
  return {
    title: day.title,
    description: day.summary,
    openGraph: { type: 'article', publishedTime: day.published, images: [card] },
    twitter: { card: 'summary_large_image', images: [card.url] },
  };
}

export default async function ReleaseDay({ params }) {
  const { date } = await params;
  const day = getReleaseDay(date);
  const html = await getReleaseHtml(day);

  return (
    <Container component="article" sx={{ pt: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 680 }}>
        <MuiLink component={Link} href="/releases/" variant="body2" underline="hover">
          Releases
        </MuiLink>
        <Box component="figure" sx={{ ...polaroidFrame, mx: 0, mt: 3, mb: 5 }}>
          <Box
            component="img"
            src={day.card}
            alt={cardAlt(day)}
            width={1200}
            height={630}
            sx={{ display: 'block', width: '100%', height: 'auto' }}
          />
          <Box sx={{ minHeight: polaroidCaption.minHeight }} />
        </Box>
        <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: '2rem', md: '2.3rem' } }}>
          {day.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <time dateTime={day.date}>{formatDate(day.date)}</time>
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Prose html={html} />
      </Box>
    </Container>
  );
}
