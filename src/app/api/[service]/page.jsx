import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ApiRoute from '../../../components/ApiRoute';
import { Words } from '../../../components/ApiFields';
import Link from '../../../components/Link';
import WrittenBy from '../../../components/WrittenBy';
import { getService, getServicePage, getServices } from '../../../lib/api';

export const dynamicParams = false;

// A static export needs at least one page: until the services' docs are on
// the site, one that is not found.
export function generateStaticParams() {
  const services = getServices().map(({ slug }) => ({ service: slug }));
  return services.length ? services : [{ service: '_' }];
}

export async function generateMetadata({ params }) {
  const { service } = await params;
  const found = getService(service);
  return { title: found ? `${found.title} · API reference` : 'API reference' };
}

// A service's routes, one after another, each with its code beside it.
export default async function Service({ params }) {
  const { service } = await params;
  const page = await getServicePage(service);
  if (!page) notFound();
  const { group } = getServices().find(({ slug }) => slug === service);
  // A kind's own routes, then those every kind has at its own address,
  // which another section explains once.
  const own = page.routes.filter((route) => !route.shared);
  const shared = page.routes.filter((route) => route.shared);
  const explainedBy = shared.length ? getServices().find(({ slug }) => slug === shared[0].shared) : null;

  return (
    <Box>
      <Box sx={{ maxWidth: 680, pb: 6 }}>
        <Typography variant="body2" color="text.secondary">
          {group}
        </Typography>
        <Typography variant="h1" sx={{ mt: 1, mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          {page.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p" sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', mb: 3 }}>
          {page.name}
        </Typography>
        <Words html={page.about} sx={{ typography: 'body1', color: 'text.primary', '& p + p': { mt: 2 } }} />
      </Box>
      {own.map((route) => (
        <ApiRoute key={route.id} route={route} />
      ))}
      {shared.length > 0 && (
        <Box sx={{ maxWidth: 680, pt: 4, pb: 3 }}>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 1 }}>
            As every profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The same on every kind, at this kind&rsquo;s address.{' '}
            {explainedBy && (
              <>
                What each does is under{' '}
                <MuiLink component={Link} href={`/api/${explainedBy.slug}/`} underline="hover">
                  {explainedBy.title}
                </MuiLink>
                .
              </>
            )}
          </Typography>
        </Box>
      )}
      {shared.map((route) => (
        <ApiRoute key={route.id} route={route} />
      ))}
      <WrittenBy sx={{ mt: 2 }} />
    </Box>
  );
}
