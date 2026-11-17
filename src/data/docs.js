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

// Anahita Recipes: a site ready to run, for each purpose, each a folder in
// anahita-recipes. A recipe not written yet has no href, and its card waits.
const recipesRepo = 'https://github.com/anahitasocial/anahita-recipes/tree/main';

export const recipes = [
  {
    icon: 'groups',
    title: 'Classique',
    text: 'A classic social network: everything Anahita does, from notes to videos, groups to events. The one to begin with.',
    href: `${recipesRepo}/classique`,
  },
  {
    icon: 'coffee',
    title: 'Café',
    text: 'Short posts and the conversation around them: people sharing notes and photos with those who follow them.',
    href: `${recipesRepo}/cafe`,
  },
  {
    icon: 'article',
    title: 'Journal',
    text: 'Long writing under each writer’s own name: articles with their covers, and notes and photos beside them.',
    href: `${recipesRepo}/journal`,
  },
  {
    icon: 'photo',
    title: 'Galerie',
    text: 'Photos first: each person’s own, one or a series in each post, and the conversation under them.',
    href: `${recipesRepo}/galerie`,
  },
  {
    icon: 'theatre',
    title: 'Vidéothèque',
    text: 'Video and sound, each person’s own: lectures, concerts, music and talks, and the replies under them.',
    href: `${recipesRepo}/videotheque`,
  },
  {
    icon: 'event',
    title: 'Rendez-vous',
    text: 'Meetups and events: groups that organise them, who is going, and topics to talk them over. No tickets, nothing sold.',
    href: `${recipesRepo}/rendez-vous`,
  },
  {
    icon: 'forum',
    title: 'Forum',
    text: 'Discussions that last: groups as boards, topics and replies, where an old answer is found as easily as a new one.',
    href: `${recipesRepo}/forum`,
  },
  {
    icon: 'storefront',
    title: 'Quartier',
    text: 'A neighbourhood online, run by its own people: each local shop, business and facility has a channel for its news and events, and neighbourhoods follow one another.',
    href: `${recipesRepo}/quartier`,
  },
  {
    icon: 'move',
    title: 'PHP migration',
    text: 'Migrate your Anahita PHP site to Anahita\'s microservices, and relaunch it as a Classique site.',
    href: `${recipesRepo}/php-migration`,
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
    href: '/docs/services/ai-agents/',
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
  'AI agents': 'smart_toy',
  Concepts: 'account_tree',
  'Run a site': 'settings',
  People: 'person',
  Posts: 'article',
  'Fediverse and Bluesky': 'public',
  'Build on Anahita': 'code',
};
