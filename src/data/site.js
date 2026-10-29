// What the header and the footer link to, and the facts every page shares.

export const site = {
  name: 'Anahita',
  url: 'https://www.anahita.io',
  description:
    'Open-source social software that an organisation runs for its own community, connected to the fediverse and Bluesky.',
  github: 'https://github.com/anahitasocial',
  bluesky: 'https://bsky.app/profile/anahita.io',
  // @anahita@banu.io, Anahita's own profile on the fediverse.
  fediverse: 'https://banu.io/@anahita',
  // The card shown when a page is shared: the home page's headline beside
  // its network (made from the built home page, 2026-10-27).
  card: { url: '/images/og.png', width: 1200, height: 630, alt: 'Anahita: connect your people, here and everywhere' },
  rmdStudio: 'https://www.rmdstudio.com',
  // True keeps search engines away (robots.txt, and noindex on every page),
  // for a copy of the site that is not the real one. Off since the launch,
  // 2026-10-27.
  hidden: false,
  // Donate is left out (no link, and its page answers "not found") until an
  // account on Liberapay, GitHub Sponsors or Open Collective is open.
  donations: false,
};

// API is left out until the services' reference is on the site (Header's
// `api`).
export const navigation = [
  { label: 'Products', href: '/products/' },
  { label: 'Instances', href: '/instances/' },
  { label: 'Docs', href: '/docs/' },
  { label: 'API', href: '/api/', needs: 'api' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  ...(site.donations ? [{ label: 'Donate', href: '/donate/' }] : []),
];

export const footer = [
  { label: 'Anahita AI', href: '/ai/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'rmd studio', href: site.rmdStudio },
];
