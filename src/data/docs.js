// The Docs page: where each part of the documentation lives. The docs
// themselves stay in the repositories; this page only points to them.
import { site } from './site';

const servicesDoc = (page) => site.services && `${site.services}/blob/main/docs/${page}`;
const webDoc = (page) => `${site.web}/blob/main/docs/${page}`;

export const waysIn = [
  {
    icon: 'rocket',
    title: 'Setting up a site',
    text: 'The pages to read, in order, to put an Anahita site on the web: run it on your own machine, then live.',
    href: servicesDoc('setting-up.md'),
  },
  {
    icon: 'palette',
    title: 'Making it your own',
    text: 'Its name and look, languages, legal texts, who may join, and how long things are kept, without changing the code.',
    href: servicesDoc('making-it-your-own.md'),
  },
  {
    icon: 'monitor',
    title: 'Keeping it running',
    text: 'Upgrades, backups, storage, accounts, reports and federation, from day to day.',
    href: servicesDoc('keeping-it-running.md'),
  },
  {
    icon: 'build',
    title: 'Building on it',
    text: 'The API, signing in with OAuth, the events on the bus, and writing your own client or service.',
    href: servicesDoc('building-on-it.md'),
  },
];

export const webApp = [
  {
    icon: 'play',
    title: 'Getting started',
    text: 'Run the web app against the services on your own machine.',
    href: webDoc('getting-started.md'),
  },
  {
    icon: 'tune',
    title: 'Configuration',
    text: 'Every setting the web app reads, and what it does.',
    href: webDoc('configuration.md'),
  },
  {
    icon: 'brush',
    title: 'Customising',
    text: 'Themes, languages, and your own terms and privacy pages.',
    href: webDoc('customising.md'),
  },
  {
    icon: 'account_tree',
    title: 'Architecture',
    text: 'How the app is built: its routes, state and parts.',
    href: webDoc('architecture.md'),
  },
];

export const builders = [
  {
    icon: 'api',
    title: 'API reference',
    text: 'Every route, with what it takes and what it sends, from OpenAPI 3.1 made from the code.',
    href: site.services && '/api/',
  },
  {
    icon: 'smart_toy',
    title: 'MCP server',
    text: 'The docs for AI agents, read-only, over the Model Context Protocol.',
    href: null,
  },
  {
    icon: 'description',
    title: 'llms.txt',
    text: 'This site in brief, for language models.',
    href: '/llms.txt',
  },
];
