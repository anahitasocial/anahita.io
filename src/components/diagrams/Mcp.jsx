import Box from '@mui/material/Box';
import ApiOutlined from '@mui/icons-material/ApiOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import SmartToyOutlined from '@mui/icons-material/SmartToyOutlined';

import { Caption, Diagram, Link, Node, Overline, color } from './parts';

const label =
  'Your agent, in Claude, Cursor or VS Code, asks Anahita MCP over the Model Context Protocol. Anahita MCP runs on your computer, or at mcp.anahita.io, with six tools that only read, searching by words. It answers from two files it fetches from www.anahita.io: the docs, and the API reference, both made from the docs of Anahita Services and Anahita Web every night.';

// The server: its name, where it runs, and its tools in two groups.
function Server({ x, y, w }) {
  const inner = { x: x + 20, w: w - 40 };
  return (
    <g>
      <rect x={x} y={y} width={w} height={296} rx={16} style={{ fill: 'none', stroke: color.primary, strokeWidth: 1.5 }} />
      <text x={x + w / 2} y={y + 34} textAnchor="middle" style={{ fill: color.text, fontSize: 17, fontWeight: 500 }}>Anahita MCP</text>
      <Caption x={x + w / 2} y={y + 54}>on your computer, or mcp.anahita.io</Caption>
      <Node x={inner.x} y={y + 72} w={inner.w} h={64} title="Docs tools" lines={['search_docs, list_docs, read_doc']} size={14} />
      <Node x={inner.x} y={y + 148} w={inner.w} h={64} title="API tools" lines={['list_endpoints, read_endpoint, read_shape']} size={14} />
      <Node x={inner.x} y={y + 224} w={inner.w} h={52} title="Read only" lines={['searched by words, nothing changed']} size={13} />
    </g>
  );
}

function Wide() {
  const top = 40;
  const mid = top + 148;
  return (
    <Diagram label={label} viewBox="-1 0 962 360">
      <Overline x={0} y={28}>YOUR AGENT</Overline>
      <Node x={0} y={mid - 40} w={220} h={80} icon={SmartToyOutlined} title="Your AI client" lines={['Claude, Cursor, VS Code']} size={14} />
      <Link d={`M220 ${mid} L322 ${mid}`} both />
      <Caption x={271} y={mid - 10}>MCP</Caption>

      <Overline x={326} y={28}>THE SERVER</Overline>
      <Server x={326} y={top} w={320} />

      <Overline x={740} y={28}>WWW.ANAHITA.IO</Overline>
      <Node x={740} y={mid - 96} w={220} h={80} icon={DescriptionOutlined} title="The docs" lines={['docs/index.json']} size={14} />
      <Node x={740} y={mid + 16} w={220} h={80} icon={ApiOutlined} title="The API reference" lines={['api/anahita.json']} size={14} />
      <Link d={`M736 ${mid - 56} C700 ${mid - 56} 690 ${mid - 20} 650 ${mid - 20}`} />
      <Link d={`M736 ${mid + 56} C700 ${mid + 56} 690 ${mid + 20} 650 ${mid + 20}`} />
      <Caption x={850} y={mid + 128}>from both repositories&apos; docs,</Caption>
      <Caption x={850} y={mid + 146}>every night</Caption>
    </Diagram>
  );
}

function Narrow() {
  return (
    <Diagram label={label} viewBox="-1 0 362 640">
      <Overline x={0} y={20}>YOUR AGENT</Overline>
      <Node x={0} y={32} w={360} h={72} icon={SmartToyOutlined} title="Your AI client" lines={['Claude, Cursor, VS Code']} size={14} />
      <Link d="M180 104 L180 150" both />
      <Caption x={200} y={132} anchor="start">MCP</Caption>
      <Overline x={0} y={146}>THE SERVER</Overline>
      <Server x={0} y={154} w={360} />
      <Link d="M90 512 L90 466" />
      <Link d="M270 512 L270 466" />
      <Overline x={0} y={506}>WWW.ANAHITA.IO</Overline>
      <Node x={0} y={516} w={170} h={80} icon={DescriptionOutlined} title="The docs" lines={['docs/index.json']} size={13} />
      <Node x={190} y={516} w={170} h={80} icon={ApiOutlined} title="API reference" lines={['api/anahita.json']} size={13} />
      <Caption x={180} y={624}>from both repositories&apos; docs, every night</Caption>
    </Diagram>
  );
}

// An agent, Anahita MCP, and what it reads (anahita-mcp's README).
export default function McpDiagram() {
  return (
    <Box data-pagefind-ignore>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Wide />
      </Box>
      <Box sx={{ display: { md: 'none' }, maxWidth: 400 }}>
        <Narrow />
      </Box>
    </Box>
  );
}
