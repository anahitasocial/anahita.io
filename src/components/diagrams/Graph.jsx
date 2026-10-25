import Box from '@mui/material/Box';
import { Caption, Diagram, Link, Node } from './parts';

const label =
  'A small part of the graph. Nodes: Ana, a person; the Physics club, a group; a note; the Open day, an event; and a reply from mastodon.social. Edges: Ana follows the club, wrote the note and is going to the Open day; the note was posted in the club; the reply from elsewhere replies to the note.';

// Nodes and the edges between them: one graph for everything, including
// what came from other servers.
export default function Graph() {
  return (
    <Box data-pagefind-ignore sx={{ maxWidth: 600 }}>
      <Diagram label={label} viewBox="0 0 560 330">
        <Node x={10} y={30} w={160} h={56} title="Ana" lines={['a person']} accent />
        <Node x={390} y={30} w={160} h={56} title="Physics club" lines={['a group']} />
        <Node x={200} y={137} w={160} h={56} title="A note" lines={['a post']} />
        <Node x={10} y={250} w={160} h={56} title="Open day" lines={['an event']} />
        <Node x={370} y={250} w={180} h={56} title="A reply" lines={['from mastodon.social']} />

        <Link d="M170 58 L386 58" />
        <Caption x={278} y={50}>follows</Caption>

        <Link d="M140 86 L232 135" />
        <Caption x={170} y={124} anchor="end">wrote</Caption>

        <Link d="M330 137 L430 88" />
        <Caption x={392} y={124} anchor="start">posted in</Caption>

        <Link d="M90 86 L90 246" />
        <Caption x={100} y={172} anchor="start">going to</Caption>

        <Link d="M420 250 L332 195" dashed />
        <Caption x={398} y={226} anchor="start">replies to</Caption>
      </Diagram>
    </Box>
  );
}
