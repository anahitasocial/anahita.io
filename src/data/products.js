// The Products page: the server, and the apps. Facts are from the
// repositories' docs and plans; a planned app says only what is decided.

export const server = {
  name: 'Anahita Services',
  repo: 'anahita-services',
  text: 'The server: what you run, on your own machines or in your cloud. It holds everyone’s profiles and posts, keeps them safe, and speaks to the fediverse and Bluesky.',
  facts: [
    'About thirty small services written in Go, each doing one thing, behind one gateway',
    'One open API, described in OpenAPI 3.1 made from the code',
    'Docker Compose on your own machine; Kubernetes when you go live, on any cloud',
    'MySQL, Redis, RabbitMQ and any S3-compatible storage',
    'Open source under the Apache 2.0 licence',
  ],
};

export const apps = [
  {
    name: 'Anahita Web',
    repo: 'anahita-web',
    icon: 'website',
    text: 'In a browser, on a computer or a phone. React and Material UI, in seven languages, under the MIT licence.',
    docs: '/docs/web/',
    github: 'https://github.com/anahitasocial/anahita-web',
  },
  {
    name: 'Anahita Mobile',
    repo: 'anahita-mobile',
    icon: 'phone',
    text: 'For phones, in React Native, once Anahita Web has settled.',
  },
  {
    name: 'Anahita CLI',
    repo: 'anahita-cli',
    icon: 'terminal',
    text: 'In a terminal: text only, a few kilobytes, for slow connections, SSH and screen readers. One program for Linux, macOS and Windows.',
  },
];
