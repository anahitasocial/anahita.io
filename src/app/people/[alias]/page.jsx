import Button from '@mui/material/Button';
import PageHeader from '../../../components/PageHeader';
import { movedUnder } from '../../../data/moved';

// A profile of the old PHP site, now on banu.io (src/data/moved.js). Only
// those listed are made; any other /people/ address is a 404.
export const dynamicParams = false;

const people = movedUnder('people');
const find = (alias) => people.find((person) => person.alias === alias);

export function generateStaticParams() {
  return people.map(({ alias }) => ({ alias }));
}

export async function generateMetadata({ params }) {
  const { alias } = await params;
  const { name, to } = find(alias);
  return {
    title: name,
    description: `${name} is on banu.io now.`,
    alternates: { canonical: to },
  };
}

export default async function Moved({ params }) {
  const { alias } = await params;
  const { name, to } = find(alias);
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <PageHeader title={name} subtitle={`${name}'s profile and posts are on banu.io now.`}>
        <Button href={to} variant="contained" sx={{ mt: 4 }}>
          Go to banu.io
        </Button>
      </PageHeader>
    </>
  );
}
