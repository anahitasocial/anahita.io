// Anahita Services, one by one, from anahita-services' docs/architecture.md
// ("Services"). `doc` is the page of its docs that describes it; `optional`
// marks what an instance may leave out.

export const groups = [
  {
    title: 'The gateway and signing in',
    services: [
      { name: 'nginx', text: 'The one door in: routes each request to its service and checks the token it carries.' },
      { name: 'auth-service', text: 'Signing in and signing up, passkeys and two-factor codes, invitations, and the OAuth clients apps sign in through.', doc: 'oauth' },
    ],
  },
  {
    title: 'Profiles and the graph',
    services: [
      { name: 'actor-service', text: 'The profiles of people, groups and events, all in one service.' },
      { name: 'socialgraph-service', text: 'Who follows, blocks and subscribes to whom.', doc: 'permissions' },
      { name: 'identity-image-service', text: 'The avatars and covers of profiles and posts.' },
      { name: 'graph-grpc-service', text: 'The graph every other service reads: profiles and posts are its nodes, and the ties between them its edges.' },
    ],
  },
  {
    title: 'Posts and media',
    services: [
      { name: 'text-service', text: 'Articles, notes and topics.', doc: 'post-language' },
      { name: 'photo-service', text: 'Photo posts.', doc: 'photos' },
      { name: 'video-service', text: 'Video posts. A worker makes each video ready for every screen.', doc: 'videos', optional: true },
      { name: 'hashtag-service', text: 'Hashtags.', doc: 'hashtags' },
      { name: 'location-service', text: 'The locations posts are tagged with, and finding them on a map.' },
      { name: 'like-service', text: 'Likes.' },
      { name: 'link-preview-service', text: 'The card under a note that links to a page: its title and picture.', doc: 'link-previews', optional: true },
    ],
  },
  {
    title: 'Feeds, search and notifications',
    services: [
      { name: 'feed-service', text: 'The chronological feed, reposts, and the custom feeds people make.', doc: 'feeds' },
      { name: 'search-service', text: 'Search for people, groups, events, posts and shared feeds; the most relevant first, or the newest.', doc: 'search' },
      { name: 'recommendation-service', text: 'Suggestions of who to follow.', doc: 'recommendations', optional: true },
      { name: 'notification-service', text: 'Notifications in the app.', doc: 'notifications' },
    ],
  },
  {
    title: 'The open social web',
    services: [
      { name: 'activitypub-service', text: 'Makes the instance a server of the fediverse, for the people who choose to be found there.', doc: 'federation', optional: true },
      { name: 'atproto-service', text: 'Bluesky: following accounts there, and posting there for whoever connects their own account.', doc: 'federation', optional: true },
      { name: 'syndication-service', text: 'Follow a website’s feed like a profile. A worker reads every feed and posts what is new.', doc: 'websites', optional: true },
    ],
  },
  {
    title: 'Safety and your data',
    services: [
      { name: 'abuse-report-service', text: 'Reports of people and posts, and the cases administrators decide.', doc: 'abuse-reports' },
      { name: 'export-service', text: 'A copy of your own data, made by a worker and kept for a while to download.', doc: 'data-export', optional: true },
      { name: 'account-sweeper', text: 'Hourly upkeep: finishes deleting accounts after their grace period, reminds people of events, tidies what was left unused.', doc: 'account-lifecycle' },
    ],
  },
  {
    title: 'Storage, mail and upkeep',
    services: [
      { name: 'file-grpc-service', text: 'Files, on any S3-compatible storage; checks what each upload really is.', doc: 'configuration' },
      { name: 'mail-grpc-service', text: 'Email, over SMTP.', doc: 'configuration' },
      { name: 'web-shell', text: 'Serves Anahita Web, with each page’s own title and picture, so a shared link shows as itself.', doc: 'web-shell', optional: true },
      { name: 'migration-job', text: 'Brings the database up to date at each upgrade.' },
    ],
  },
];

export const backing = [
  { name: 'MySQL', text: 'Everything that is kept.' },
  { name: 'Redis', text: 'Sessions.' },
  { name: 'RabbitMQ', text: 'Events between the services.' },
  { name: 'S3-compatible storage', text: 'Photos, videos and files: Garage on your own machine, any S3 service live.' },
];
