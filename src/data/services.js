// Anahita Services, one by one, from anahita-services' docs/architecture.md
// ("Services"). `doc` is the page of its docs that describes it; `optional`
// marks what an instance may leave out; `icon` is named in
// src/app/products/services/page.jsx. `details` are what each does that is
// worth knowing, only what is built, each checked against the service's
// docs and code (2026-10-24). A new claim is checked the same way first.

export const groups = [
  {
    title: 'Signing in',
    services: [
      {
        name: 'auth-service',
        icon: 'key',
        text: 'Signing in and signing up, for Anahita’s own apps and anybody else’s.',
        doc: 'oauth',
        details: [
          ['OAuth 2.0 and OpenID Connect', 'a complete provider: discovery, keys, UserInfo, refresh tokens, introspection and revocation; PKCE for apps that hold no secret, client credentials for services.'],
          ['No tokens in the browser', 'a backend for frontend (BFF): Anahita Web holds only an HttpOnly, SameSite session cookie, and the tokens stay on the server, traded for the cookie on each request.'],
          ['Passkeys', 'WebAuthn, with Face ID, Touch ID, Windows Hello or a security key. A passkey is both factors.'],
          ['Two-factor', 'codes from any authenticator app, their secrets encrypted at rest.'],
          ['OTP by email', 'a one-time password by email: signing in without a password.'],
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
        icon: 'badge',
        text: 'Every kind of profile, in one service.',
        details: [
          ['People', 'a profile at a username, made when somebody signs up.'],
          ['Groups', 'made by members, with administrators and followers; a group can host events.'],
          ['Events', 'a start and an end in their own time zone, how many may go, and where to join online; going or maybe, calling it off, and a calendar file.'],
          ['Websites', 'a website’s feed, followed like a profile.'],
          ['Every kind', 'an avatar and a cover, followers, invitations, who may see and do what, and the same life from enabled to archived to deleted.'],
        ],
      },
      {
        name: 'socialgraph-service',
        icon: 'share',
        text: 'Who follows, blocks and subscribes to whom.',
        doc: 'permissions',
        details: [
          ['Follow requests', 'a profile can ask to approve its followers, and shows strangers only its name and picture.'],
          ['Invitations', 'up to 50 followers invited to a group or event at once; unanswered ones lapse after 30 days.'],
          ['Blocks that hold', 'a block ends follows both ways, and is sent on to the fediverse.'],
          ['Each person’s say', 'who may mention them, and who may tag them in photos, or approve each first.'],
          ['Group rules', 'a group or event with rules is followed only once each rule is agreed to.'],
        ],
      },
      {
        name: 'identity-image-service',
        icon: 'account',
        text: 'The avatars and covers of profiles and posts.',
        details: [
          ['Safe images', 'each upload is judged by its bytes, turned upright and encoded afresh; nothing is kept as it arrived.'],
          ['Addresses that stay', 'a public profile’s pictures keep one address, so other servers can link to them for good.'],
        ],
      },
      {
        name: 'graph-grpc-service',
        icon: 'schema',
        text: 'The graph every other service reads: profiles and posts are its nodes, and the ties between them its edges.',
        details: [
          ['One gate', 'feeds, search, notifications and recommendations all ask one check of who may see what.'],
          ['Identifiers for good', 'every node has a random UUID that never changes, used in every address other servers are given.'],
          ['Threads in one go', 'up to ten notes written as a thread are saved together, all or none.'],
          ['Purges that finish', 'deleting a profile’s posts goes in batches it can resume, and keeps its handle from being taken.'],
        ],
      },
    ],
  },
  {
    title: 'Posts and media',
    services: [
      {
        name: 'text-service',
        icon: 'article',
        text: 'Notes, articles and topics.',
        doc: 'post-language',
        details: [
          ['Drafts', 'articles and topics can be kept as drafts and published when ready.'],
          ['Embeds and citations', 'an address on a line of its own shows the post or a card for the page; citations are counted and listed as “Cited by”.'],
          ['Quotes by consent', 'authors choose who may quote them, and can take their post out of any quote.'],
          ['Who may reply', 'anyone, nobody, followers, people they follow or people mentioned; and replies can be hidden.'],
          ['Private saves', 'what somebody saves is seen by them alone: nothing is counted, and the author is never told.'],
        ],
      },
      {
        name: 'photo-service',
        icon: 'photo',
        text: 'Photo posts.',
        doc: 'photos',
        details: [
          ['Up to twenty images', 'in one post, with one caption and one audience.'],
          ['Alt text', 'a description of up to 2,000 characters for each image.'],
          ['Nothing hidden in the file', 'each image is encoded afresh at six sizes, never enlarged, so only the picture is kept.'],
          ['Downloads by consent', 'full size only if the author allows it, and never counted.'],
        ],
      },
      {
        name: 'video-service',
        icon: 'video',
        text: 'Video posts. A worker makes each video ready for every screen.',
        doc: 'videos',
        optional: true,
        details: [
          ['Straight to storage', 'the browser sends a video in parts directly to object storage.'],
          ['Several sizes', 'MP4 at 1080, 720 and 360 by default, up to 4K, with a poster frame.'],
          ['Nothing hidden in the file', 'every file shown is encoded afresh, and the original is deleted.'],
          ['GIFs as loops', 'animated GIFs become silent looping videos, a fraction of the size.'],
          ['Checked on every play', 'each play checks again that the viewer may see the post.'],
        ],
      },
      {
        name: 'hashtag-service',
        icon: 'tag',
        text: 'Hashtags.',
        doc: 'hashtags',
        details: [
          ['Any language', 'letters of any script, digits and emoji, whatever their case.'],
          ['Fair trending', 'each profile counts once, only public posts count, and the window is the operator’s.'],
          ['Suggestions while writing', 'offered as you type, or from the title (“open science” finds #OpenScience).'],
          ['From elsewhere too', 'a hashtag in a post from another server leads to this instance’s own page for it.'],
        ],
      },
      {
        name: 'location-service',
        icon: 'place',
        text: 'The locations posts are tagged with, and finding them on a map.',
        details: [
          ['Open maps', 'addresses found with OpenStreetMap’s Photon and Nominatim, which can be run yourself.'],
          ['The operator decides', 'who may add a location: administrators, anyone signed in, or super administrators.'],
          ['Understood elsewhere', 'up to five per post, sent to other servers in the form Pixelfed reads.'],
          ['Nearby and trending', 'locations within a distance of a point, and those used most lately.'],
        ],
      },
      {
        name: 'like-service',
        icon: 'like',
        text: 'Likes.',
        details: [
          ['With permissions', 'each profile chooses who may like what it posts: followers by default.'],
          ['Lists that respect privacy', 'who liked a post shows only the people its reader may see.'],
          ['Across networks', 'likes cross to and from the fediverse and Bluesky.'],
        ],
      },
    ],
  },
  {
    title: 'Feeds, search and notifications',
    services: [
      {
        name: 'feed-service',
        icon: 'feed',
        text: 'The chronological feed, reposts, and the custom feeds people make.',
        doc: 'feeds',
        details: [
          ['Chronological first', 'the first tab is always who you follow, newest first, and it cannot be removed.'],
          ['Custom feeds', 'made from sources, filtered by hashtag, keyword, location, language and kind of post.'],
          ['Near me', 'posts within 1 to 500 km, with the reader’s position never kept.'],
          ['Never wider', 'a shared feed shows each reader only what they could already see.'],
          ['Share, copy, pin', 'feeds can be shared, found, copied and kept on the home page.'],
        ],
      },
      {
        name: 'search-service',
        icon: 'search',
        text: 'Search for people, groups, events, posts and shared feeds; the most relevant first, or the newest.',
        doc: 'search',
        details: [
          ['Old and useful', 'how fast interest fades is the operator’s to set: a year by default, or never.'],
          ['Each person’s weights', 'six signals each person can turn down or up, kept wherever they sign in.'],
          ['Any script', '“Montréal” and “東京” are found as typed.'],
        ],
      },
      {
        name: 'recommendation-service',
        icon: 'explore',
        text: 'Recommendations of who to follow.',
        doc: 'recommendations',
        optional: true,
        details: [
          ['Reasons, not a model', 'worked out from the graph by written rules, and shown with their reasons.'],
          ['In each person’s hands', 'weights for each reason, “Not interested”, and not being suggested at all.'],
          ['Replaceable', 'leave it out, or run another service that answers the same way.'],
        ],
      },
      {
        name: 'notification-service',
        icon: 'notifications',
        text: 'Notifications in the app.',
        doc: 'notifications',
        details: [
          ['Never emailed', 'notifications stay in the app; a test fails if a service starts sending mail.'],
          ['Gone with their cause', 'a deleted post or a like taken back takes its notification with it.'],
          ['Grouped', '“Worf and 2 others liked your post”.'],
          ['Act in place', 'accept a follow request, approve a tag or follow back, right from the notification.'],
        ],
      },
    ],
  },
  {
    title: 'The open social web',
    services: [
      {
        name: 'activitypub-service',
        icon: 'fediverse',
        text: 'Makes the instance a server of the fediverse, for the people who choose to be found there.',
        doc: 'federation',
        optional: true,
        details: [
          ['Both ways', 'follows, notes, photos, videos, articles, replies, likes and reposts, with Mastodon, Pixelfed, GoToSocial and others.'],
          ['Signed and checked', 'each person has their own signing keys, kept encrypted; every message in is checked against its sender.'],
          ['Delivered', 'sending is retried for two days, and what goes missing is found and sent again.'],
          ['Refusing servers', 'super administrators can refuse a domain and everything under it, on the fediverse and on Bluesky.'],
          ['Refusing accounts', 'administrators can refuse one account on the fediverse or Bluesky for the whole instance; what was here of it is removed, and nothing more is taken from it or sent to it.'],
        ],
      },
      {
        name: 'atproto-service',
        icon: 'bluesky',
        text: 'Bluesky: following profiles there, and posting there for whoever connects their own Bluesky account.',
        doc: 'federation',
        optional: true,
        details: [
          ['For everyone', 'anybody can follow Bluesky profiles from here, without a Bluesky account.'],
          ['Post as yourself', 'connect your Bluesky account to post, reply, like, repost and follow there.'],
          ['Password never kept', 'the app password is traded once for a token, which is kept encrypted.'],
          ['Refused by DID', 'a Bluesky account the instance refuses is heard no more and removed, by what does not change, whatever its handle becomes.'],
          ['Bring your follows', 'follow here the people you already follow on Bluesky.'],
        ],
      },
      {
        name: 'syndication-service',
        icon: 'rss',
        text: 'Follow a website’s feed like a profile. A worker reads every feed and posts what is new.',
        doc: 'websites',
        optional: true,
        details: [
          ['Any feed', 'RSS, Atom or JSON Feed, from WordPress, a static site or a podcast; followed here and from the fediverse.'],
          ['Proven domains', 'a DNS record or a file on the site, checked again every day.'],
          ['Polite', 'feeds are read every 30 minutes, or at once through WebSub, and less often when they fail.'],
          ['Replies as the site', 'its administrators can answer readers as the website.'],
        ],
      },
      {
        name: 'link-preview-service',
        icon: 'link',
        text: 'The card under a note that links to a page: its title and picture.',
        doc: 'link-previews',
        optional: true,
        details: [
          ['Safe fetching', 'web addresses only; private and internal addresses are refused, and every redirect is checked again.'],
          ['Private reading', 'the picture is served from this instance, so reading a note tells the linked site nothing.'],
          ['Cards that last', 'the card is kept with the note, and reads the same if the page changes or goes.'],
        ],
      },
    ],
  },
  {
    title: 'Safety and your data',
    services: [
      {
        name: 'abuse-report-service',
        icon: 'flag',
        text: 'Reports of people and posts, and the cases administrators decide.',
        doc: 'abuse-reports',
        details: [
          ['Cases, not piles', 'everyone who reports the same thing joins one case.'],
          ['Your own reasons', 'the list of reasons can be replaced with your own, in your languages.'],
          ['Rules', 'a report can name a site’s, group’s or event’s rule; group administrators see those without the reporters’ names.'],
          ['Reporters protected', 'the person reported is never told who reported them.'],
          ['Acted on from the case', 'a spammer here removed at once, or an account from the fediverse or Bluesky refused for the whole instance, and the case closes.'],
        ],
      },
      {
        name: 'export-service',
        icon: 'download',
        text: 'A copy of your own data, made by a worker and kept for a while to download.',
        doc: 'data-export',
        optional: true,
        details: [
          ['Everything', 'every post, private ones too, full-size photos and videos, follows, followers, blocks, likes and saves.'],
          ['Readable anywhere', 'a web page in the archive works with no connection and no scripts.'],
          ['Portable', 'ActivityStreams files that other fediverse software reads.'],
          ['Asked for in person', 'each copy needs a fresh proof of who you are, and is kept for 7 days.'],
        ],
      },
      {
        name: 'account-sweeper',
        icon: 'sweep',
        text: 'Upkeep by the clock.',
        doc: 'account-lifecycle',
        details: [
          ['Grace, then gone', 'a deleted profile is purged when its 30 days of grace are over.'],
          ['Resumable', 'a purge that was interrupted carries on where it stopped.'],
          ['Events', 'a reminder the day before, and archived 30 days after.'],
          ['Tidying', 'photos uploaded but never posted, and invitations nobody answered, are removed.'],
        ],
      },
    ],
  },
  {
    title: 'Storage, mail and upkeep',
    services: [
      {
        name: 'file-grpc-service',
        icon: 'folder',
        text: 'Files, on any S3-compatible object storage.',
        doc: 'configuration',
        details: [
          ['Any store', 'AWS, Garage or any other S3-compatible store, with a test to check a new one.'],
          ['Judged by its bytes', 'what a file says it is counts for nothing: an HTML file named photo.png is refused.'],
          ['Private by default', 'the store stays private, and every link to a file is signed and short-lived.'],
        ],
      },
      {
        name: 'mail-grpc-service',
        icon: 'mail',
        text: 'Email, over SMTP.',
        doc: 'configuration',
        details: [
          ['Any provider', 'any SMTP server or relay, with TLS.'],
          ['Account mail only', 'signing in and account messages; nothing else is ever mailed.'],
          ['Safe while developing', 'in development, every message goes to the developer instead.'],
        ],
      },
      {
        name: 'web-shell',
        icon: 'web',
        text: 'Serves Anahita Web, with each page’s own title and picture, so a shared link shows as itself.',
        doc: 'web-shell',
        optional: true,
        details: [
          ['The same for all', 'crawlers and people are sent the same page; nobody is told apart.'],
          ['Public only', 'a page is described only if its post and profile are public.'],
          ['Handles on your domain', 'the fediverse finds @name@your-domain at the main address.'],
        ],
      },
      {
        name: 'migration-job',
        icon: 'upgrade',
        text: 'Brings the database up to date at each upgrade.',
        details: [
          ['Three paths', 'a fresh database, an upgrade in place from the PHP Anahita, or the newest changes.'],
          ['Proven the same', 'a test compares a fresh database and an upgraded one, column by column.'],
        ],
      },
    ],
  },
];

export const backing = [
  { name: 'MySQL', icon: 'database', text: 'Everything that is kept.' },
  { name: 'Redis', icon: 'memory', text: 'Sessions.' },
  { name: 'RabbitMQ', icon: 'events', text: 'Events between the services.' },
  { name: 'Object storage', icon: 'files', text: 'Photos, videos and files, on any S3-compatible store: Garage on your own machine, your own or your cloud’s live.' },
];
