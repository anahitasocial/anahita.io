import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import PhoneIphoneOutlined from '@mui/icons-material/PhoneIphoneOutlined';
import TerminalOutlined from '@mui/icons-material/TerminalOutlined';
import WebOutlined from '@mui/icons-material/WebOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';

import { backing, groups } from '../../data/services';
import { Diagram, DiagramIcon, Link, color } from './parts';
import { BlueskyMark } from './marks';

// What runs on an instance, drawn from src/data/services.js, as the recipes
// draw it (anahita-recipes' docs/what-runs.py): the services always run, a
// row for each kind, with what each gives; those run only if the site
// offers what they bring (dashed); what keeps the data; and what runs by
// the clock or once. Flat: fills and thin lines, no shadows. The neutrals
// are the theme's, so it follows light and dark; TONE says whether the
// kinds are told apart by colour or drawn in the ink alone.

const TONE = 'colour';

const all = groups.flatMap(({ services }) => services);
const isGrpc = ({ name }) => name.endsWith('-grpc-service');
const isJob = ({ name }) => !name.endsWith('-service') && name !== 'web-shell';

const webShell = all.find(({ name }) => name === 'web-shell');
const always = all.filter((s) => !s.optional && !isGrpc(s) && !isJob(s)).map(({ name }) => name);
const shared = all.filter(isGrpc).map(({ name }) => name);
const jobs = all.filter(isJob).map(({ name }) => name);
const offered = all.filter((s) => s.optional && s !== webShell);

// What each service always run gives, short enough for its card, and its
// kind, which is its row. A service not named here is drawn in a row of
// its own at the end, with nothing under its name.
const gives = {
  'actor-service': 'every kind of profile',
  'text-service': 'notes, articles, topics',
  'identity-image-service': 'profile and cover photos',
  'feed-service': 'feeds, reposts',
  'socialgraph-service': 'follows, blocks, mutes',
  'like-service': 'likes',
  'notification-service': 'notifications',
  'search-service': 'search',
  'hashtag-service': 'hashtags',
  'location-service': 'locations, maps',
  'auth-service': 'sign-in, accounts',
  'abuse-report-service': 'reports',
  'graph-grpc-service': 'the graph',
  'file-grpc-service': 'files',
  'mail-grpc-service': 'email',
};
const kindOf = {
  'actor-service': 'posts',
  'text-service': 'posts',
  'identity-image-service': 'posts',
  'feed-service': 'people',
  'socialgraph-service': 'people',
  'like-service': 'people',
  'notification-service': 'people',
  'search-service': 'finding',
  'hashtag-service': 'finding',
  'location-service': 'finding',
  'auth-service': 'safety',
  'abuse-report-service': 'safety',
};
const KINDS = ['posts', 'people', 'finding', 'safety', 'other'];
const rows = KINDS
  .map((kind) => always.filter((name) => (kindOf[name] || 'other') === kind))
  .filter((row) => row.length > 0);

// The accents: one for each kind, in colour, or the ink for all of them.
const COLOURS = {
  posts: '#2563EB',
  people: '#7C3AED',
  finding: '#0D9488',
  safety: '#EA580C',
  other: color.muted,
  shared: '#CA8A04',
  offered: '#C026D3',
};
const accent = (kind) => (TONE === 'colour' ? COLOURS[kind] : color.text);
const STORE_COLOURS = { MySQL: '#00758F', Valkey: '#DC2626', RabbitMQ: '#F97316' };
// What each store keeps, short enough for its card.
const keeps = {
  MySQL: 'everything kept',
  Valkey: 'sessions',
  RabbitMQ: "the services' events",
  'Object storage': 'files, photos, videos',
};
const storeAccent = (name) => (TONE === 'colour' ? STORE_COLOURS[name] || '#0D9488' : color.text);

const legend = [
  ...(TONE === 'colour' ? [
    ['posts', 'profiles and posts'],
    ['people', 'between people'],
    ['finding', 'finding things'],
    ['safety', 'signing in, and safety'],
    ['shared', 'shared, over gRPC'],
  ] : []),
  ['dashed', 'only if the site offers it'],
];

const label = `Anahita's apps (web, mobile and command line) and other servers, on the fediverse and on Bluesky and the Atmosphere, reach an instance through one gateway, and the web app through web-shell. ${always.length} services always run, each with what it gives: ${always.map((name) => (gives[name] ? `${name}, ${gives[name]}` : name)).join('; ')}. ${shared.length} are shared by the others over gRPC: the graph, files and email. ${offered.length + 1} others, drawn dashed, run only if the site offers what they bring: ${[...offered, webShell].map(({ brings }) => brings.toLowerCase()).join('; ')}. ${backing.map(({ name }) => name).join(', ')} keep the data, and ${jobs.join(' and ')} run by the clock or once.`;

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const panelFill = 'var(--mui-palette-action-hover)';

// A link as a soft curve: it leaves straight down and arrives straight down,
// so every arrowhead points the same way.
const curve = (x1, y1, x2, y2) => {
  const mid = (y1 + y2) / 2;
  return `M${x1} ${y1} C${x1} ${mid} ${x2} ${mid} ${x2} ${y2}`;
};

// A section's name: small capitals, quiet.
function Label({ x, y, children }) {
  return (
    <text x={x} y={y} style={{ fill: color.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>
      {children.toUpperCase()}
    </text>
  );
}

// A service always run: a bar of its kind's colour, its name, what it gives.
function Service({ x, y, w, name, kind }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={6} style={{ fill: color.paper, stroke: color.border }} />
      <rect x={x} y={y + 8} width={3} height={28} rx={1.5} style={{ fill: accent(kind) }} />
      <text x={x + w / 2 + 1} y={y + (gives[name] ? 19 : 27)} textAnchor="middle" style={{ fill: color.text, fontSize: 11, fontWeight: 600 }}>
        {name}
      </text>
      {gives[name] && (
        <text x={x + w / 2 + 1} y={y + 34} textAnchor="middle" style={{ fill: color.muted, fontSize: 10.5 }}>
          {gives[name]}
        </text>
      )}
    </g>
  );
}

// A card with a title and a line under it: dashed for what is optional, a
// dot of colour before the title where it has one, dark for the gateway.
function Box2({ x, y, w, h, title, line, dashed, dot, dark, center, monoLine }) {
  const fill = dark ? color.text : color.paper;
  const ink = dark ? color.paper : color.text;
  const tx = center ? x + w / 2 : x + (dot ? 26 : 14);
  const anchor = center ? 'middle' : 'start';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        style={{ fill, stroke: dashed ? color.line : (dark ? color.text : color.border), strokeDasharray: dashed ? '4 3' : undefined }}
      />
      {dot && <circle cx={x + 14} cy={y + h / 2 - (line ? 7 : 0)} r={3.5} style={{ fill: dot }} />}
      <text x={tx} y={y + h / 2 + (line ? -3 : 4)} textAnchor={anchor} style={{ fill: ink, fontSize: 13, fontWeight: 600 }}>
        {title}
      </text>
      {line && (
        <text x={tx} y={y + h / 2 + 13} textAnchor={anchor} style={{ fill: dark ? ink : color.muted, opacity: dark ? 0.75 : 1, fontSize: 11, fontFamily: monoLine ? mono : undefined }}>
          {line}
        </text>
      )}
    </g>
  );
}

// Who sends requests: a card with its title, and an icon for each, its
// name under it, in the ink: black, or white in dark mode, as Bluesky asks
// of its mark.
const APPS = [[WebOutlined, 'Web'], [PhoneIphoneOutlined, 'Mobile'], [TerminalOutlined, 'CLI']];
const SERVERS = [[HubOutlined, 'Fediverse'], [BlueskyMark, 'Bluesky']];
function Senders({ x, y, w, h, title, items }) {
  const step = Math.min(84, (w - 16) / items.length);
  const start = x + w / 2 - (step * items.length) / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} style={{ fill: color.paper, stroke: color.border }} />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" style={{ fill: color.text, fontSize: 13, fontWeight: 600 }}>
        {title}
      </text>
      {items.map(([icon, name], i) => {
        const cx = start + (i + 0.5) * step;
        return (
          <g key={name}>
            <DiagramIcon icon={icon} x={cx - 9} y={y + 32} size={18} mark />
            <text x={cx} y={y + h - 10} textAnchor="middle" style={{ fill: color.muted, fontSize: 11 }}>{name}</text>
          </g>
        );
      })}
    </g>
  );
}

// A job: dashed, its name alone.
function Job({ x, y, w, name }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={36} rx={6} style={{ fill: color.paper, stroke: color.line, strokeDasharray: '4 3' }} />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" style={{ fill: color.text, fontSize: 11.5, fontFamily: mono }}>
        {name}
      </text>
    </g>
  );
}

// What the colours mean, `cols` to a row, from (x, y).
function Legend({ x, y, cols, step }) {
  return legend.map(([kind, words], i) => {
    const lx = x + (i % cols) * step;
    const ly = y + Math.floor(i / cols) * 22;
    return (
      <g key={kind}>
        {kind === 'dashed' ? (
          <>
            <rect x={lx} y={ly - 9} width={16} height={11} rx={2} style={{ fill: color.paper, stroke: color.line, strokeDasharray: '3 2' }} />
            <circle cx={lx + 8} cy={ly - 3.5} r={2} style={{ fill: accent('offered') }} />
          </>
        ) : (
          <rect x={lx + 6} y={ly - 9} width={3} height={11} rx={1.5} style={{ fill: accent(kind) }} />
        )}
        <text x={lx + 24} y={ly + 1} style={{ fill: color.text, fontSize: 11.5 }}>{words}</text>
      </g>
    );
  });
}

// Services in rows, `cols` to a row and a row for each kind; returns the
// drawing and where it ends.
function serviceRows({ x, y, cw, gap, cols }) {
  let row = 0;
  const drawn = [];
  rows.forEach((names) => {
    names.forEach((name, i) => {
      drawn.push(
        <Service
          key={name}
          name={name}
          kind={kindOf[name] || 'other'}
          x={x + (i % cols) * (cw + gap)}
          y={y + (row + Math.floor(i / cols)) * 52}
          w={cw}
        />,
      );
    });
    row += Math.ceil(names.length / cols);
  });
  return { drawn, end: y + row * 52 - 8 };
}

function Wide() {
  const W = 960;
  const clients = 0;
  const frame = 116;
  const door = frame + 44;
  const panel = door + 108;
  const grid = panel + 40;

  const left = { x: 16, w: 600 };
  const services = serviceRows({ x: 32, y: grid, cw: 134, gap: 8, cols: 4 });
  const sharedLabel = services.end + 30;
  const sharedY = sharedLabel + 12;
  const leftH = sharedY + 44 + 16 - panel;

  const right = { x: 632, w: 312 };
  const rightH = 40 + offered.length * 50 + 6;

  const keptLabel = panel + Math.max(leftH, rightH) + 32;
  const kept = keptLabel + 12;
  const jobsLabel = kept + 44 + 28;
  const jobsY = jobsLabel + 12;
  const frameBottom = jobsY + 36 + 20;
  const legendY = frameBottom + 30;
  const bottom = legendY + Math.ceil(legend.length / 6) * 22;

  return (
    <Diagram label={label} viewBox={`-2 -2 ${W + 4} ${bottom + 4}`}>
      <Senders x={160} y={clients} w={240} h={80} title="Anahita apps" items={APPS} />
      <Senders x={560} y={clients} w={240} h={80} title="Other servers" items={SERVERS} />

      <rect x={0} y={frame} width={W} height={frameBottom - frame} rx={12} style={{ fill: panelFill, stroke: color.border }} />
      <Label x={16} y={frame + 22}>One instance</Label>
      <Link d={curve(230, 80, 156, door - 4)} />
      <Link d={curve(320, 80, 440, door - 4)} />
      <Link d={curve(680, 80, 520, door - 4)} />
      <Box2 x={48} y={door} w={216} h={48} title="web-shell" line={webShell.brings.toLowerCase()} dashed center />
      <Box2 x={372} y={door} w={216} h={48} title="gateway" line="nginx: one way in, checks sign-ins" dark center />
      <Link d={curve(440, door + 48, 320, panel - 4)} />
      <Link d={curve(520, door + 48, 780, panel - 4)} />

      <rect x={left.x} y={panel} width={left.w} height={leftH} rx={10} style={{ fill: color.paper, stroke: color.border }} />
      <Label x={32} y={panel + 24}>Always run · the API</Label>
      {services.drawn}
      <Label x={32} y={sharedLabel}>Shared by the others, over gRPC</Label>
      {shared.map((name, i) => <Service key={name} name={name} kind="shared" x={32 + i * 189} y={sharedY} w={181} />)}

      <rect x={right.x} y={panel} width={right.w} height={rightH} rx={10} style={{ fill: color.paper, stroke: color.border }} />
      <Label x={648} y={panel + 24}>Only if the site offers it</Label>
      {offered.map((service, i) => (
        <Box2 key={service.name} x={648} y={grid + i * 50} w={280} h={42} title={service.brings} line={service.name} dashed dot={accent('offered')} monoLine />
      ))}

      <Label x={32} y={keptLabel}>Kept</Label>
      {backing.map(({ name, text }, i) => (
        <Box2 key={name} x={32 + i * 148} y={kept} w={140} h={44} title={name} line={keeps[name] || text} dot={storeAccent(name)} />
      ))}
      <Label x={32} y={jobsLabel}>By the clock, and once</Label>
      {jobs.map((name, i) => <Job key={name} name={name} x={32 + i * 220} y={jobsY} w={212} />)}

      <Legend x={16} y={legendY} cols={6} step={156} />
    </Diagram>
  );
}

function Narrow() {
  const W = 360;
  const frame = 116;
  const door = frame + 44;
  const panel = door + 100;
  const grid = panel + 40;

  const services = serviceRows({ x: 16, y: grid, cw: 160, gap: 8, cols: 2 });
  const sharedLabel = services.end + 30;
  const sharedY = sharedLabel + 12;
  const sharedRows = Math.ceil(shared.length / 2);
  const alwaysH = sharedY + sharedRows * 52 - 8 + 16 - panel;

  const offeredY = panel + alwaysH + 16;
  const offeredH = 40 + offered.length * 50 + 6;

  const keptLabel = offeredY + offeredH + 32;
  const kept = keptLabel + 12;
  const keptRows = Math.ceil(backing.length / 2);
  const jobsLabel = kept + keptRows * 52 - 8 + 28;
  const jobsY = jobsLabel + 12;
  const frameBottom = jobsY + Math.ceil(jobs.length / 2) * 44 - 8 + 20;
  const legendY = frameBottom + 30;
  const bottom = legendY + Math.ceil(legend.length / 2) * 22;

  return (
    <Diagram label={label} viewBox={`-2 -2 ${W + 4} ${bottom + 4}`}>
      <Senders x={0} y={0} w={200} h={80} title="Anahita apps" items={APPS} />
      <Senders x={212} y={0} w={148} h={80} title="Other servers" items={SERVERS} />

      <rect x={0} y={frame} width={W} height={frameBottom - frame} rx={12} style={{ fill: panelFill, stroke: color.border }} />
      <Label x={16} y={frame + 22}>One instance</Label>
      <Link d={curve(70, 80, 90, door - 4)} />
      <Link d={curve(140, 80, 240, door - 4)} />
      <Link d={curve(286, 80, 286, door - 4)} />
      <Box2 x={16} y={door} w={156} h={48} title="web-shell" line="the web app" dashed center />
      <Box2 x={188} y={door} w={156} h={48} title="gateway" line="nginx: one way in" dark center />

      <rect x={8} y={panel} width={W - 16} height={alwaysH} rx={10} style={{ fill: color.paper, stroke: color.border }} />
      <Label x={16} y={panel + 24}>Always run · the API</Label>
      {services.drawn}
      <Label x={16} y={sharedLabel}>Shared by the others, over gRPC</Label>
      {shared.map((name, i) => <Service key={name} name={name} kind="shared" x={16 + (i % 2) * 168} y={sharedY + Math.floor(i / 2) * 52} w={160} />)}

      <rect x={8} y={offeredY} width={W - 16} height={offeredH} rx={10} style={{ fill: color.paper, stroke: color.border }} />
      <Label x={16} y={offeredY + 24}>Only if the site offers it</Label>
      {offered.map((service, i) => (
        <Box2 key={service.name} x={16} y={offeredY + 40 + i * 50} w={W - 32} h={42} title={service.brings} line={service.name} dashed dot={accent('offered')} monoLine />
      ))}

      <Label x={16} y={keptLabel}>Kept</Label>
      {backing.map(({ name, text }, i) => (
        <Box2 key={name} x={16 + (i % 2) * 168} y={kept + Math.floor(i / 2) * 52} w={160} h={44} title={name} line={keeps[name] || text} dot={storeAccent(name)} />
      ))}
      <Label x={16} y={jobsLabel}>By the clock, and once</Label>
      {jobs.map((name, i) => <Job key={name} name={name} x={16 + (i % 2) * 168} y={jobsY + Math.floor(i / 2) * 44} w={160} />)}

      <Legend x={0} y={legendY} cols={2} step={180} />
    </Diagram>
  );
}

// What runs on an instance, and what a site may leave out.
export default function WhatRuns() {
  return (
    <Card data-pagefind-ignore sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Wide />
      </Box>
      <Box sx={{ display: { md: 'none' }, maxWidth: 400 }}>
        <Narrow />
      </Box>
    </Card>
  );
}
