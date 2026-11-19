import ArrowForward from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../components/Link';
import PageHeader from '../../components/PageHeader';
import { formatDate } from '../../lib/blog';
import { getReleaseDays } from '../../lib/releases';

export const metadata = {
  title: 'Releases',
  description: 'Every release of Anahita Services and Anahita Web, a day at a time.',
};

// Every day with releases, newest first; each day's page has its notes.
// Without the days' cards, which differ only by repository: the list is
// the versions and what they say.
export default function Releases() {
  const days = getReleaseDays({ all: true });

  return (
    <>
      <PageHeader title="Releases" subtitle="Every Birth release of Anahita Services and Anahita Web, a day at a time.">
        <MuiLink href="/feed.xml" variant="body2" underline="hover" sx={{ display: 'inline-block', mt: 2 }}>
          Atom feed
        </MuiLink>
      </PageHeader>
      <Container sx={{ pt: { xs: 6, md: 8 } }}>
        <Box sx={{ maxWidth: 680 }}>
          {days.map((day, index) => (
            <Box key={day.date}>
              {index > 0 && <Divider />}
              <Box component="article" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary" component="time" dateTime={day.date}>
                  {formatDate(day.date)}
                </Typography>
                <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
                  <MuiLink component={Link} href={`/releases/${day.date}/`} color="inherit" underline="hover">
                    {day.title}
                  </MuiLink>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {day.summary}
                </Typography>
                <MuiLink
                  component={Link}
                  href={`/releases/${day.date}/`}
                  aria-label={`The notes of ${day.title}`}
                  variant="body2"
                  underline="hover"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 2, fontWeight: 500 }}
                >
                  The notes
                  <ArrowForward sx={{ fontSize: '1rem' }} aria-hidden="true" />
                </MuiLink>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
