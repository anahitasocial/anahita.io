import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PageHeader from '../../components/PageHeader';
import Prose from '../../components/Prose';
import Federation from '../../components/diagrams/Federation';
import Graph from '../../components/diagrams/Graph';
import ServerAndApps from '../../components/diagrams/ServerAndApps';
import { questions } from '../../data/faq';
import { toHtml } from '../../lib/markdown';

export const metadata = {
  title: 'FAQ',
  description: 'The fediverse, instances, Bluesky, federation, the graph, the chronological feed, tracking, and what it takes to run Anahita.',
};

const diagrams = {
  'server-and-apps': ServerAndApps,
  federation: Federation,
  graph: Graph,
};

export default async function Faq() {
  const answers = await Promise.all(questions.map(({ answer }) => toHtml(answer)));

  return (
    <>
      <PageHeader
        title="FAQ"
        subtitle="The fediverse, instances and Bluesky, and what makes Anahita different, in plain words."
      />
      <Container sx={{ pt: { xs: 6, md: 8 } }}>
        {questions.map(({ id, question, diagram }, index) => {
          const Diagram = diagrams[diagram];
          return (
            <Box key={id} component="section" id={id} sx={{ scrollMarginTop: 88 }}>
              {index > 0 && <Divider sx={{ my: { xs: 4, md: 6 } }} />}
              <Typography variant="h3" component="h2" sx={{ maxWidth: 680, mb: 2 }}>
                {index + 1}. {question}
              </Typography>
              <Prose html={answers[index]} />
              {Diagram && (
                <Box sx={{ mt: 4, maxWidth: 960 }}>
                  <Diagram />
                </Box>
              )}
            </Box>
          );
        })}
      </Container>
    </>
  );
}
