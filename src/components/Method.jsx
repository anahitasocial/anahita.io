import Box from '@mui/material/Box';

// A route's method, small and in capitals, in a colour of its own: what
// reads (GET) apart from what changes (POST, PUT, PATCH) and what removes
// (DELETE), at a glance down a list.
const colours = {
  get: 'success.main',
  post: 'info.main',
  put: 'warning.main',
  patch: 'warning.main',
  delete: 'error.main',
};

export default function Method({ method, sx }) {
  return (
    <Box
      component="span"
      sx={{
        flexShrink: 0,
        minWidth: 40,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: colours[method] || 'text.secondary',
        ...sx,
      }}
    >
      {method.toUpperCase()}
    </Box>
  );
}
