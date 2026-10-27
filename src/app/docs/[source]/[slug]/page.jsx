import DocPage from '../../../../components/DocPage';
import { getDoc, getNeighbours, getPages, getSources } from '../../../../lib/docs';

export const dynamicParams = false;

export function generateStaticParams() {
  return getSources().flatMap(({ key }) => getPages(key).map(({ slug }) => ({ source: key, slug })));
}

export async function generateMetadata({ params }) {
  const { source, slug } = await params;
  const doc = await getDoc(source, slug);
  return { title: `${doc.title} · ${doc.source.title} docs` };
}

export default async function Doc({ params }) {
  const { source, slug } = await params;
  // Above the title, the group the page is in, where its docs have groups.
  const group = getPages(source).find((page) => page.slug === slug)?.group;
  return <DocPage doc={await getDoc(source, slug)} eyebrow={group || undefined} neighbours={getNeighbours(source, slug)} />;
}
