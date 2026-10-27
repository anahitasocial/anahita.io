import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ApiRoute from '../../../components/ApiRoute';
import { Words } from '../../../components/ApiFields';
import WrittenBy from '../../../components/WrittenBy';
import { getService, getServicePage, getServices } from '../../../lib/api';

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map(({ slug }) => ({ service: slug }));
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
      {page.routes.map((route) => (
        <ApiRoute key={route.id} route={route} />
      ))}
      <WrittenBy sx={{ mt: 2 }} />
    </Box>
  );
}
