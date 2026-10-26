// What the header and the footer link to, and the facts every page shares.

export const site = {
  name: 'Anahita',
  url: 'https://www.anahita.io',
  description:
    'Open-source social software that an organisation runs for its own community, connected to the fediverse and Bluesky.',
  github: 'https://github.com/anahitasocial',
  rmdStudio: 'https://www.rmdstudio.com',
  // While the site is on staging.anahita.io, search engines are asked to stay
  // away (robots.txt, and noindex on every page). At launch: false, and
  // public/CNAME becomes www.anahita.io.
  hidden: true,
  // Donate is left out (no link, and its page answers "not found") until an
  // account on Liberapay, GitHub Sponsors or Open Collective is open.
  donations: false,
};

export const navigation = [
  { label: 'Products', href: '/products/' },
  { label: 'Docs', href: '/docs/' },
  { label: 'Blog', href: '/blog/' },
  ...(site.donations ? [{ label: 'Donate', href: '/donate/' }] : []),
];

export const footer = [
  { label: 'FAQ', href: '/faq/' },
  { label: 'History', href: '/history/' },
  { label: 'rmd studio', href: site.rmdStudio },
];
