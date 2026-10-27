import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ApiFields, { Type, Words } from '../../../components/ApiFields';
import WrittenBy from '../../../components/WrittenBy';
import { getApi, getShapes } from '../../../lib/api';

export const metadata = { title: 'Shapes · API reference' };

// What the routes take and send, by name, each with its fields.
export default function Shapes() {
  if (!getApi()) notFound();
  const shapes = getShapes();

  return (
    <Box sx={{ maxWidth: 760 }}>
      <Typography variant="body2" color="text.secondary">
        Reference
      </Typography>
      <Typography variant="h1" sx={{ mt: 1, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
        Shapes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        What the routes take and send, by name: one of anahita-libs by its own (<code>NodeItem</code>), one of a service
        with its module (<code>hashtag.HashtagNodeItem</code>).
      </Typography>
      {shapes.map(({ name, description, fields, type }) => (
        <Box key={name} component="section" id={name} sx={{ scrollMarginTop: 88, py: 4, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h2" sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '1rem', overflowWrap: 'anywhere' }}>
            {name}
          </Typography>
          <Words html={description} sx={{ mt: 1, mb: 2 }} />
          {fields.length ? <ApiFields fields={fields} requiredWord="always" /> : <Type html={type} />}
        </Box>
      ))}
      <WrittenBy sx={{ mt: 2 }} />
    </Box>
  );
}
