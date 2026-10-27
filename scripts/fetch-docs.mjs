// Copies the docs of each repository in src/data/docSources.mjs into
// .docs-src/<key>/, for the site to render, with the commit they came from.
// The working notes in docs/plans/ are left behind. Images go to
// public/docs-assets/<key>/. anahita-services' OpenAPI documents, one for
// each service and anahita.json of them all, go to .docs-src/api/, which the
// API reference at /api/ is made from (lib/api.js), and anahita.json also to
// public/api/, for builders' own tools.
//
//   node scripts/fetch-docs.mjs          fetch what is missing
//   node scripts/fetch-docs.mjs --force  fetch everything again
//
// DOCS_WEB_PATH=../anahita-web (and DOCS_SERVICES_PATH) read a local
// checkout instead of cloning from GitHub.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { docSources } from '../src/data/docSources.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const force = process.argv.includes('--force');
const git = (args, cwd) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

for (const source of docSources) {
  const target = path.join(root, '.docs-src', source.key);
  const local = process.env[source.localEnv];

  if (!source.repo && !local) {
    fs.rmSync(target, { recursive: true, force: true });
    fs.rmSync(path.join(root, 'public', 'docs-assets', source.key), { recursive: true, force: true });
    if (source.key === 'services') {
      fs.rmSync(path.join(root, 'public', 'api'), { recursive: true, force: true });
      fs.rmSync(path.join(root, '.docs-src', 'api'), { recursive: true, force: true });
    }
    continue;
  }
  if (fs.existsSync(target) && !force && !local) {
    continue;
  }

  let checkout = local && path.resolve(root, local);
  let temporary;
  if (!checkout) {
    temporary = fs.mkdtempSync(path.join(os.tmpdir(), `docs-${source.key}-`));
    checkout = temporary;
    console.log(`Fetching the docs of ${source.repo}`);
    git(['clone', '--quiet', '--depth', '1', '--branch', source.branch,
      `https://github.com/${source.repo}.git`, checkout]);
  }

  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(path.join(checkout, 'docs'), target, {
    recursive: true,
    filter: (from) => !/[\\/](plans|api)([\\/]|$)/.test(path.relative(checkout, from)),
  });
  fs.writeFileSync(
    path.join(target, '.meta.json'),
    JSON.stringify({
      // Read locally before the repository is public: its future name.
      repo: source.repo ?? source.aliases.at(-1),
      commit: git(['rev-parse', 'HEAD'], checkout),
      date: git(['log', '-1', '--format=%cs'], checkout),
    }),
  );

  const images = path.join(checkout, 'docs', 'images');
  const assets = path.join(root, 'public', 'docs-assets', source.key);
  fs.rmSync(assets, { recursive: true, force: true });
  if (fs.existsSync(images)) {
    fs.cpSync(images, path.join(assets, 'images'), { recursive: true });
  }

  const api = path.join(checkout, 'docs', 'api');
  if (source.key === 'services' && fs.existsSync(path.join(api, 'anahita.json'))) {
    const documents = path.join(root, '.docs-src', 'api');
    fs.rmSync(documents, { recursive: true, force: true });
    fs.mkdirSync(documents, { recursive: true });
    for (const file of fs.readdirSync(api).filter((name) => name.endsWith('.json'))) {
      fs.copyFileSync(path.join(api, file), path.join(documents, file));
    }
    fs.rmSync(path.join(root, 'public', 'api'), { recursive: true, force: true });
    fs.mkdirSync(path.join(root, 'public', 'api'), { recursive: true });
    fs.copyFileSync(path.join(api, 'anahita.json'), path.join(root, 'public', 'api', 'anahita.json'));
  }

  if (temporary) fs.rmSync(temporary, { recursive: true, force: true });
  console.log(`Docs of ${source.key}: ${local ? `from ${local}` : source.repo}`);
}
