// The pieces the diagrams are drawn with. Colours come from the theme's CSS
// variables, so a diagram follows light and dark, and a new palette.

export const color = {
  text: 'var(--mui-palette-text-primary)',
  muted: 'var(--mui-palette-text-secondary)',
  line: 'var(--mui-palette-text-disabled)',
  border: 'var(--mui-palette-divider)',
  paper: 'var(--mui-palette-background-paper)',
  primary: 'var(--mui-palette-primary-main)',
};

// The arrowhead every diagram uses, defined once in the layout. Inside a
// diagram it would be lost whenever that diagram is hidden (the wide one on a
// phone), since a page uses the first element with an id.
export function DiagramDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style={{ fill: color.line }} />
        </marker>
      </defs>
    </svg>
  );
}

// The frame every diagram sits in: scales to its width, read aloud by its label.
export function Diagram({ label, viewBox, children, sx }) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={viewBox}
      style={{ width: '100%', height: 'auto', display: 'block', fontFamily: 'inherit', ...sx }}
    >
      {children}
    </svg>
  );
}

// A MUI icon at a point of a diagram. Drawn inside a foreignObject, as
// HTML, so that MUI's own sizing applies: as an <svg> inside the diagram's
// <svg>, it loses it and fills the drawing.
// The networks Anahita speaks to (`mark`: Bluesky's butterfly, the
// fediverse's hub) are drawn in black, or white in dark mode, as Bluesky asks
// of its mark; Anahita's own in the theme's primary colour.
export function DiagramIcon({ icon: IconComponent, x, y, size = 20, mark }) {
  const tone = mark ? { color: 'common.black', '.dark &': { color: 'common.white' } } : { color: 'primary.main' };
  return (
    <foreignObject x={x} y={y} width={size} height={size}>
      <IconComponent sx={{ fontSize: size, display: 'block', ...tone }} />
    </foreignObject>
  );
}

// A box with a title and up to two lines under it. With an icon (a MUI
// icon component), the icon sits at the left and the words beside it.
export function Node({ x, y, w, h, title, lines = [], accent, icon: IconComponent, mark, size = 15 }) {
  const cx = IconComponent ? x + 44 : x + w / 2;
  const anchor = IconComponent ? 'start' : 'middle';
  const top = y + h / 2 - (lines.length * (size - 2)) / 2 + 4;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        style={{ fill: color.paper, stroke: accent ? color.primary : color.border, strokeWidth: accent ? 1.5 : 1 }}
      />
      {IconComponent && <DiagramIcon icon={IconComponent} x={x + 14} y={y + h / 2 - 10} mark={mark} />}
      <text x={cx} y={top} textAnchor={anchor} style={{ fill: color.text, fontSize: size, fontWeight: 500 }}>
        {title}
      </text>
      {lines.map((line, i) => (
        <text key={line} x={cx} y={top + (i + 1) * (size + 2)} textAnchor={anchor} style={{ fill: color.muted, fontSize: size - 2 }}>
          {line}
        </text>
      ))}
    </g>
  );
}

// A line between two points, with arrows at one end or both.
export function Link({ d, both, dashed }) {
  return (
    <path
      d={d}
      markerEnd="url(#arrow)"
      markerStart={both ? 'url(#arrow)' : undefined}
      style={{ fill: 'none', stroke: color.line, strokeWidth: 1.5, strokeDasharray: dashed ? '4 4' : undefined }}
    />
  );
}

// A small label in capitals, above a group (SERVER, APPS).
export function Overline({ x, y, children, anchor = 'start' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} style={{ fill: color.primary, fontSize: 12, letterSpacing: '0.08em', fontWeight: 500 }}>
      {children}
    </text>
  );
}

// A short line of text on its own: what a link means.
export function Caption({ x, y, children, anchor = 'middle', size = 13 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} style={{ fill: color.muted, fontSize: size }}>
      {children}
    </text>
  );
}
