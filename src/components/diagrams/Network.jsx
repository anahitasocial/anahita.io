import Box from '@mui/material/Box';

// A network drawn for decoration, as the fediverse is: instances, each a
// server with its people around it, the servers tied to each other, and a
// few people followed across instances. Made from a
// fixed seed, so it is the same on every build and every visit, and drawn in
// the text's own colour, black or white, like the logo.

function random(seed) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Where the instances sit, and how many people each has. The first is the
// home page's; the others give each page a variation of it.
const layouts = [
  [
    { x: 330, y: 300, people: 42, spread: 120 },
    { x: 660, y: 260, people: 36, spread: 110 },
    { x: 520, y: 560, people: 38, spread: 115 },
    { x: 860, y: 520, people: 10, spread: 60 },
    { x: 170, y: 560, people: 9, spread: 55 },
  ],
  // Two large instances side by side, a small one between them.
  [
    { x: 260, y: 380, people: 46, spread: 130 },
    { x: 760, y: 340, people: 44, spread: 125 },
    { x: 520, y: 620, people: 12, spread: 60 },
    { x: 520, y: 110, people: 8, spread: 50 },
  ],
  // A row of four, rising and falling.
  [
    { x: 150, y: 420, people: 26, spread: 95 },
    { x: 420, y: 280, people: 34, spread: 110 },
    { x: 690, y: 450, people: 30, spread: 105 },
    { x: 940, y: 300, people: 22, spread: 90 },
  ],
  // One large instance, with smaller ones around it.
  [
    { x: 500, y: 380, people: 56, spread: 150 },
    { x: 150, y: 200, people: 12, spread: 60 },
    { x: 860, y: 190, people: 14, spread: 65 },
    { x: 840, y: 620, people: 10, spread: 55 },
    { x: 170, y: 610, people: 11, spread: 58 },
  ],
  // A triangle, close together.
  [
    { x: 330, y: 260, people: 38, spread: 115 },
    { x: 700, y: 300, people: 38, spread: 115 },
    { x: 500, y: 600, people: 38, spread: 115 },
  ],
  // Three rising on a diagonal, a small one beside each end.
  [
    { x: 200, y: 560, people: 30, spread: 105 },
    { x: 500, y: 380, people: 36, spread: 115 },
    { x: 800, y: 200, people: 30, spread: 105 },
    { x: 860, y: 520, people: 9, spread: 50 },
    { x: 150, y: 220, people: 8, spread: 50 },
  ],
  // A ring of small instances.
  [
    { x: 500, y: 150, people: 18, spread: 75 },
    { x: 800, y: 300, people: 18, spread: 75 },
    { x: 720, y: 600, people: 18, spread: 75 },
    { x: 280, y: 600, people: 18, spread: 75 },
    { x: 200, y: 300, people: 18, spread: 75 },
  ],
];

function network({ seed = 11, layout = 0 }) {
  const rand = random(seed);
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
  const nodes = [];
  const edges = new Set();
  const tie = (a, b) => {
    if (a === b) return;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (edges.has(key)) return;
    edges.add(key);
    nodes[a].degree += 1;
    nodes[b].degree += 1;
  };
  const add = (x, y, hub = false) => {
    nodes.push({ x, y, degree: 0, hub });
    return nodes.length - 1;
  };
  const distance = (a, b) => Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);

  // Instances: a server at the heart of each, its people around it, most tied
  // to it and to a neighbour or two. Three large ones, and two small ones at
  // the edges, so the network is larger than what is drawn.
  const instances = layouts[layout % layouts.length].map((instance) => {
    const hub = add(instance.x, instance.y, true);
    const people = Array.from({ length: instance.people }, () => {
      const angle = rand() * Math.PI * 2;
      const r = instance.spread * (0.25 + Math.abs(gauss()) * 0.85);
      return add(instance.x + Math.cos(angle) * r, instance.y + Math.sin(angle) * r);
    });
    people.forEach((person) => {
      if (rand() < 0.8) tie(person, hub);
      const nearest = people
        .filter((other) => other !== person)
        .sort((p, q) => distance(person, p) - distance(person, q))
        .slice(0, 1 + Math.floor(rand() * 2));
      nearest.forEach((other) => tie(person, other));
    });
    return { hub, people };
  });

  // Federation: the servers tied to each other, and a few people followed
  // across instances.
  for (let i = 0; i < instances.length; i += 1) {
    for (let j = i + 1; j < instances.length; j += 1) {
      if (i < 3 || rand() < 0.5) tie(instances[i].hub, instances[j].hub);
    }
  }
  for (let i = 0; i < 10; i += 1) {
    const [a, b] = [Math.floor(rand() * 3), Math.floor(rand() * 3)];
    if (a !== b) {
      const pick = (instance) => instance.people[Math.floor(rand() * instance.people.length)];
      tie(pick(instances[a]), pick(instances[b]));
    }
  }

  // The frame fits what was drawn, so the network fills its space.
  const pad = 20;
  const xs = nodes.map((node) => node.x);
  const ys = nodes.map((node) => node.y);
  const left = Math.min(...xs) - pad;
  const top = Math.min(...ys) - pad;
  const viewBox = [left, top, Math.max(...xs) + pad - left, Math.max(...ys) + pad - top].map(Math.round).join(' ');

  // Each tie is a gentle arc, bent to one side or the other, more for a long
  // tie than a short one, so the whole reads as flowing, not as a web.
  const curves = [...edges].map((key) => {
    const [a, b] = key.split('-').map(Number);
    const from = nodes[a];
    const to = nodes[b];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const bend = (rand() < 0.5 ? -1 : 1) * (0.12 + rand() * 0.18);
    const cx = (from.x + to.x) / 2 - dy * bend;
    const cy = (from.y + to.y) / 2 + dx * bend;
    const federated = from.hub && to.hub;
    return {
      key,
      federated,
      d: `M${from.x.toFixed(1)} ${from.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
    };
  });

  return { nodes, curves, viewBox };
}

// The same seed draws the same network, so each page can have its own.
export default function Network({ seed = 11, layout = 0, sx }) {
  const { nodes, curves, viewBox } = network({ seed, layout });
  return (
    <Box
      aria-hidden="true"
      data-pagefind-ignore
      sx={[{ color: 'text.primary' }, sx]}
    >
      <svg viewBox={viewBox} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <g fill="none" stroke="currentColor">
          {curves.map(({ key, d, federated }) => (
            <path
              key={key}
              d={d}
              strokeWidth={federated ? 1.2 : 0.8}
              strokeOpacity={federated ? 0.35 : 0.22}
            />
          ))}
        </g>
        <g fill="currentColor" fillOpacity="0.8">
          {nodes.map((node, i) => (
            <circle key={i} cx={node.x} cy={node.y} r={node.hub ? 8 + Math.min(node.degree, 45) * 0.1 : 3.2} />
          ))}
        </g>
      </svg>
    </Box>
  );
}
