// The home page's words. The icons are named here and looked up in Icon.jsx.
// A tile's text may be a list: words, and [icon, word] for a word with its
// icon before it. A `wide` tile takes two columns, with `chips` under its text.

export const promises = [
  {
    icon: 'dns',
    title: 'Self-hosted',
    text: 'Open source, on your own servers or in your own cloud. Your community’s posts stay with you, under your rules.',
  },
  {
    icon: 'public',
    title: 'Globally connected',
    text: 'ActivityPub and the AT Protocol are built in: your instance reaches the fediverse and Bluesky, and each person chooses whether to take part.',
  },
  {
    icon: 'schedule',
    title: 'Chronological',
    text: 'Every feed, including the ones people build, shows posts in the order they were posted. Nothing is ranked to keep you scrolling.',
  },
];

export const features = [
  { icon: 'person', title: 'People', text: 'Profiles with posts, photos and an About card.' },
  { icon: 'groups', title: 'Groups', text: 'Spaces with followers, for classes, desks and teams.' },
  { icon: 'event', title: 'Events', text: 'Dates, locations and who is going.' },
  { icon: 'rss', title: 'Websites', text: 'Add any blog or site with an RSS, Atom or JSON feed as a profile that people across the fediverse can follow.' },
  { icon: 'article', title: 'Text', text: 'Short notes, long articles and topics, with drafts.' },
  { icon: 'photo', title: 'Media', text: 'Photos, videos and GIFs: up to twenty photos in a post, each described; GIFs and videos ready for every screen.' },
  { icon: 'label', title: 'Tagging', text: [['tag', 'Hashtags'], ', ', ['place', 'locations'], ', citations, and people in photos, with their approval.'] },
  { icon: 'visibility', title: 'Audiences', text: 'Choose who sees each post: public, signed-in people, followers, people you follow, mutuals, or only you.' },
  { icon: 'feed', title: 'Custom feeds', text: 'Feeds that people make for themselves.' },
  { icon: 'search', title: 'Search', text: 'Results ranked by the graph and fine-tuned by each person.' },
  { icon: 'explore', title: 'Recommendations', text: 'Who to follow, worked out from the graph, each with its reason.' },
  { icon: 'notifications', title: 'Notifications', text: 'Grouped, answered in place, and never emailed.' },
  {
    icon: 'fingerprint',
    title: 'Authentication',
    text: 'Your own identity provider, for Anahita’s apps and anybody else’s.',
    wide: true,
    chips: [
      'OAuth 2.0',
      'OpenID Connect',
      'Passkeys (WebAuthn)',
      'Face ID, Touch ID, Windows Hello',
      'TOTP two-factor',
      'OTP by email',
    ],
  },
  { icon: 'flag', title: 'Moderation', text: 'Reports gathered into cases, with your own reasons and rules. Refuse a whole server, or one account on the fediverse or Bluesky.' },
  { icon: 'download', title: 'Your data', text: 'Each person can download a full copy of their data.' },
];

// "Built on a graph": what the graph does for each part of Anahita, from
// anahita-services' architecture.md, search.md and recommendations.md.
export const graph = [
  {
    title: 'Everything is a node',
    text: 'People, groups, events and posts are nodes in one graph, and every tie between them is an edge: who follows whom, who replied, what cites what, who is in a photo.',
  },
  {
    title: 'Search ranks by the graph',
    text: 'After the words, what counts is how useful the graph shows a post to be: its likes, saves, replies and citations, and its author’s followers. Old posts that are still useful rank as well as new ones.',
  },
  {
    title: 'Recommendations walk the graph',
    text: 'Followed by people you follow, cited, sharing your hashtags, in photos with you, hosted by your groups: written rules, no model, each recommendation with its reason.',
  },
  {
    title: 'One gate for who sees what',
    text: 'Feeds, search, notifications and recommendations all ask the graph the same question, so nothing shows anywhere that its reader may not see.',
  },
  {
    title: 'The open web joins in',
    text: 'A person or a post from another server becomes a node too, so following, blocking and feeds work the same for them.',
  },
];

export const audiences = [
  { title: 'Schools', text: 'Classes, clubs and parents, in a place the school runs.' },
  { title: 'Newsrooms', text: 'Publish to your readers and to the fediverse at once.' },
  { title: 'Libraries', text: 'Events, reading groups and collections that stay findable.' },
  { title: 'Research groups', text: 'Share work in progress, and keep what was learned.' },
  { title: 'Non-profits', text: 'Reach your community without renting it from a centralised platform.' },
];

// "Start your own instance": the ways to begin. `doc` is a page of Anahita
// Services' docs, linked once those are on the site; the Docs page until then.
export const start = [
  {
    icon: 'install',
    title: 'Try it first',
    text: 'Run the whole stack on your own computer with Docker, and see Anahita working before you commit.',
    action: 'Setting up',
    doc: 'setting-up',
  },
  {
    icon: 'manage',
    title: 'Go live',
    text: 'Deploy on Kubernetes, on your own servers or in any cloud, with guides to upgrading, backups and storage.',
    action: 'Operating',
    doc: 'operating',
  },
  {
    icon: 'smart_toy',
    title: 'Work with an agent',
    text: 'The docs are written for people and AI agents alike. Point your coding assistant at them, and set up and run your instance together.',
    action: 'For agents',
    href: '/docs/#for-builders',
  },
];
