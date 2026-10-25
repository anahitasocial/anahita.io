// The FAQ: each answer in Markdown, checked against anahita-services' docs
// (federation.md, architecture.md, search.md) and anahita-web's
// (configuration.md). `id` is the question's address on the page, and
// `diagram` names one drawn in src/components/diagrams/.

export const questions = [
  {
    id: 'fediverse',
    question: 'What is the fediverse?',
    answer: `Many independent social networks that talk to each other. Mastodon, Pixelfed, GoToSocial and thousands of other servers speak one language, ActivityPub, so somebody on one can follow, reply to and like somebody on another, as email works between providers. No company owns it.`,
  },
  {
    id: 'instance',
    question: 'What is an instance?',
    answer: `One server of the fediverse: one install of the software, at its own address, run by somebody for a community. Your Anahita instance is Anahita Services, running on your own machines or in your cloud, at your domain. People reach it through the apps: Anahita Web today, Anahita Mobile and Anahita CLI to come. On the fediverse its members are known as \`@name@your-domain\`, once they turn federation on.`,
    diagram: 'server-and-apps',
  },
  {
    id: 'bluesky',
    question: 'What are the AT Protocol and Bluesky?',
    answer: `Bluesky is a social network built on a different open protocol, the AT Protocol. There, each person's posts live in their own repository, which they can move from one host to another. Anahita takes part in Bluesky as an app does: people here can follow people on Bluesky, and whoever connects the Bluesky account they already have can post there from Anahita.`,
  },
  {
    id: 'different',
    question: 'How is Anahita different from Mastodon, Pixelfed or Akkoma?',
    answer: `Each of those does one thing well: short posts, or photos. Anahita puts what a community needs in one install: people, groups, events, articles, photos, videos, topics, custom feeds and websites, with administration and moderation made for an organisation. It is a server of the fediverse as they are, and reads and writes Bluesky as well.`,
  },
  {
    id: 'opt-in',
    question: 'Is federation on by default?',
    answer: `No. Nobody is on the fediverse until they turn it on for themselves, and only public posts ever leave: followers-only and members-only posts, and everything on an instance kept to its members, stay at home. Bluesky is the same, for whoever connects their own account. What reaches another server cannot be called back, so it is always a choice. Groups and events stay on the instance.`,
    diagram: 'federation',
  },
  {
    id: 'graph',
    question: 'What is the graph architecture?',
    answer: `Everything in Anahita is a node in one graph: people, groups, events and posts. What ties them together are edges: who follows whom, what was posted where, who replied to what. One service, \`graph-grpc-service\`, keeps the graph, and the others ask it. A person or a post from another server becomes a node too, so following, blocking and feeds work for them with nothing new. Each node has a UUID that never changes, which is what other servers know it by.`,
    diagram: 'graph',
  },
  {
    id: 'chronological',
    question: 'Why is the feed chronological?',
    answer: `Because a feed that ranks for you decides what you see, usually for somebody else's sake. Your feed shows what the people and groups you follow posted, newest first. A ranked feed exists only as a custom feed that people make for themselves, and is always called that. Search can put the most relevant first, and there an old post that is still useful counts as much as a new one; how fast the past fades is the operator's choice.`,
  },
  {
    id: 'tracking',
    question: 'Does Anahita track me?',
    answer: `No. There are no ads, no profile analytics, no share counts and no lists of who viewed what. Anahita Web loads no fonts or scripts from anybody else, and counts page views only if an operator turns that on, with Plausible, Umami or Matomo, each of which can be run on their own servers. This website has no cookies and no analytics.`,
  },
  {
    id: 'running',
    question: 'What does it take to run?',
    answer: `To try it, a computer with Docker: one command starts everything. To run it live, Kubernetes on any cloud or on your own machines, with MySQL, Redis, RabbitMQ and S3-compatible object storage, each of which can be a managed service; and a domain of your own. The [docs](/docs/) go through it in order.`,
  },
  {
    id: 'who',
    question: 'Who makes it, and how is it paid for?',
    answer: `Anahita was founded by Rastin Mehr, its core architect, and is developed and maintained by [rmd Studio](https://www.rmdstudio.com). It is free and open source. It is paid for by [donations](/donate/). Its story goes back further than most of the fediverse: see its [history](/history/).`,
  },
  {
    id: 'licences',
    question: 'What are the licences?',
    answer: `Anahita Services is under the Apache 2.0 licence, and Anahita Web under the MIT licence. This website's code is under the MIT licence, and its words and pictures under Creative Commons Attribution 4.0. The name Anahita and its logo are under neither: they may not be used to present anything as Anahita's own.`,
  },
];
