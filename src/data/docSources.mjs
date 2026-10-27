// The repositories whose docs/ the website reads and shows under /docs/.
// scripts/fetch-docs.mjs copies each one's docs into .docs-src/<key>/ before
// a build; a source without a `repo` is left out until it has one.
//
// `side` is Server (what an operator runs) or Apps (what people use).
// `aliases` are other names the repository has had: links to them in the
// docs are turned into links within this site.

export const docSources = [
  {
    key: 'services',
    title: 'Anahita Services',
    side: 'Server',
    // Public since 2026-10-27: its docs and the API reference are on the site.
    repo: 'anahitasocial/anahita-services',
    branch: 'main',
    aliases: ['purplerat/anahita-services', 'anahitasocial/anahita-services'],
    localEnv: 'DOCS_SERVICES_PATH',
  },
  {
    key: 'web',
    title: 'Anahita Web',
    side: 'Apps',
    repo: 'anahitasocial/anahita-web',
    branch: 'main',
    aliases: [],
    // To read a local checkout instead, while writing docs: DOCS_WEB_PATH=../anahita-web
    localEnv: 'DOCS_WEB_PATH',
  },
];
