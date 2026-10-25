import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// A band of the page: a heading, a line under it, then what it holds.
export default function Section({ title, subtitle, small, children, sx }) {
  return (
    <Box component="section" sx={{ pt: small ? { xs: 6, md: 8 } : { xs: 8, md: 12 }, ...sx }}>
      <Container>
        {title && (
          <Box sx={{ maxWidth: 680, mb: small ? 3 : { xs: 4, md: 6 } }}>
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
