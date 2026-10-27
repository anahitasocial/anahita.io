import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ApiFields, { Type, Words } from './ApiFields';
import Method from './Method';
import Prose from './Prose';

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

function Heading({ children }) {
  return (
    <Typography variant="subtitle2" component="h3" sx={{ mt: 4, mb: 1 }}>
      {children}
    </Typography>
  );
}

const statusColour = (code) => ({ 2: 'success.main', 3: 'info.main', 4: 'warning.main', 5: 'error.main' })[code[0]] || 'text.secondary';

// One route, in two columns as Stripe's reference has them: on the left
// what it is, who may call it, what it takes and what it answers; on the
// right, kept in view while the left is read, the request in three
// languages and an example of the answer. One column on narrower screens.
export default function ApiRoute({ route }) {
  const { id, method, path, summary, description, who, internal, parameters, bodies, responses, request, answer, status } = route;

  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: 88,
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' },
        columnGap: 6,
      }}
    >
      <Box>
        <Typography variant="h4" component="h2" sx={{ fontSize: '1.375rem' }}>
          {summary}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
          <Method method={method} sx={{ minWidth: 0 }} />
          <Box component="code" sx={{ fontFamily: mono, fontSize: '0.875rem', overflowWrap: 'anywhere' }}>
            {path}
          </Box>
        </Box>
        <Words html={description} sx={{ mt: 2, typography: 'body1', color: 'text.primary', '& code': { fontSize: '0.875rem' } }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <Box component="span" sx={{ fontWeight: 500, color: 'text.primary' }}>Who: </Box>
          <span dangerouslySetInnerHTML={{ __html: who }} />
          {internal && '. Inside the installation only.'}
        </Typography>

        {parameters.length > 0 && (
          <>
            <Heading>Parameters</Heading>
            <ApiFields fields={parameters} />
          </>
        )}
        {bodies.map((body) => (
          <Box key={body.media.join()}>
            <Heading>
              Body{' '}
              <Typography variant="caption" color="text.secondary" component="span">
                {body.media.join(' or ')}
              </Typography>
            </Heading>
            {body.fields.length ? <ApiFields fields={body.fields} /> : <Type html={body.type} />}
          </Box>
        ))}

        <Heading>Answers</Heading>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {responses.map((response) => (
            <Box key={response.code} component="li" sx={{ display: 'flex', gap: 2, py: 1, borderTop: 1, borderColor: 'divider' }}>
              <Box component="span" sx={{ fontFamily: mono, fontSize: '0.8125rem', fontWeight: 600, color: statusColour(response.code), minWidth: 32 }}>
                {response.code}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Words html={response.description} />
                {response.bodies.map((body) => (
                  <Box key={body.media}>
                    <Type html={body.type} />{' '}
                    <Typography variant="caption" color="text.secondary" component="span">
                      {body.media}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 4, lg: 0 } }}>
        <Box sx={{ position: { lg: 'sticky' }, top: 88, '& .code-tabs:first-of-type': { mt: 0 } }}>
          <Typography variant="overline" color="text.secondary" component="p">
            Request
          </Typography>
          <Prose html={request} />
          {answer && (
            <>
              <Typography variant="overline" color="text.secondary" component="p" sx={{ mt: 3 }}>
                Answer{status && ` · ${status}`}
              </Typography>
              <Box sx={{ '& pre': { maxHeight: 480 } }}>
                <Prose html={answer} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
