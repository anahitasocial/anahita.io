// What the header and the footer link to, and the facts every page shares.

export const site = {
  name: 'Anahita',
  url: 'https://www.anahita.io',
  description:
    'Open-source social software that an organisation runs for its own community, connected to the fediverse and Bluesky.',
  github: 'https://github.com/anahitasocial',
  rmdStudio: 'https://www.rmdstudio.com',
  contact: 'https://www.rmdstudio.com/contact',
  web: 'https://github.com/anahitasocial/anahita-web',
  // anahita-services is still private. When it is public under anahitasocial,
  // set this to its address: links to its docs and the API reference appear.
  services: null,
};

export const navigation = [
  { label: 'Products', href: '/products/' },
  { label: 'Docs', href: '/docs/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Donate', href: '/donate/' },
];

export const footer = [
  { label: 'FAQ', href: '/faq/' },
  { label: 'History', href: '/history/' },
  { label: 'Brand', href: '/brand/' },
  { label: 'rmd Studio', href: site.rmdStudio },
  { label: 'Contact', href: site.contact },
];
