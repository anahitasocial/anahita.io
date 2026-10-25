import Box from '@mui/material/Box';
import EventOutlined from '@mui/icons-material/EventOutlined';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import NotesOutlined from '@mui/icons-material/NotesOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import ReplyOutlined from '@mui/icons-material/ReplyOutlined';
import { Caption, Diagram, DiagramIcon, color } from './parts';

const label =
  'A small part of the graph. Nodes: Ana, a person; the Physics club, a group; a note; the Open day, an event; and a reply from mastodon.social. Edges: Ana follows the club, wrote the note and is going to the Open day; the note was posted in the club; the reply from elsewhere replies to the note.';

// A node: a circle with its icon, its name and kind beneath it, or above it
// (`above`) where its edges leave downward.
function Circle({ node, r, size }) {
  const { x, y, icon, title, kind, accent, above } = node;
  const titleY = above ? y - r - size - 8 : y + r + size + 4;
  const kindY = above ? y - r - 8 : y + r + 2 * size + 6;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        style={{ fill: color.paper, stroke: accent ? color.primary : color.border, strokeWidth: accent ? 1.5 : 1 }}
      />
      <DiagramIcon icon={icon} x={x - 12} y={y - 12} size={24} />
      <text x={x} y={titleY} textAnchor="middle" style={{ fill: color.text, fontSize: size, fontWeight: 500 }}>
        {title}
      </text>
      <Caption x={x} y={kindY} size={size - 2}>
        {kind}
      </Caption>
    </g>
  );
}

// An edge: a curve from one circle's rim to another's, bent to one side by
// `bend`, with its label at the middle of the curve.
function Edge({ from, to, r, bend, text, dashed, size, labelOffset = 10 }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  const cx = mx + nx * bend;
  const cy = my + ny * bend;
  const rim = (p, gap) => {
    const ux = cx - p.x;
    const uy = cy - p.y;
    const d = Math.hypot(ux, uy);
    return { x: p.x + (ux / d) * (r + gap), y: p.y + (uy / d) * (r + gap) };
  };
  const a = rim(from, 2);
  const b = rim(to, 4);
  // The middle of the curve, and the label just beyond it, on the bent side.
  const px = 0.25 * a.x + 0.5 * cx + 0.25 * b.x;
  const py = 0.25 * a.y + 0.5 * cy + 0.25 * b.y;
  const side = bend >= 0 ? 1 : -1;
  // The label grows away from the curve: to the left of a curve bent left,
  // to the right of one bent right, centred above or below a level one.
  const lx = nx * side;
  const ly = ny * side;
  const anchor = Math.abs(lx) < 0.4 ? 'middle' : lx < 0 ? 'end' : 'start';
  return (
    <g>
      <path
        d={`M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`}
        markerEnd="url(#arrow)"
        style={{ fill: 'none', stroke: color.line, strokeWidth: 1.5, strokeDasharray: dashed ? '4 4' : undefined }}
      />
      <Caption x={px + lx * labelOffset} y={py + ly * labelOffset + 4} size={size} anchor={anchor}>
        {text}
      </Caption>
    </g>
  );
}

function Graph({ viewBox, nodes, edges, r, size }) {
  return (
    <Diagram label={label} viewBox={viewBox}>
      {edges.map((edge) => (
        <Edge key={edge.text} {...edge} from={nodes[edge.from]} to={nodes[edge.to]} r={r} size={size - 1} />
      ))}
      {Object.values(nodes).map((node) => (
        <Circle key={node.title} node={node} r={r} size={size} />
      ))}
    </Diagram>
  );
}

const kinds = {
  ana: { icon: PersonOutlined, title: 'Ana', kind: 'a person', accent: true, above: true },
  club: { icon: GroupsOutlined, title: 'Physics club', kind: 'a group', above: true },
  note: { icon: NotesOutlined, title: 'A note', kind: 'a post' },
  day: { icon: EventOutlined, title: 'Open day', kind: 'an event' },
  reply: { icon: ReplyOutlined, title: 'A reply', kind: 'from mastodon.social' },
};

const place = (positions) =>
  Object.fromEntries(Object.entries(positions).map(([key, [x, y]]) => [key, { ...kinds[key], x, y }]));

// `inward` bends Ana's way to the Open day towards the middle, where a narrow
// layout has room for its label.
const edges = (bend, inward) => [
  { from: 'ana', to: 'club', bend: -bend, text: 'follows' },
  { from: 'ana', to: 'note', bend, text: 'wrote' },
  { from: 'note', to: 'club', bend, text: 'posted in' },
  { from: 'ana', to: 'day', bend: inward ? -bend : bend, text: 'going to' },
  { from: 'reply', to: 'note', bend, text: 'replies to', dashed: true },
];

function Wide() {
  return (
    <Graph
      viewBox="70 24 560 376"
      r={34}
      size={14}
      nodes={place({ ana: [170, 100], club: [550, 100], note: [360, 215], day: [170, 320], reply: [550, 320] })}
      edges={edges(36)}
    />
  );
}

function Narrow() {
  return (
    <Graph
      viewBox="0 0 400 450"
      r={28}
      size={13}
      nodes={place({ ana: [96, 84], club: [344, 84], note: [236, 230], day: [96, 360], reply: [330, 360] })}
      edges={edges(28)}
    />
  );
}

// Nodes and the edges between them: one graph for everything, including
// what came from other servers.
export default function GraphDiagram() {
  return (
    <Box data-pagefind-ignore sx={{ maxWidth: 760 }}>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Wide />
      </Box>
      <Box sx={{ display: { sm: 'none' }, maxWidth: 400 }}>
        <Narrow />
      </Box>
    </Box>
  );
}
