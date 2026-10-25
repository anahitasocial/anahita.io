// Anahita Services, one by one, from anahita-services' docs/architecture.md
// ("Services"). `doc` is the page of its docs that describes it; `optional`
// marks what an instance may leave out; `details`, for the services worth
// telling more about, are checked against their code and docs
// (signing-in.md, configuration.md, architecture.md).

export const groups = [
  {
    title: 'The gateway and signing in',
    services: [
      { name: 'nginx', text: 'The one door in: routes each request to its service and checks the token it carries.' },
      {
        name: 'auth-service',
        text: 'Signing in and signing up, for Anahita’s own apps and anybody else’s.',
        doc: 'oauth',
        details: [
          ['OAuth 2.0 and OpenID Connect', 'a complete provider: discovery, keys, user info, refresh tokens, introspection and revocation; PKCE for apps that hold no secret, client credentials for services.'],
          ['Passkeys', 'WebAuthn, with Face ID, Touch ID, Windows Hello or a security key. A passkey is both factors.'],
          ['Two-factor', 'codes from any authenticator app, their secrets encrypted at rest.'],
          ['Codes by email', 'signing in without a password.'],
          ['Signing keys', 'rotated every 90 days, and sealed with a key of your own or AWS KMS: reading the database is not enough to make a token.'],
          ['Who may join', 'invitations, applications to join, and the agreements a member accepts.'],
          ['Guarded', 'limits on guessing codes and passwords, and a one-time token on every form.'],
        ],
      },
    ],
  },
  {
    title: 'Profiles and the graph',
    services: [
      {
        name: 'actor-service',
        text: 'Every kind of profile, in one service.',
        details: [
          ['People', 'a profile at a username, made when somebody signs up.'],
          ['Groups', 'made by members, with administrators and followers; a group can host events.'],
          ['Events', 'a start and an end in their own time zone, how many may go, and where to join online; going or maybe, calling it off, and a calendar file.'],
          ['Websites', 'a website’s feed, followed like a profile.'],
          ['Every kind', 'an avatar and a cover, followers, invitations, who may see and do what, and the same life from enabled to archived to deleted.'],
        ],
      },
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
      { name: 'file-grpc-service', text: 'Files, on any S3-compatible object storage; checks what each upload really is.', doc: 'configuration' },
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
  { name: 'Object storage', text: 'Photos, videos and files, on any S3-compatible store: Garage on your own machine, your own or your cloud’s live.' },
];
