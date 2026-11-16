import ArrowForward from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../components/Link';
import PageHeader from '../../components/PageHeader';
import { polaroidCaption, polaroidFrame } from '../../components/Polaroid';
import { formatDate, getPosts } from '../../lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'News from Anahita.',
};

export default function Blog() {
  const posts = getPosts();

  return (
    <>
      <PageHeader title="Blog" subtitle="News from Anahita: releases, plans and the open social web.">
        <MuiLink href="/feed.xml" variant="body2" underline="hover" sx={{ display: 'inline-block', mt: 2 }}>
          Atom feed
        </MuiLink>
      </PageHeader>
      <Container sx={{ pt: { xs: 6, md: 8 } }}>
        <Box sx={{ maxWidth: 680 }}>
          {posts.map((post, index) => (
            <Box key={post.slug}>
              {index > 0 && <Divider />}
              <Box component="article" sx={{ py: 6 }}>
                {/* Its card, as at the top of the post: straight, in a
                    Polaroid's frame. A way into the post for the eye; for
                    the keyboard and screen readers its title is the link,
                    so the card is not said twice. */}
                {post.image && (
                  <Box
                    component={Link}
                    href={`/blog/${post.slug}/`}
                    tabIndex={-1}
                    aria-hidden="true"
                    sx={{ ...polaroidFrame, display: 'block', mb: 3 }}
                  >
                    <Box
                      component="img"
                      src={post.image}
                      alt=""
                      loading="lazy"
                      width={1200}
                      height={630}
                      sx={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                    <Box sx={{ minHeight: polaroidCaption.minHeight }} />
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary" component="time" dateTime={post.date}>
                  {formatDate(post.date)}
                </Typography>
                {/* Seen under yarn dev only: drafts are left out of the built site. */}
                {post.draft && <Chip label="Draft" size="small" color="secondary" sx={{ ml: 1 }} />}
                <Typography variant="h3" component="h2" sx={{ mt: 1 }}>
                  <MuiLink component={Link} href={`/blog/${post.slug}/`} color="inherit" underline="hover">
                    {post.title}
                  </MuiLink>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {post.summary}
                </Typography>
                {/* Where the post ends in the list, so that one is told from
                    the next; named after its post for a screen reader. */}
                <MuiLink
                  component={Link}
                  href={`/blog/${post.slug}/`}
                  aria-label={`Read ${post.title}`}
                  variant="body2"
                  underline="hover"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 2, fontWeight: 500 }}
                >
                  Read more
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
