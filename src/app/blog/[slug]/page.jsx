import HubOutlined from '@mui/icons-material/HubOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../../components/Link';
import Prose from '../../../components/Prose';
import { BlueskyMark } from '../../../components/diagrams/marks';
import { polaroidCaption, polaroidFrame } from '../../../components/Polaroid';
import { formatDate, getPost, getPosts, toHtml } from '../../../lib/blog';
import { authors } from '../../../data/authors';
import { site } from '../../../data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  // The post's own card, or the site's. A page's own openGraph and twitter
  // replace the site's whole, so the card is named in both.
  const card = post.image
    ? { url: post.image, width: 1200, height: 630, alt: post.imageAlt || post.title }
    : site.card;
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: 'article', publishedTime: post.date, authors: [post.author], images: [card] },
    twitter: { card: 'summary_large_image', images: [card.url] },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  const html = await toHtml(post.content);
  const author = authors[post.author];

  return (
    <Container component="article" sx={{ pt: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 680 }}>
        <MuiLink component={Link} href="/blog/" variant="body2" underline="hover">
          Blog
        </MuiLink>
        {/* Its card, the picture shown where it is shared, first, as every
            picture is: in a Polaroid's frame (components/Polaroid.jsx), but
            straight, not tilted: it heads the page (the user, 2026-11-16). */}
        {post.image && (
          <Box component="figure" sx={{ ...polaroidFrame, mx: 0, mt: 3, mb: 5 }}>
            <Box
              component="img"
              src={post.image}
              alt={post.imageAlt || ''}
              width={1200}
              height={630}
              sx={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <Box sx={{ minHeight: polaroidCaption.minHeight }} />
          </Box>
        )}
        <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          {post.title}
        </Typography>
        {/* Who wrote it, with their profile photo where there is one
            (data/authors.js), and when; under it, where to follow them. */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2 }}>
          {author && <Avatar src={author.photo} alt="" sx={{ width: 48, height: 48 }} />}
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time>
            </Typography>
            {/* Short: each network by its mark, its name said to a screen
                reader (the user, 2026-11-16). */}
            {author && (author.fediverse || author.bluesky) && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 1.5, overflowWrap: 'anywhere' }}
              >
                Follow
                {[
                  author.fediverse && { ...author.fediverse, Mark: HubOutlined, network: 'on the fediverse', rel: 'me' },
                  author.bluesky && { ...author.bluesky, Mark: BlueskyMark, network: 'on Bluesky' },
                ].filter(Boolean).map(({ handle, url, Mark, network, rel }) => (
                  <Box component="span" key={url} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                    <Mark sx={{ fontSize: '1rem' }} aria-hidden="true" />
                    <MuiLink href={url} rel={rel} aria-label={`${handle} ${network}`}>{handle}</MuiLink>
                  </Box>
                ))}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Prose html={html} />
      </Box>
    </Container>
  );
}
