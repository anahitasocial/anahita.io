import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../components/Link';
import PageHeader from '../../components/PageHeader';
import { formatDate, getPosts } from '../../lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'News from Anahita.',
  alternates: { types: { 'application/atom+xml': '/blog/feed.xml' } },
};

export default function Blog() {
  const posts = getPosts();

  return (
    <>
      <PageHeader title="Blog" subtitle="News from Anahita: releases, plans and the open social web.">
        <MuiLink href="/blog/feed.xml" variant="body2" underline="hover" sx={{ display: 'inline-block', mt: 2 }}>
          Atom feed
        </MuiLink>
      </PageHeader>
      <Container sx={{ pt: { xs: 6, md: 8 } }}>
        <Box sx={{ maxWidth: 680 }}>
          {posts.map((post, index) => (
            <Box key={post.slug}>
              {index > 0 && <Divider />}
              <Box component="article" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary" component="time" dateTime={post.date}>
                  {formatDate(post.date)}
                </Typography>
                <Typography variant="h3" component="h2" sx={{ mt: 1 }}>
                  <MuiLink component={Link} href={`/blog/${post.slug}/`} color="inherit" underline="hover">
                    {post.title}
                  </MuiLink>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {post.summary}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
