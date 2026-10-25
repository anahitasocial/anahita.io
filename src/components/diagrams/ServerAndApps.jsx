import Box from '@mui/material/Box';
import { Caption, Diagram, Link, Node, Overline, color } from './parts';

const label =
  'Anahita Web, Mobile and CLI reach Anahita Services, your instance, through one open API. Your instance speaks to the fediverse and to Bluesky.';

function Wide() {
  return (
    <Diagram label={label} viewBox="0 0 960 330">
      <Overline x={0} y={28}>APPS</Overline>
      <Node x={0} y={48} w={210} h={64} title="Anahita Web" lines={['in a browser']} />
      <Node x={0} y={132} w={210} h={64} title="Anahita Mobile" lines={['on a phone · coming soon']} />
      <Node x={0} y={216} w={210} h={64} title="Anahita CLI" lines={['in a terminal · coming soon']} />
      <Link d="M210 80 C244 80 240 164 268 164" />
      <Link d="M210 164 L268 164" />
      <Link d="M210 248 C244 248 240 164 268 164" />

      <Node x={270} y={132} w={110} h={64} title="Open API" lines={['OpenAPI 3.1']} />
      <Link d="M380 164 L436 164" both />

      <Overline x={440} y={28}>SERVER</Overline>
      <rect x={440} y={40} width={260} height={256} rx={16} style={{ fill: 'none', stroke: color.primary, strokeWidth: 1.5 }} />
      <text x={570} y={74} textAnchor="middle" style={{ fill: color.text, fontSize: 17, fontWeight: 500 }}>Anahita Services</text>
      <Caption x={570} y={94}>your instance</Caption>
      <Node x={460} y={112} w={220} h={48} title="One gateway" size={14} />
      <Node x={460} y={172} w={220} h={48} title="About thirty services" size={14} />
      <Node x={460} y={232} w={220} h={48} title="Data, events and files" size={14} />

      <Overline x={760} y={28}>THE OPEN SOCIAL WEB</Overline>
      <Node x={760} y={64} w={200} h={80} title="The fediverse" lines={['ActivityPub: Mastodon,', 'Pixelfed and the rest']} />
      <Node x={760} y={184} w={200} h={80} title="Bluesky" lines={['AT Protocol']} />
      <Link d="M702 104 L756 104" both />
      <Link d="M702 224 L756 224" both />
    </Diagram>
  );
}

function Narrow() {
  return (
    <Diagram label={label} viewBox="0 0 360 640">
      <Overline x={0} y={20}>APPS</Overline>
      <Node x={0} y={32} w={108} h={64} title="Web" lines={['browser']} size={14} />
      <Node x={126} y={32} w={108} h={64} title="Mobile" lines={['phone']} size={14} />
      <Node x={252} y={32} w={108} h={64} title="CLI" lines={['terminal']} size={14} />
      <Link d="M54 96 C54 124 180 118 180 144" />
      <Link d="M180 96 L180 144" />
      <Link d="M306 96 C306 124 180 118 180 144" />

      <Node x={110} y={146} w={140} h={56} title="Open API" lines={['OpenAPI 3.1']} size={14} />
      <Link d="M180 202 L180 244" both />

      <Overline x={0} y={238}>SERVER</Overline>
      <rect x={0} y={248} width={360} height={232} rx={16} style={{ fill: 'none', stroke: color.primary, strokeWidth: 1.5 }} />
      <text x={180} y={280} textAnchor="middle" style={{ fill: color.text, fontSize: 17, fontWeight: 500 }}>Anahita Services</text>
      <Caption x={180} y={300}>your instance</Caption>
      <Node x={20} y={316} w={320} h={44} title="One gateway" size={14} />
      <Node x={20} y={368} w={320} h={44} title="About thirty services" size={14} />
      <Node x={20} y={420} w={320} h={44} title="Data, events and files" size={14} />

      <Link d="M85 482 L85 540" both />
      <Link d="M275 482 L275 540" both />
      <Node x={0} y={544} w={170} h={80} title="The fediverse" lines={['ActivityPub']} size={14} />
      <Node x={190} y={544} w={170} h={80} title="Bluesky" lines={['AT Protocol']} size={14} />
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
