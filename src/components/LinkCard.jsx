import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Link from './Link';

// A card that leads somewhere. Without an href it is not a link yet, and
// says so with a "Coming soon" chip, unless the section around it says so
// already (`quiet`).
export default function LinkCard({ icon, title, text, href, quiet }) {
  const content = (
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: 24 }}>
        {icon}
        <Box sx={{ flexGrow: 1 }} />
        {!href && !quiet && <Chip label="Coming soon" size="small" />}
      </Box>
      <Typography variant="subtitle1" component="h3" sx={{ mt: 1, fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </CardContent>
  );

  if (!href) {
    return <Card sx={{ height: '100%' }}>{content}</Card>;
  }

  // Another site, or a file (llms.txt) rather than a page: a plain link, as
  // Next's router would look for a page there and find none.
  const plain = href.startsWith('http') || /\.\w+$/.test(href);
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        component={plain ? 'a' : Link}
        href={href}
        sx={{ height: '100%', alignItems: 'flex-start' }}
      >
        {content}
      </CardActionArea>
    </Card>
  );
}
