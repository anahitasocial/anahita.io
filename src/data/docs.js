// The Docs page: the ways into the documentation. Each card leads to a page
// rendered from the repositories' docs (src/lib/docs.js), named by its slug;
// the Docs page leaves a card without a link while its source is not fetched.

export const waysIn = [
  {
    icon: 'install',
    title: 'Setting up',
    text: 'The pages to read, in order, to put an Anahita instance on the web: run it on your own machine, then live.',
    slug: 'setting-up',
  },
  {
    icon: 'tune',
    title: 'Customising',
    text: 'Its name and look, languages, legal texts, who may join, and how long things are kept, without changing the code.',
    slug: 'customising',
  },
  {
    icon: 'manage',
    title: 'Operating',
    text: 'Upgrades, backups, storage, accounts, reports and federation, from day to day.',
    slug: 'operating',
  },
  {
    icon: 'code',
    title: 'Developing',
    text: 'The API, signing in with OAuth, the events on the bus, and writing your own client or service.',
    slug: 'developing',
  },
];

export const webApp = [
  {
    icon: 'play',
    title: 'Getting started',
    text: 'Run Anahita Web against Anahita Services on your own machine.',
    slug: 'getting-started',
  },
  {
    icon: 'settings',
    title: 'Configuration',
    text: 'Every setting Anahita Web reads, and what it does.',
    slug: 'configuration',
  },
  {
    icon: 'brush',
    title: 'Customising',
    text: 'Themes, languages, and your own terms and privacy pages.',
    slug: 'customising',
  },
  {
    icon: 'account_tree',
    title: 'Architecture',
    text: 'How the app is built: its routes, state and parts.',
    slug: 'architecture',
  },
];

export const builders = [
  {
    icon: 'api',
    title: 'API reference',
    text: 'Every route, with what it takes and what it sends, from OpenAPI 3.1 made from the code.',
    needs: 'services',
    href: '/api/',
  },
  {
    icon: 'smart_toy',
    title: 'MCP server',
    text: 'The docs and API reference for AI agents, over MCP: on your computer, or at mcp.anahita.io.',
    href: 'https://github.com/anahitasocial/anahita-mcp',
  },
  {
    icon: 'description',
    title: 'llms.txt',
    text: 'This site in brief, for language models.',
    href: '/llms.txt',
  },
];

// The icon of each group of pages on a docs overview, by the group's name in
// its README's Contents. A group not named here has none.
export const groupIcons = {
  'Start here': 'install',
  Concepts: 'account_tree',
  'Run a site': 'settings',
  People: 'person',
  Posts: 'article',
  'Fediverse and Bluesky': 'public',
  'Build on Anahita': 'code',
};
