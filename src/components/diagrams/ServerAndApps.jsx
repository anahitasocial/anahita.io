import Box from '@mui/material/Box';
import CloudOutlined from '@mui/icons-material/CloudOutlined';
import DnsOutlined from '@mui/icons-material/DnsOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import PhoneIphoneOutlined from '@mui/icons-material/PhoneIphoneOutlined';
import TerminalOutlined from '@mui/icons-material/TerminalOutlined';

import { groups } from '../../data/services';
import { Caption, Diagram, DiagramIcon, Link, Node, Overline, color } from './parts';

const label =
  'Anahita Web, Mobile and CLI reach Anahita Services, your instance, through one open API. Your instance speaks to the fediverse and to Bluesky.';

// The services by their short names, as on the Products page; nginx is the
// gateway, drawn on its own.
const names = groups
  .flatMap(({ services }) => services.map(({ name }) => name.replace(/(-grpc)?-service$/, '')))
  .filter((name) => name !== 'nginx');

// SVG text does not wrap: the names, comma separated, in lines of at most
// `width` characters.
function wrap(width) {
  const lines = [''];
  names.forEach((name, i) => {
    const word = i < names.length - 1 ? `${name}, ` : name;
    if ((lines[lines.length - 1] + word).trimEnd().length > width) lines.push('');
    lines[lines.length - 1] += word;
  });
  return lines.map((line) => line.trimEnd());
}

// The server: its name, the gateway, the services by name, and what lies
// underneath. Returns what it drew and its height.
function Server({ x, y, w, width }) {
  const lines = wrap(width);
  const inner = { x: x + 20, w: w - 40 };
  const gateway = y + 72;
  const services = gateway + 64;
  const servicesH = 36 + lines.length * 16;
  const data = services + servicesH + 12;
  const h = data + 52 + 20 - y;

  return {
    h,
    drawn: (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={16} style={{ fill: 'none', stroke: color.primary, strokeWidth: 1.5 }} />
        {/* The icon and the name, centred together (the name is about 144 wide). */}
        <DiagramIcon icon={DnsOutlined} x={x + w / 2 - 86} y={y + 16} size={22} />
        <text x={x + w / 2 - 58} y={y + 34} style={{ fill: color.text, fontSize: 17, fontWeight: 500 }}>Anahita Services</text>
        <Caption x={x + w / 2} y={y + 54}>your instance</Caption>
        <Node x={inner.x} y={gateway} w={inner.w} h={52} title="One gateway" lines={['nginx']} size={14} />
        <rect x={inner.x} y={services} width={inner.w} height={servicesH} rx={12} style={{ fill: color.paper, stroke: color.border }} />
        <text x={x + w / 2} y={services + 24} textAnchor="middle" style={{ fill: color.text, fontSize: 14, fontWeight: 500 }}>Services</text>
        {lines.map((line, i) => (
          <text key={line} x={x + w / 2} y={services + 44 + i * 16} textAnchor="middle" style={{ fill: color.muted, fontSize: 11.5 }}>
            {line}
          </text>
        ))}
        <Node x={inner.x} y={data} w={inner.w} h={52} title="Data, events and files" lines={['MySQL, Redis, RabbitMQ, S3']} size={14} />
      </g>
    ),
  };
}

function Wide() {
  const server = Server({ x: 430, y: 40, w: 300, width: 40 });
  const mid = 40 + server.h / 2;
  const apps = [mid - 104, mid - 32, mid + 40];
  const height = 40 + server.h + 24;

  return (
    <Diagram label={label} viewBox={`0 0 960 ${height}`}>
      <Overline x={0} y={28}>APPS</Overline>
      <Node x={0} y={apps[0]} w={210} h={64} icon={LanguageOutlined} title="Anahita Web" lines={['in a browser']} />
      <Node x={0} y={apps[1]} w={210} h={64} icon={PhoneIphoneOutlined} title="Anahita Mobile" lines={['on a phone · coming soon']} />
      <Node x={0} y={apps[2]} w={210} h={64} icon={TerminalOutlined} title="Anahita CLI" lines={['in a terminal · coming soon']} />
      <Link d={`M210 ${apps[0] + 32} C240 ${apps[0] + 32} 236 ${mid} 262 ${mid}`} />
      <Link d={`M210 ${mid} L262 ${mid}`} />
      <Link d={`M210 ${apps[2] + 32} C240 ${apps[2] + 32} 236 ${mid} 262 ${mid}`} />

      <Node x={264} y={mid - 32} w={110} h={64} title="Open API" lines={['OpenAPI 3.1']} />
      <Link d={`M374 ${mid} L426 ${mid}`} both />

      <Overline x={430} y={28}>SERVER</Overline>
      {server.drawn}

      <Overline x={780} y={28}>THE OPEN SOCIAL WEB</Overline>
      <Node x={780} y={mid - 100} w={180} h={80} icon={HubOutlined} title="The fediverse" lines={['ActivityPub', 'Mastodon, Pixelfed…']} size={14} />
      <Node x={780} y={mid + 20} w={180} h={80} icon={CloudOutlined} title="Bluesky" lines={['AT Protocol']} size={14} />
      <Link d={`M732 ${mid - 60} L776 ${mid - 60}`} both />
      <Link d={`M732 ${mid + 60} L776 ${mid + 60}`} both />
    </Diagram>
  );
}

function Narrow() {
  const server = Server({ x: 0, y: 248, w: 360, width: 48 });
  const bottom = 248 + server.h;

  return (
    <Diagram label={label} viewBox={`0 0 360 ${bottom + 144}`}>
      <Overline x={0} y={20}>APPS</Overline>
      <Node x={0} y={32} w={108} h={64} icon={LanguageOutlined} title="Web" lines={['browser']} size={14} />
      <Node x={126} y={32} w={108} h={64} icon={PhoneIphoneOutlined} title="Mobile" lines={['phone']} size={14} />
      <Node x={252} y={32} w={108} h={64} icon={TerminalOutlined} title="CLI" lines={['terminal']} size={14} />
      <Link d="M54 96 C54 124 180 118 180 144" />
      <Link d="M180 96 L180 144" />
      <Link d="M306 96 C306 124 180 118 180 144" />

      <Node x={110} y={146} w={140} h={56} title="Open API" lines={['OpenAPI 3.1']} size={14} />
      <Link d="M180 202 L180 244" both />

      <Overline x={0} y={238}>SERVER</Overline>
      {server.drawn}

      <Link d={`M85 ${bottom + 2} L85 ${bottom + 58}`} both />
      <Link d={`M275 ${bottom + 2} L275 ${bottom + 58}`} both />
      <Node x={0} y={bottom + 62} w={170} h={80} icon={HubOutlined} title="The fediverse" lines={['ActivityPub']} size={14} />
      <Node x={190} y={bottom + 62} w={170} h={80} icon={CloudOutlined} title="Bluesky" lines={['AT Protocol']} size={14} />
    </Diagram>
  );
}

// Apps, the open API, the server, and the networks it speaks to.
export default function ServerAndApps() {
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
