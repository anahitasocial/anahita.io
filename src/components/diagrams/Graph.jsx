import Box from '@mui/material/Box';
import EventOutlined from '@mui/icons-material/EventOutlined';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import NotesOutlined from '@mui/icons-material/NotesOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import ReplyOutlined from '@mui/icons-material/ReplyOutlined';
import { Caption, Diagram, Link, Node } from './parts';

const label =
  'A small part of the graph. Nodes: Ana, a person; the Physics club, a group; a note; the Open day, an event; and a reply from mastodon.social. Edges: Ana follows the club, wrote the note and is going to the Open day; the note was posted in the club; the reply from elsewhere replies to the note.';

function Wide() {
  return (
    <Diagram label={label} viewBox="0 0 560 330">
      <Node x={10} y={30} w={160} h={56} icon={PersonOutlined} title="Ana" lines={['a person']} accent />
      <Node x={390} y={30} w={160} h={56} icon={GroupsOutlined} title="Physics club" lines={['a group']} />
      <Node x={200} y={137} w={160} h={56} icon={NotesOutlined} title="A note" lines={['a post']} />
      <Node x={10} y={250} w={160} h={56} icon={EventOutlined} title="Open day" lines={['an event']} />
      <Node x={370} y={250} w={180} h={56} icon={ReplyOutlined} title="A reply" lines={['from mastodon.social']} />

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
  );
}

function Narrow() {
  return (
    <Diagram label={label} viewBox="0 0 360 352">
      <Node x={0} y={0} w={160} h={52} icon={PersonOutlined} title="Ana" lines={['a person']} accent size={14} />
      <Node x={200} y={0} w={160} h={52} icon={GroupsOutlined} title="Physics club" lines={['a group']} size={14} />
      <Node x={100} y={140} w={160} h={52} icon={NotesOutlined} title="A note" lines={['a post']} size={14} />
      <Node x={0} y={300} w={160} h={52} icon={EventOutlined} title="Open day" lines={['an event']} size={14} />
      <Node x={180} y={300} w={180} h={52} icon={ReplyOutlined} title="A reply" lines={['from mastodon.social']} size={14} />

      <Link d="M160 26 L196 26" />
      <Caption x={180} y={46} size={11}>follows</Caption>

      <Link d="M70 52 L150 136" />
      <Caption x={96} y={104} anchor="end" size={12}>wrote</Caption>

      <Link d="M230 140 L290 56" />
      <Caption x={266} y={104} anchor="start" size={12}>posted in</Caption>

      <Link d="M24 52 L24 296" />
      <Caption x={32} y={232} anchor="start" size={12}>going to</Caption>

      <Link d="M250 300 L200 196" dashed />
      <Caption x={234} y={252} anchor="start" size={12}>replies to</Caption>
    </Diagram>
  );
}

// Nodes and the edges between them: one graph for everything, including
// what came from other servers.
export default function Graph() {
  return (
    <Box data-pagefind-ignore sx={{ maxWidth: 600 }}>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Wide />
      </Box>
      <Box sx={{ display: { sm: 'none' }, maxWidth: 400 }}>
        <Narrow />
      </Box>
    </Box>
  );
}
