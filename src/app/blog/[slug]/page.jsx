import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../../components/Link';
import Prose from '../../../components/Prose';
import { formatDate, getPost, getPosts, toHtml } from '../../../lib/blog';
import { site } from '../../../data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post.title,
    description: post.summary,
    // A page's own openGraph replaces the site's whole, so the card is named again.
    openGraph: { type: 'article', publishedTime: post.date, authors: [post.author], images: [site.card] },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  const html = await toHtml(post.content);

  return (
    <Container component="article" sx={{ pt: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 680 }}>
        <MuiLink component={Link} href="/blog/" variant="body2" underline="hover">
          Blog
        </MuiLink>
        <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: '2.25rem', md: '3rem' } }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.author}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Prose html={html} />
      </Box>
    </Container>
  );
}
