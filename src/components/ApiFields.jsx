import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// Words from the reference's Markdown, set small: `code` and links kept.
export function Words({ html, sx }) {
  if (!html) return null;
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      component="div"
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        '& p': { m: 0 },
        '& p + p': { mt: 1 },
        '& code': { fontFamily: mono, fontSize: '0.8125rem', bgcolor: 'action.hover', borderRadius: 1, px: 0.5 },
        '& a': { color: 'primary.main' },
        '& .visually-hidden': { position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' },
        ...sx,
      }}
    />
  );
}

// A type in words, with its link to a shape.
export function Type({ html }) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      component="span"
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{ '& a': { color: 'inherit', textDecorationColor: 'currentColor' } }}
    />
  );
}

// Fields one under another, each with its name, its type and what it is.
// An object written out in place has its own fields folded under it.
export default function ApiFields({ fields, requiredWord = 'required' }) {
  if (!fields.length) return null;
  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {fields.map((field) => (
        <Box key={field.name} component="li" sx={{ py: 1.5, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 1 }}>
            <Box component="code" sx={{ fontFamily: mono, fontSize: '0.8125rem', fontWeight: 600, overflowWrap: 'anywhere' }}>
              {field.name}
            </Box>
            <Type html={field.type} />
            {field.required && (
              <Typography variant="caption" sx={{ color: 'warning.main' }}>
                {requiredWord}
              </Typography>
            )}
            {field.in && (
              <Typography variant="caption" color="text.secondary">
                in {field.in}
              </Typography>
            )}
          </Box>
          <Words html={field.description} sx={{ mt: 0.5 }} />
          {field.children?.length > 0 && (
            <Box
              component="details"
              sx={{
                mt: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                '& > summary': { cursor: 'pointer', px: 1.5, py: 0.75, typography: 'body2', color: 'text.secondary' },
                '&[open] > summary': { borderBottom: 1, borderColor: 'divider' },
                '& > ul': { px: 1.5 },
                '& > ul > li:first-of-type': { borderTop: 0 },
              }}
            >
              <summary>Its fields</summary>
              <ApiFields fields={field.children} requiredWord={requiredWord} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
