import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// The top of every page but the home page: its title, and a line on what it holds.
export default function PageHeader({ title, subtitle, children }) {
  return (
    <Container component="header" sx={{ pt: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 680 }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, fontSize: { xs: '1.125rem', md: '1.25rem' } }}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </Box>
    </Container>
  );
}
