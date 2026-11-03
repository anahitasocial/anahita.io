import Button from '@mui/material/Button';
import PageHeader from '../../../components/PageHeader';

// actor-service's routes were one page here, at /api/actor/, until each kind
// of profile had its own (2026-11-03). An old link to it goes on to them.
const to = '/api/profiles/';

export const metadata = {
  title: 'Profiles · API reference',
  alternates: { canonical: to },
};

export default function Moved() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <PageHeader title="Profiles" subtitle="People, groups, events and websites each have a page of their own now, after what every profile has.">
        <Button href={to} variant="contained" sx={{ mt: 4 }}>
          Profiles
        </Button>
      </PageHeader>
    </>
  );
}
