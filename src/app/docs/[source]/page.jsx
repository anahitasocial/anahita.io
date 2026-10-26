import DocPage from '../../../components/DocPage';
import { getDoc, getSource, getSources } from '../../../lib/docs';

export const dynamicParams = false;

export function generateStaticParams() {
  return getSources().map(({ key }) => ({ source: key }));
}

export async function generateMetadata({ params }) {
  const { source } = await params;
  return { title: `${getSource(source).title} docs` };
}

// A source's README, without its contents list, which is the sidebar here.
export default async function DocsOverview({ params }) {
  const { source } = await params;
  const doc = await getDoc(source, 'README');
  return <DocPage doc={doc} eyebrow="Docs" title={doc.source.title} />;
}
