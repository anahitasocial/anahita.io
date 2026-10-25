// The repositories whose docs/ the website reads and shows under /docs/.
// scripts/fetch-docs.mjs copies each one's docs into .docs-src/<key>/ before
// a build; a source without a `repo` is left out until it has one.
//
// `aliases` are other names the repository has had: links to them in the
// docs are turned into links within this site.

export const docSources = [
  {
    key: 'web',
    title: 'Anahita Web',
    repo: 'anahitasocial/anahita-web',
    branch: 'main',
    aliases: [],
    // To read a local checkout instead, while writing docs: DOCS_WEB_PATH=../anahita-web
    localEnv: 'DOCS_WEB_PATH',
  },
  {
    key: 'services',
    title: 'Anahita Services',
    // Private until the public release. Set to 'anahitasocial/anahita-services'
    // then, and its docs and the API reference appear on the site.
    repo: null,
    branch: 'main',
    aliases: ['purplerat/anahita-services', 'anahitasocial/anahita-services'],
    localEnv: 'DOCS_SERVICES_PATH',
  },
];
