import Button from '@mui/material/Button';
import Link from '../components/Link';
import MovedPost from '../components/MovedPost';
import PageHeader from '../components/PageHeader';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <>
      <MovedPost />
      <PageHeader title="Not found" subtitle="There is no page at this address. It may have moved when the site was rebuilt.">
        <Button component={Link} href="/" variant="outlined" sx={{ mt: 4 }}>
          Home
        </Button>
      </PageHeader>
    </>
  );
}
