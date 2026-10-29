// The Anahita AI page. Nothing on it is built yet: alt-text drafts are in
// development, the rest coming soon (anahita-services docs/plans/anahita-ai.md,
// item 95). Change a feature's `state` when its phase lands.

export const ai = {
  title: 'Anahita AI',
  // For search engines and shared links: what it is, in about 155 characters.
  description:
    'Anahita AI: open-source AI for a self-hosted social network on the fediverse. Alt-text drafts, translation, and open science on a knowledge graph.',
  subtitle:
    'Open-source AI for Anahita, the self-hosted social network on the fediverse and Bluesky, with a language model each instance chooses and can run on its own machines. It drafts, and people decide. Alt-text drafts are in development; the rest is coming soon.',
};

// How it is built, in the order the plan gives them.
export const principles = [
  ['Off unless turned on', 'An instance without it shows none of it. Its administrators turn it on and choose the model.'],
  ['Your model, or one you choose', 'A model run on the instance’s own machines through Ollama or any OpenAI-compatible server, or Anthropic’s Claude.'],
  ['It suggests, people decide', 'A draft is edited by its author before anything is saved. A flag goes to a person. Nothing is removed, hidden or ranked by a model.'],
  ['Nobody is tracked', 'Statistics are counts for the whole site, never for one profile. Suggestions come only from interests a person states. The feed stays chronological.'],
  ['Nothing waits for it', 'A service of its own, beside the others. When it is slow or stopped, only its buttons are missing.'],
];

export const current = {
  name: 'Alt-text drafts',
  icon: 'photo',
  text: 'Suggest, beside a photo’s description in the composer: a model describes the photo, and the author changes what they like before posting. For people who use screen readers, and for search.',
  details: [
    ['The author decides', 'nothing is saved until they post, and a line beside Suggest says the words are a draft'],
    ['Where the photo goes', 'to the model the instance chose; with a provider outside the instance, the line says which'],
    ['Why first', 'the quickest to build, and it takes every step the later features take'],
    ['How it fits', 'descriptions are already kept with each photo and carried to Mastodon and Bluesky'],
  ],
};

export const planned = [
  {
    name: 'Ask, for administrators',
    icon: 'query_stats',
    text: 'Questions in plain words, such as “how many new accounts this week?”, answered from the site’s statistics, with the numbers and the period they came from. Counts for the whole site only.',
  },
  {
    name: 'Translation',
    icon: 'translate',
    text: 'Translate under a post in another language, from the fediverse or Bluesky, with the original a tap away. Through LibreTranslate, DeepL or the instance’s own model.',
  },
  {
    name: 'A thread in brief',
    icon: 'article',
    text: 'A long discussion in a group or under a post, in a few lines, each linking to the reply it came from.',
  },
  {
    name: 'Search by meaning',
    icon: 'search',
    text: 'Posts found by what they are about, not only by the words in them: here, and from other servers where they allow it.',
  },
  {
    name: 'Help with moderation',
    icon: 'flag',
    text: 'Likely spam, harassment and abusive media flagged into the review queue, each flag with its reasons. It never removes anything; a person decides.',
  },
  {
    name: 'Groups and people to follow',
    icon: 'groups',
    text: 'Suggestions from interests a person chooses to state, and from nothing else: nothing is inferred from what they read or tap.',
  },
];

// Open science and the knowledge graph: coming soon, with item 50. Citations
// between posts are built (item 60); papers and topics as nodes are not.
export const science = {
  title: 'Open science and knowledge',
  subtitle:
    'Anahita began as tools for open learning and open science, and everything in it sits on one graph: people, groups and posts, and which post cites which. A model can add what the posts talk about, the papers, datasets and topics, and grow it into a map of what a community knows. The model proposes; the author confirms.',
  features: [
    {
      name: 'Citations from papers',
      icon: 'description',
      text: 'A paper shared in a post gives its title, authors, year and DOI, checked against Crossref or DataCite. The paper becomes part of the graph, and every post about it can be found from it.',
    },
    {
      name: 'A knowledge graph',
      icon: 'account_tree',
      text: 'The topics, methods and datasets a post names, proposed as ties in the graph for its author to accept: what a research group or a library knows, laid out as the graph it already has.',
    },
    {
      name: 'Answers with their sources',
      icon: 'bookmark',
      text: 'A question asked of a group or a site, answered only from its posts, each claim linked to the post it came from, and “nothing here says” when nothing does.',
    },
    {
      name: 'Related work',
      icon: 'explore',
      text: 'Beside a post or a paper, the posts and papers nearest to it, by meaning and through the graph, each with the reason it is there.',
    },
  ],
};

// Asked here, and given to search engines as an FAQ.
export const questions = [
  {
    question: 'Does Anahita send posts to an AI company?',
    answer:
      'Only if an instance’s administrators choose a provider outside the instance, and then only what is open to everybody, or a photo its author asks a draft for. A model run on the instance’s own machines sends nothing anywhere.',
  },
  {
    question: 'Can an instance run its own model?',
    answer: 'Yes. Ollama, or any server that speaks the OpenAI-compatible API, on the instance’s own machines; that is what the docs lead with.',
  },
  {
    question: 'Will a model decide what people see?',
    answer:
      'No. The feed stays chronological, drafts are edited by their authors, and a flag waits for a person. A ranked feed is only ever a custom feed somebody makes.',
  },
  {
    question: 'Is any of it built?',
    answer: 'Not yet. Alt-text drafts are in development; the others are coming soon, one at a time.',
  },
];
