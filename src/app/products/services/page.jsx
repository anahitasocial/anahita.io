import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link from '../../../components/Link';
import PageHeader from '../../../components/PageHeader';
import Section from '../../../components/Section';
import { getSource } from '../../../lib/docs';
import { backing, groups } from '../../../data/services';

export const metadata = {
  title: 'Anahita Services',
  description: 'The server, one service at a time: what each does, and which an instance may leave out.',
};

// A service's name is set as code; what lies underneath (MySQL) is not.
function Row({ number, name, text, optional, href, code = true }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
      {number && (
        <Typography variant="body2" color="text.secondary" sx={{ width: 24, flexShrink: 0, textAlign: 'right' }}>
          {number}.
        </Typography>
      )}
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={code ? { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.9375rem', fontWeight: 500 } : { fontWeight: 500 }}
          >
            {href ? (
              <MuiLink component={Link} href={href} color="inherit" underline="hover">
                {name}
              </MuiLink>
            ) : (
              name
            )}
          </Typography>
          {optional && <Chip label="Optional" size="small" variant="outlined" />}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Services() {
  // Each service links to its page of the docs once those are on the site.
  const docs = Boolean(getSource('services'));
  let number = 0;

  return (
    <>
      <PageHeader
        parent={{ href: '/products/', label: 'Products' }}
        title="Anahita Services"
        subtitle="The server, one service at a time. Each does one thing, all are reached through one gateway, and the optional ones can be left out."
      />
      {groups.map(({ title, services }) => (
        <Section key={title} small title={title}>
          <Box sx={{ maxWidth: 760 }}>
            {services.map((service, index) => {
              number += 1;
              return (
                <Box key={service.name}>
                  {index > 0 && <Divider />}
                  <Row
                    number={number}
                    {...service}
                    href={docs && service.doc ? `/docs/services/${service.doc}/` : null}
                  />
                </Box>
              );
            })}
          </Box>
        </Section>
      ))}
      <Section small title="Underneath" subtitle="What the services keep their data in. Each can be run by you, or bought as a managed service.">
        <Box sx={{ maxWidth: 760 }}>
          {backing.map((item, index) => (
            <Box key={item.name}>
              {index > 0 && <Divider />}
              <Row {...item} code={false} />
            </Box>
          ))}
        </Box>
      </Section>
    </>
  );
}
