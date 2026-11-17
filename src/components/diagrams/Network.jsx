'use client';

import { useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';

// A network drawn for decoration, as the fediverse is: instances, each a
// server with its people around it, the servers tied to each other, and a
// few people followed across instances. Made from a fixed seed, so it is
// the same on every build and every visit, and drawn in the text's own
// colour, black or white, like the logo.
//
// It moves, slowly, only while it is on screen, and not at all for somebody
// who asks for less motion: every network is a globe, and turns once a
// minute, the same way on every page. The first frame is the drawing as it
// stands still, so the page is the same without JavaScript.

function random(seed) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Instances around a globe, for the Instances page: at a longitude and a
// latitude, in degrees, with how many people. As it turns, each comes round
// from behind, smaller and fainter, to the front, larger and darker: the
// fediverse as a world, with volume.
const GLOBE = { cx: 500, cy: 380, rx: 360, ry: 300 };
const project = (lon, lat) => {
  const l = (lon * Math.PI) / 180;
  const a = (lat * Math.PI) / 180;
  return {
    x: GLOBE.cx + GLOBE.rx * Math.cos(a) * Math.sin(l),
    y: GLOBE.cy - GLOBE.ry * Math.sin(a),
    z: Math.cos(a) * Math.cos(l),
  };
};
const instancesOnGlobe = [
  [0, -8, 44],
  [-58, 24, 28],
  [62, 30, 26],
  [-84, -34, 16],
  [88, -24, 18],
  [148, 14, 14],
  [-142, -4, 12],
  [18, 62, 12],
  [-24, -62, 10],
];
const onGlobe = (lon, lat, people) => ({ lon, lat, people, spread: 30 + people * 1.7, ...project(lon, lat) });
const globe = instancesOnGlobe.map(([lon, lat, people]) => onGlobe(lon, lat, people));

// Where the instances sit, on a globe, and how many people each has: a
// longitude, a latitude and a count. Every network turns, in the same
// direction and at the same speed (the user, 2026-11-16, for the home page;
// 2026-11-17, for every page). The first is the home page's, the Instances
// page's turned a little and mirrored north to south, so that the two
// differ; the others give each page a variation of it, a few small
// instances on the far side so that no turn leaves the globe bare.
const globes = [
  instancesOnGlobe.map(([lon, lat, people]) => [lon + 20, -lat, people]),
  // Two large instances, east and west, a small one between them.
  [[-60, 10, 46], [60, -5, 44], [0, -45, 12], [0, 48, 8], [180, 20, 14], [130, -35, 10], [-130, 35, 10]],
  // A row of four round the equator, rising and falling.
  [[-135, -15, 26], [-45, 18, 34], [45, -14, 30], [135, 16, 22], [0, 55, 8], [90, -55, 8], [180, 40, 12], [-90, -45, 12]],
  // One large instance, with smaller ones around it.
  [[0, 0, 56], [-70, 40, 12], [70, 38, 14], [75, -40, 10], [-72, -38, 11], [180, 0, 16], [120, 30, 12], [-120, -25, 12]],
  // A triangle, close together.
  [[-35, 20, 38], [35, 20, 38], [0, -30, 38], [180, -10, 14], [120, 40, 12], [-120, -35, 12]],
  // Three rising on a diagonal, a small one beside each end.
  [[-60, -40, 30], [0, 0, 36], [60, 40, 30], [70, -35, 9], [-70, 38, 8], [180, 10, 14], [130, -20, 12], [-130, 25, 12]],
  // A ring of small instances.
  [[0, 20, 18], [72, -20, 18], [144, 20, 18], [216, -20, 18], [288, 20, 18], [36, 60, 10], [180, -60, 10]],
];
const layouts = [...globes.map((places) => places.map(([lon, lat, people]) => onGlobe(lon, lat, people))), globe];

// How much nearer or farther draws a point larger or fainter.
const near = (z) => 1 + 0.4 * z;

// The motion: the globe's turn, in degrees a second (one turn a minute).
const TURN = 6;

// The network's shape: the instances, each person's place beside its
// instance, the ties, and how each point moves.
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
  const add = (instance, ox, oy, dz, hub = false) => {
    nodes.push({ instance, ox, oy, dz, hub, degree: 0 });
    return nodes.length - 1;
  };
  const at = (i) => {
    const node = nodes[i];
    const where = placesOf[node.instance];
    return { x: where.x + node.ox, y: where.y + node.oy };
  };
  const distance = (a, b) => {
    const p = at(a);
    const q = at(b);
    return Math.hypot(p.x - q.x, p.y - q.y);
  };

  // Instances: a server at the heart of each, its people around it, most tied
  // to it and to a neighbour or two.
  const placesOf = layouts[layout % layouts.length];
  const turning = placesOf.some((place) => place.lon !== undefined);
  const instances = placesOf.map((instance, index) => {
    const hub = add(index, 0, 0, 0, true);
    const people = Array.from({ length: instance.people }, () => {
      const angle = rand() * Math.PI * 2;
      const r = instance.spread * (0.25 + Math.abs(gauss()) * 0.85);
      // Only the globe has depth, and only it spends the numbers for it.
      const dz = turning ? gauss() * 0.08 : 0;
      return add(index, Math.cos(angle) * r, Math.sin(angle) * r, dz);
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

  // Each tie is a gentle arc, bent to one side or the other, so the whole
  // reads as flowing, not as a web.
  const ties = [...edges].map((key) => {
    const [a, b] = key.split('-').map(Number);
    return { key, a, b, bend: (rand() < 0.5 ? -1 : 1) * (0.12 + rand() * 0.18), federated: nodes[a].hub && nodes[b].hub };
  });

  return { nodes, ties, placesOf, turning };
}

// Where everything is at `t` seconds: each point, how near, and each tie's
// curve.
function place({ nodes, ties, placesOf, turning }, t) {
  const instances = placesOf.map((instance) => (turning ? project(instance.lon + t * TURN, instance.lat) : instance));
  const points = nodes.map((node) => {
    const instance = instances[node.instance];
    const z = (instance.z || 0) + node.dz;
    const scale = near(instance.z || 0);
    const x = instance.x + node.ox * scale;
    const y = instance.y + node.oy * scale;
    return { x, y, z, r: (node.hub ? 8 + Math.min(node.degree, 45) * 0.1 : 3.2) * near(z), opacity: Math.min(0.95, 0.8 * near(z)) };
  });
  const curves = ties.map(({ a, b, bend, federated }) => {
    const from = points[a];
    const to = points[b];
    const cx = (from.x + to.x) / 2 - (to.y - from.y) * bend;
    const cy = (from.y + to.y) / 2 + (to.x - from.x) * bend;
    const z = (from.z + to.z) / 2;
    return {
      from, to, cx, cy,
      d: `M${from.x.toFixed(1)} ${from.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
      width: (federated ? 1.2 : 0.8) * near(z),
      opacity: Math.min(0.6, (federated ? 0.35 : 0.22) * near(z)),
    };
  });
  return { points, curves };
}

// The frame fits what is drawn, the curves as well as the points, so the
// network fills its space and no tie runs off its edge; a turning globe's,
// all the way round.
function frameOf(model) {
  const pad = 20;
  const xs = [];
  const ys = [];
  const times = model.turning ? Array.from({ length: 12 }, (_, i) => (i * 30) / TURN) : [0];
  times.forEach((t) => {
    const { points, curves } = place(model, t);
    points.forEach(({ x, y }) => { xs.push(x); ys.push(y); });
    curves.forEach(({ from, to, cx, cy }) => {
      [0.25, 0.5, 0.75].forEach((s) => {
        const u = 1 - s;
        xs.push(u * u * from.x + 2 * u * s * cx + s * s * to.x);
        ys.push(u * u * from.y + 2 * u * s * cy + s * s * to.y);
      });
    });
  });
  const left = Math.min(...xs) - pad;
  const top = Math.min(...ys) - pad;
  return [left, top, Math.max(...xs) + pad - left, Math.max(...ys) + pad - top].map(Math.round).join(' ');
}

// The same seed draws the same network, so each page can have its own.
export default function Network({ seed = 11, layout = 0, sx }) {
  const model = useMemo(() => network({ seed, layout }), [seed, layout]);
  const first = useMemo(() => place(model, 0), [model]);
  const viewBox = useMemo(() => frameOf(model), [model]);
  // Far first, so the near ones are drawn over them.
  const pointOrder = useMemo(() => first.points.map((_, i) => i).sort((a, b) => first.points[a].z - first.points[b].z), [first]);
  const curveOrder = useMemo(() => {
    const z = (i) => (first.points[model.ties[i].a].z + first.points[model.ties[i].b].z) / 2;
    return model.ties.map((_, i) => i).sort((a, b) => z(a) - z(b));
  }, [first, model]);
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const circles = svg.querySelectorAll('circle');
    const paths = svg.querySelectorAll('path');
    const start = performance.now();
    let frame = 0;
    let last = 0;
    let visible = false;
    const draw = (now) => {
      frame = 0;
      if (!visible) return;
      // Thirty frames a second are enough for what moves this slowly.
      if (now - last >= 33) {
        last = now;
        const { points, curves } = place(model, (now - start) / 1000);
        pointOrder.forEach((i, k) => {
          const p = points[i];
          circles[k].setAttribute('cx', p.x.toFixed(1));
          circles[k].setAttribute('cy', p.y.toFixed(1));
          circles[k].setAttribute('r', p.r.toFixed(2));
          circles[k].setAttribute('fill-opacity', p.opacity.toFixed(3));
        });
        curveOrder.forEach((i, k) => {
          const c = curves[i];
          paths[k].setAttribute('d', c.d);
          paths[k].setAttribute('stroke-width', c.width.toFixed(2));
          paths[k].setAttribute('stroke-opacity', c.opacity.toFixed(3));
        });
      }
      frame = requestAnimationFrame(draw);
    };
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(draw);
    });
    seen.observe(svg);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [model, pointOrder, curveOrder]);

  return (
    <Box
      aria-hidden="true"
      data-pagefind-ignore
      sx={[{ color: 'text.primary' }, sx]}
    >
      {/* The first frame is rounded as every later one is: the server and the
          browser work out sines and cosines a last digit apart, and an
          unrounded number would differ between them when the page hydrates. */}
      <svg ref={ref} viewBox={viewBox} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <g fill="none" stroke="currentColor">
          {curveOrder.map((i) => {
            const c = first.curves[i];
            return (
              <path
                key={model.ties[i].key}
                d={c.d}
                strokeWidth={c.width.toFixed(2)}
                strokeOpacity={c.opacity.toFixed(3)}
              />
            );
          })}
        </g>
        <g fill="currentColor">
          {pointOrder.map((i) => {
            const p = first.points[i];
            return (
              <circle
                key={i}
                cx={p.x.toFixed(1)}
                cy={p.y.toFixed(1)}
                r={p.r.toFixed(2)}
                fillOpacity={p.opacity.toFixed(3)}
              />
            );
          })}
        </g>
      </svg>
    </Box>
  );
}
