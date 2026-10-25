// The home page's words. The icons are named here and looked up in Icon.jsx.
// A tile's text may be a list: words, and [icon, word] for a word with its
// icon before it. A `wide` tile takes two columns, with `chips` under its text.

export const promises = [
  {
    icon: 'home',
    title: 'Yours',
    text: 'You run it, on your own servers or in your own cloud. Your members’ posts stay with you, and each profile chooses whether to federate.',
  },
  {
    icon: 'hub',
    title: 'Open',
    text: 'ActivityPub and the AT Protocol, built in. An open API anybody can build on. Open source under the Apache 2.0 and MIT licences.',
  },
  {
    icon: 'spa',
    title: 'Calm',
    text: 'A chronological feed, with no tracking and no ads. Old posts that are still useful count as much as new ones.',
  },
];

export const features = [
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
      'Codes by email',
      'No tokens in the browser',
      'Keys sealed and rotated',
    ],
  },
  { icon: 'person', title: 'People', text: 'Profiles with posts, photos and an About card.' },
  { icon: 'groups', title: 'Groups', text: 'Spaces with followers, for classes, desks and teams.' },
  { icon: 'event', title: 'Events', text: 'Dates, locations and who is going.' },
  { icon: 'article', title: 'Notes and articles', text: 'Short notes and long articles, with drafts.' },
  { icon: 'photo', title: 'Photos and videos', text: 'Up to twenty photos in a post, each described; videos ready for every screen.' },
  { icon: 'label', title: 'Tagging', text: [['tag', 'Hashtags'], ', ', ['place', 'locations'], ', citations, and people in photos, with their approval.'] },
  { icon: 'feed', title: 'Custom feeds', text: 'Feeds that people make for themselves.' },
  { icon: 'rss', title: 'Websites', text: 'Add any blog or site with an RSS, Atom or JSON feed as a profile that people across the fediverse can follow.' },
  { icon: 'search', title: 'Search', text: 'Results ranked by the graph and fine-tuned by each person.' },
  { icon: 'explore', title: 'Recommendations', text: 'Who to follow, worked out from the graph, each with its reason.' },
  { icon: 'notifications', title: 'Notifications', text: 'Grouped, answered in place, and never emailed.' },
  { icon: 'visibility', title: 'Audiences', text: 'Choose who sees each post: public, signed-in people, followers, people you follow, mutuals, or only you.' },
  { icon: 'flag', title: 'Moderation', text: 'Reports gathered into cases, with your own reasons and rules.' },
  { icon: 'download', title: 'Your data', text: 'A full copy to download, readable offline.' },
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
  { title: 'Non-profits', text: 'Reach your community without renting it from Meta or X.' },
];
