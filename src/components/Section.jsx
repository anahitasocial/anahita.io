import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// A band of the page: a heading, a line under it, then what it holds. The
// overline names the group it belongs to (Server, Apps); an icon, a third
// larger than the cards' own, sits above the heading.
export default function Section({ id, overline, icon, title, subtitle, small, children, sx }) {
  return (
    <Box component="section" id={id} sx={{ pt: small ? { xs: 6, md: 8 } : { xs: 8, md: 12 }, scrollMarginTop: 64, ...sx }}>
      <Container>
        {title && (
          <Box sx={{ maxWidth: 680, mb: small ? 3 : { xs: 4, md: 6 } }}>
            {overline && (
              <Typography variant="overline" color="primary" component="p" sx={{ lineHeight: 2 }}>
                {overline}
              </Typography>
            )}
            {/* A third larger than a card's, as a heading's icon. */}
            {icon && <Box sx={{ display: 'flex', gap: 1, mb: 1, '& .MuiSvgIcon-root': { fontSize: 32 } }}>{icon}</Box>}
            <Typography variant={small ? 'h3' : 'h2'} component="h2">
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: small ? 1 : 2, fontSize: small ? undefined : '1.125rem' }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
}
