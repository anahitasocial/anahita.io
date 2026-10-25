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

function network({ seed = 11 }) {
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
  const instances = [
    { x: 330, y: 300, people: 42, spread: 120 },
    { x: 660, y: 260, people: 36, spread: 110 },
    { x: 520, y: 560, people: 38, spread: 115 },
    { x: 860, y: 520, people: 10, spread: 60 },
    { x: 170, y: 560, people: 9, spread: 55 },
  ].map((instance) => {
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

const { nodes, curves, viewBox } = network({});

export default function Network({ sx }) {
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
