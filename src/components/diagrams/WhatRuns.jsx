import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { backing, groups } from '../../data/services';
import { Diagram, Link, Node, color } from './parts';

// What runs on an instance, drawn from src/data/services.js: the services
// always run, those run only if the site offers what they bring (dashed),
// what keeps the data, and what runs by the clock or once. The same as the
// diagram in anahita-recipes' commons/README.md, in the site's colours.

const all = groups.flatMap(({ services }) => services);
const isGrpc = ({ name }) => name.endsWith('-grpc-service');
const isJob = ({ name }) => !name.endsWith('-service') && name !== 'web-shell';

const webShell = all.find(({ name }) => name === 'web-shell');
const always = all.filter((s) => !s.optional && !isGrpc(s) && !isJob(s)).map(({ name }) => name);
const shared = all.filter(isGrpc).map(({ name }) => name);
const jobs = all.filter(isJob).map(({ name }) => name);
const offered = all.filter((s) => s.optional && s !== webShell);
const kept = backing.map(({ name }) => name);

const label = `Apps and other servers reach an instance through one gateway, and the web app through web-shell. ${always.length} services always run, with ${shared.length} shared over gRPC. ${offered.length + 1} others, drawn dashed, run only if the site offers what they bring: ${[...offered, webShell].map(({ brings }) => brings.toLowerCase()).join(', ')}. ${kept.join(', ')} keep the data, and ${jobs.join(' and ')} run by the clock or once.`;

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// A heading inside the instance.
function Heading({ x, y, children }) {
  return (
    <text x={x} y={y} style={{ fill: color.text, fontSize: 14, fontWeight: 500 }}>
      {children}
    </text>
  );
}

// A service by its name, small.
function Name({ x, y, w, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={30} rx={8} style={{ fill: 'var(--mui-palette-action-hover)', stroke: color.border }} />
      <text x={x + w / 2} y={y + 19} textAnchor="middle" style={{ fill: color.text, fontSize: 11, fontFamily: mono }}>
        {children}
      </text>
    </g>
  );
}

// What a service brings, and its name under it, in a dashed box.
function Offered({ x, y, w, service }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={10} style={{ fill: color.paper, stroke: color.text, strokeWidth: 1, strokeDasharray: '5 4' }} />
      <text x={x + 14} y={y + 19} style={{ fill: color.text, fontSize: 13, fontWeight: 500 }}>
        {service.brings}
      </text>
      <text x={x + 14} y={y + 35} style={{ fill: color.muted, fontSize: 11, fontFamily: mono }}>
        {service.name}
      </text>
    </g>
  );
}

// Names in a grid of `cols` columns, from (x, y), `w` wide. Returns the
// drawing and its height.
function grid(names, { x, y, w, cols }) {
  const gap = 8;
  const cw = (w - gap * (cols - 1)) / cols;
  const rows = Math.ceil(names.length / cols);
  return {
    h: rows * 30 + (rows - 1) * gap,
    drawn: names.map((name, i) => (
      <Name key={name} x={x + (i % cols) * (cw + gap)} y={y + Math.floor(i / cols) * 38} w={cw}>
        {name}
      </Name>
    )),
  };
}

// A panel: a light frame with its heading.
function Panel({ x, y, w, h, title }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} style={{ fill: color.paper, stroke: color.border }} />
      <Heading x={x + 16} y={y + 26}>{title}</Heading>
    </g>
  );
}

function Wide() {
  // The front door, then the two panels side by side, then what keeps the
  // data and the jobs.
  const door = 96;
  const panels = door + 80;

  const left = { x: 20, w: 600 };
  const alwaysGrid = grid(always, { x: left.x + 16, y: panels + 42, w: left.w - 32, cols: 3 });
  const sharedY = panels + 42 + alwaysGrid.h + 36;
  const sharedGrid = grid(shared, { x: left.x + 16, y: sharedY, w: left.w - 32, cols: 3 });
  const leftH = sharedY + sharedGrid.h + 16 - panels;

  const right = { x: 640, w: 300 };
  const rightH = 42 + offered.length * 52 + 8;

  const keptY = panels + leftH + 36;
  const keptGrid = grid(kept, { x: left.x, y: keptY, w: left.w, cols: 4 });
  const jobsY = keptY + keptGrid.h + 40;
  const jobsGrid = grid(jobs, { x: left.x, y: jobsY, w: left.w, cols: 2 });
  const bottom = Math.max(jobsY + jobsGrid.h, panels + rightH);

  return (
    <Diagram label={label} viewBox={`-2 -2 964 ${bottom + 4}`}>
      <Node x={110} y={0} w={240} h={56} title="Apps" lines={['Anahita Web, Mobile, CLI']} size={14} />
      <Node x={610} y={0} w={240} h={56} title="Other servers" lines={['the fediverse, the Atmosphere']} size={14} />
      <Link d={`M210 56 L170 ${door - 4}`} />
      <Link d={`M260 56 L440 ${door - 4}`} />
      <Link d={`M730 56 L520 ${door - 4}`} />


      <g>
        <rect x={60} y={door} width={220} height={52} rx={12} style={{ fill: color.paper, stroke: color.text, strokeWidth: 1, strokeDasharray: '5 4' }} />
        <text x={170} y={door + 22} textAnchor="middle" style={{ fill: color.text, fontSize: 14, fontWeight: 500 }}>web-shell</text>
        <text x={170} y={door + 39} textAnchor="middle" style={{ fill: color.muted, fontSize: 12 }}>{webShell.brings.toLowerCase()}</text>
      </g>
      <Node x={380} y={door} w={200} h={52} title="gateway" lines={['nginx: one way in']} size={14} />
      <Link d={`M440 ${door + 52} L360 ${panels - 4}`} />
      <Link d={`M540 ${door + 52} L700 ${panels - 4}`} />

      <Panel x={left.x} y={panels} w={left.w} h={leftH} title="Always run" />
      {alwaysGrid.drawn}
      <text x={left.x + 16} y={sharedY - 12} style={{ fill: color.muted, fontSize: 12 }}>Shared by the others, over gRPC</text>
      {sharedGrid.drawn}

      <Panel x={right.x} y={panels} w={right.w} h={rightH} title="Only if the site offers it" />
      {offered.map((service, i) => (
        <Offered key={service.name} x={right.x + 16} y={panels + 42 + i * 52} w={right.w - 32} service={service} />
      ))}

      <Heading x={left.x} y={keptY - 12}>Kept</Heading>
      {keptGrid.drawn}
      <Heading x={left.x} y={jobsY - 12}>By the clock, and once</Heading>
      {jobsGrid.drawn}
    </Diagram>
  );
}

function Narrow() {
  const w = 360;
  const door = 96;
  const panels = door + 80;

  const alwaysGrid = grid(always, { x: 16, y: panels + 42, w: w - 32, cols: 2 });
  const sharedY = panels + 42 + alwaysGrid.h + 36;
  const sharedGrid = grid(shared, { x: 16, y: sharedY, w: w - 32, cols: 1 });
  const alwaysH = sharedY + sharedGrid.h + 16 - panels;

  const offeredY = panels + alwaysH + 16;
  const offeredH = 42 + offered.length * 52 + 8;

  const keptY = offeredY + offeredH + 36;
  const keptGrid = grid(kept, { x: 0, y: keptY, w, cols: 2 });
  const jobsY = keptY + keptGrid.h + 40;
  const jobsGrid = grid(jobs, { x: 0, y: jobsY, w, cols: 1 });
  const bottom = jobsY + jobsGrid.h;

  return (
    <Diagram label={label} viewBox={`-2 -2 ${w + 4} ${bottom + 4}`}>
      <Node x={0} y={0} w={170} h={56} title="Apps" lines={['Web, Mobile, CLI']} size={14} />
      <Node x={190} y={0} w={170} h={56} title="Other servers" lines={['fediverse, Atmosphere']} size={14} />
      <Link d={`M85 56 L85 ${door - 4}`} />
      <Link d={`M120 56 L250 ${door - 4}`} />
      <Link d={`M275 56 L275 ${door - 4}`} />

      <g>
        <rect x={0} y={door} width={170} height={52} rx={12} style={{ fill: color.paper, stroke: color.text, strokeWidth: 1, strokeDasharray: '5 4' }} />
        <text x={85} y={door + 22} textAnchor="middle" style={{ fill: color.text, fontSize: 14, fontWeight: 500 }}>web-shell</text>
        <text x={85} y={door + 39} textAnchor="middle" style={{ fill: color.muted, fontSize: 11 }}>the web app, links shared</text>
      </g>
      <Node x={190} y={door} w={170} h={52} title="gateway" lines={['nginx: one way in']} size={14} />

      <Panel x={0} y={panels} w={w} h={alwaysH} title="Always run" />
      {alwaysGrid.drawn}
      <text x={16} y={sharedY - 12} style={{ fill: color.muted, fontSize: 12 }}>Shared by the others, over gRPC</text>
      {sharedGrid.drawn}

      <Panel x={0} y={offeredY} w={w} h={offeredH} title="Only if the site offers it" />
      {offered.map((service, i) => (
        <Offered key={service.name} x={16} y={offeredY + 42 + i * 52} w={w - 32} service={service} />
      ))}

      <Heading x={0} y={keptY - 12}>Kept</Heading>
      {keptGrid.drawn}
      <Heading x={0} y={jobsY - 12}>By the clock, and once</Heading>
      {jobsGrid.drawn}
    </Diagram>
  );
}

// What runs on an instance, and what a site may leave out.
export default function WhatRuns() {
  return (
    <Card data-pagefind-ignore sx={{ p: { xs: 2.5, md: 4 } }}>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Wide />
      </Box>
      <Box sx={{ display: { md: 'none' }, maxWidth: 400 }}>
        <Narrow />
      </Box>
    </Card>
  );
}
