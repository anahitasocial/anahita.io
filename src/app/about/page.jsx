import fs from 'node:fs';
import path from 'node:path';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '../../components/PageHeader';
import Polaroid from '../../components/Polaroid';
import Prose from '../../components/Prose';
import { milestones } from '../../data/history';
import { site } from '../../data/site';
import { toHtml } from '../../lib/markdown';

export const metadata = {
  title: 'About',
  description: 'Who makes Anahita, who writes this site, and where it came from.',
};

const formatDate = (date, options) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-CA', { timeZone: 'UTC', ...options });

// A Polaroid's tilt, the same on every visit: from its place in the timeline.
const tiltOf = (index) => [-2.2, 1.6, -1.2, 2.4, -1.8, 1.1][index % 6];

export default async function About() {
  // Newest at the top, as a story read back from today.
  const timeline = [...milestones].reverse();
  const who = await toHtml(
    `Anahita is an open-source project of [rmd studio](${site.rmdStudio}), founded by Rastin Mehr, its core architect, and made in Vancouver, Canada.`,
  );
  const story = await toHtml(fs.readFileSync(path.join(process.cwd(), 'content/history.md'), 'utf8'));
  // Who wrote what on this site, in Rastin's words (2026-10-27).
  const aiUsage = await toHtml(
    "Much of the API and documentation on this website is written by Claude, based on code and material Rastin Mehr has written over the past 15+ years about Anahita's design philosophy and system architecture. Rastin personally reviews all the documentation before publishing. All the content on the About and Blog pages is written by Rastin Mehr and proofread by Grammarly and macOS writing tools.",
  );

  return (
    <>
      <PageHeader title="About" subtitle="Who makes Anahita, who writes this site, and where it came from." />
      <Container sx={{ pt: { xs: 6, md: 8 } }}>
        <Prose html={who} />
        <Typography id="history" variant="h2" component="h2" sx={{ mt: { xs: 6, md: 8 }, mb: 2, scrollMarginTop: 88 }}>
          History
        </Typography>
        <Prose html={story} />
        <Typography id="ai-usage" variant="h2" component="h2" sx={{ mt: { xs: 6, md: 8 }, mb: 2, scrollMarginTop: 88 }}>
          Content AI usage
        </Typography>
        <Prose html={aiUsage} />
      </Container>

      <Container component="section" aria-label="Timeline" sx={{ pt: { xs: 8, md: 12 } }}>
        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            position: 'relative',
            // The line the timeline hangs on: down the middle on wide screens,
            // down the left on phones.
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: { xs: 7, md: '50%' },
              width: '1px',
              bgcolor: 'divider',
            },
          }}
        >
          {timeline.map(({ date, photo, caption }, index) => {
            const left = index % 2 === 0;
            const year = formatDate(date, { year: 'numeric' });
            const previousYear = index > 0 ? formatDate(timeline[index - 1].date, { year: 'numeric' }) : null;
            const day = formatDate(date, { month: 'long', day: 'numeric', year: 'numeric' });
            return (
              <Box
                component="li"
                key={photo}
                sx={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: { xs: '24px 1fr', md: '1fr 64px 1fr' },
                  alignItems: 'center',
                  py: { xs: 3, md: 4 },
                }}
              >
                {/* The dot on the line, and the year where it changes. */}
                <Box
                  sx={{
                    gridColumn: { xs: 1, md: 2 },
                    gridRow: 1,
                    justifySelf: { xs: 'start', md: 'center' },
                    width: 15,
                    height: 15,
                    borderRadius: '50%',
                    bgcolor: 'background.default',
                    border: 2,
                    borderColor: 'primary.main',
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    gridColumn: { xs: 2, md: left ? 3 : 1 },
                    gridRow: 1,
                    textAlign: { md: left ? 'left' : 'right' },
                    pl: { xs: 2, md: left ? 2 : 0 },
                    pr: { md: left ? 0 : 2 },
                  }}
                >
                  {year !== previousYear && (
                    <Typography variant="h3" component="h2" color="primary">
                      {year}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {day}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    gridColumn: { xs: 2, md: left ? 1 : 3 },
                    gridRow: { xs: 2, md: 1 },
                    display: 'flex',
                    justifyContent: { xs: 'flex-start', md: left ? 'flex-end' : 'flex-start' },
                    pl: { xs: 2, md: 0 },
                    pt: { xs: 2, md: 0 },
                    px: { md: 4 },
                  }}
                >
                  <Polaroid
                    src={`/images/history/${photo}`}
                    alt={caption || `A photo from ${day}`}
                    caption={caption}
                    tilt={tiltOf(index)}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </>
  );
}
