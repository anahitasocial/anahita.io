// The API reference, from the OpenAPI documents scripts/fetch-docs.mjs copied
// into .docs-src/api/: anahita.json of every service, under its groups
// (x-tagGroups), and each service's own file for what it says of itself.
// Everything here is worked out once, at build time, into what the pages at
// /api/ show: routes, their fields, and example requests and answers.
import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { codeTabs, outboundLinks } from './markdown';
import { getSource, resolveHref } from './docs';

const folder = path.join(process.cwd(), '.docs-src', 'api');

function read(file) {
  const at = path.join(folder, file);
  return fs.existsSync(at) ? JSON.parse(fs.readFileSync(at, 'utf8')) : null;
}

// A service's address under /api/: its name without "-service".
const slugOf = (service) => service.replace(/-service$/, '');

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

// Who may call a route, in words, as the reference made in Go says it.
const VIEWERS = {
  anyone: 'Anyone, signed in or not',
  signed_in: 'Somebody signed in',
  admin: 'An administrator',
  super_admin: 'A super administrator',
};

// Worked out once, and again when anahita.json changes: in `yarn dev` the
// documents may be fetched while the server runs.
let cached;
let cachedAt;

// The whole reference, or null when the services' docs are not on the site.
export function getApi() {
  const file = path.join(folder, 'anahita.json');
  const at = fs.existsSync(file) ? fs.statSync(file).mtimeMs : null;
  if (cached !== undefined && at === cachedAt) return cached;
  cachedAt = at;
  const all = at && read('anahita.json');
  if (!all) {
    cached = null;
    return cached;
  }
  const schemas = all.components?.schemas || {};
  const titles = Object.fromEntries((all.tags || []).map((tag) => [tag.name, tag.description]));

  const routes = {};
  for (const [route, item] of Object.entries(all.paths || {})) {
    for (const method of METHODS) {
      const op = item[method];
      if (!op) continue;
      for (const tag of op.tags || []) (routes[tag] ||= []).push({ method, path: route, op });
    }
  }
  for (const list of Object.values(routes)) {
    list.sort((a, b) => a.path.localeCompare(b.path) || METHODS.indexOf(a.method) - METHODS.indexOf(b.method));
  }

  const groups = (all['x-tagGroups'] || [{ name: 'Services', tags: Object.keys(titles) }]).map((group) => ({
    name: group.name,
    services: group.tags.map((name) => ({
      name,
      slug: slugOf(name),
      title: titles[name] || name,
      about: read(`${name}.json`)?.info?.description || '',
      routes: (routes[name] || []).map(({ method, path: route, op }) => ({
        id: op.operationId,
        method,
        path: route,
        summary: op.summary || '',
        op,
      })),
    })),
  }));

  // Where each route is, for links to it from the docs.
  const where = {};
  for (const group of groups) {
    for (const service of group.services) {
      for (const route of service.routes) where[route.id] = service.slug;
    }
  }

  cached = { groups, schemas, where, server: all.servers?.[0]?.variables?.host?.default || 'api.example.org' };
  return cached;
}

export function getServices() {
  return getApi()?.groups.flatMap((group) => group.services.map((service) => ({ ...service, group: group.name }))) || [];
}

export function getService(slug) {
  return getServices().find((service) => service.slug === slug) || null;
}

// Where a link to the reference made in Go (api/index.html#…) leads here: a
// service by its name, a route by its operationId, a shape by "schema-".
export function apiHref(hash = '') {
  const id = hash.replace(/^#/, '');
  const api = getApi();
  if (!id || !api) return '/api/';
  if (id === 'schemas') return '/api/shapes/';
  if (id.startsWith('schema-')) return `/api/shapes/#${id.slice('schema-'.length)}`;
  if (id.endsWith('-service')) return `/api/${slugOf(id)}/`;
  if (api.where[id]) return `/api/${api.where[id]}/#${id}`;
  return '/api/';
}

// --- Words ---------------------------------------------------------------

// A description, in the reference's Markdown: `code`, **strong**, links to
// the prose pages ("[OAuth](oauth.md)", or "(oauth.md)" in passing), which
// lead to their pages here.
function markdown(text, { inline = false } = {}) {
  if (!text) return '';
  const source = getSource('services');
  const linked = text.includes('](') ? text : text.replace(/(^|[\s(])([a-z0-9][a-z0-9-]*\.md)\b/g, '$1[$2]($2)');
  const html = String(
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(() => (tree) => {
        visit(tree, 'element', (node) => {
          if (node.tagName !== 'a' || !source) return;
          const href = resolveHref(node.properties.href, { source, slug: 'README' });
          if (href === null) {
            node.tagName = 'span';
            delete node.properties.href;
          } else {
            node.properties.href = href;
          }
        });
      })
      .use(outboundLinks)
      .use(rehypeStringify)
      .processSync(linked),
  );
  return inline ? html.replace(/^<p>([\s\S]*)<\/p>$/, '$1') : html;
}

const escape = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const refName = (ref) => ref.replace('#/components/schemas/', '');

// A schema's type in words, with a link to a named shape.
function typeOf(schema) {
  if (!schema) return 'anything';
  if (schema.$ref) {
    const name = refName(schema.$ref);
    return `<a href="/api/shapes/#${escape(name)}">${escape(name)}</a>`;
  }
  if (schema.anyOf) return `one of ${schema.anyOf.map(typeOf).join(', ')}`;
  if (Array.isArray(schema.type)) {
    const kinds = schema.type.filter((t) => t !== 'null');
    const plain = typeOf({ ...schema, type: kinds[0] });
    return schema.type.includes('null') ? `${plain} or null` : plain;
  }
  switch (schema.type) {
    case 'array':
      return `list of ${typeOf(schema.items)}`;
    case 'object':
      if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
        return `map of ${typeOf(schema.additionalProperties)}`;
      }
      return 'object';
    case undefined:
      return 'anything';
    default:
  }
  switch (schema.format) {
    case 'date-time':
      return 'time';
    case 'binary':
      return 'file';
    case 'int64':
    case 'int32':
      return 'integer';
    case undefined:
      return schema.type;
    default:
      return `${schema.type} (${escape(schema.format)})`;
  }
}

// What a value may be, in words, after its description.
function constraints(schema = {}) {
  const said = [];
  if (schema.enum) said.push(`One of ${schema.enum.map((v) => `\`${v}\``).join(', ')}.`);
  if (schema.default !== undefined) said.push(`\`${schema.default}\` unless given.`);
  const limits = { minimum: 'At least', maximum: 'At most', minLength: 'At least', maxLength: 'At most', minItems: 'At least', maxItems: 'At most' };
  for (const [key, words] of Object.entries(limits)) {
    if (schema[key] === undefined) continue;
    const unit = /Length/.test(key) ? ' characters' : /Items/.test(key) ? ' of them' : '';
    said.push(`${words} ${schema[key]}${unit}.`);
  }
  return said.length ? ` ${said.sort().join(' ')}` : '';
}

// An object's fields, each with its type and what it is. Where a field is an
// object of its own, written out in place, its fields are under it.
export function fieldsOf(schema, depth = 0) {
  const properties = schema?.properties;
  if (!properties || depth > 3) return [];
  const required = new Set(schema.required || []);
  return Object.keys(properties)
    .sort()
    .map((name) => {
      const field = properties[name] || {};
      const inner = field.type === 'array' ? field.items : field;
      return {
        name,
        required: required.has(name),
        type: typeOf(field),
        description: markdown(`${field.description || ''}${constraints(field)}`.trim(), { inline: true }),
        children: inner && !inner.$ref && inner.properties ? fieldsOf(inner, depth + 1) : [],
      };
    });
}

// A shape's description without the Go name it begins with: "TotpStatus is
// whether …" is "Whether …".
function withoutName(description = '', name = '') {
  const short = name.split('.').pop();
  const rest = description.startsWith(`${short} is `) ? description.slice(short.length + 4) : null;
  return rest ? rest[0].toUpperCase() + rest.slice(1) : description;
}

export function getShapes() {
  const api = getApi();
  if (!api) return [];
  return Object.keys(api.schemas)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => {
      const schema = api.schemas[name];
      return {
        name,
        description: markdown(withoutName(schema.description, name)),
        fields: fieldsOf(schema),
        type: schema.properties ? null : typeOf(schema),
      };
    });
}

// --- Examples ------------------------------------------------------------

const EXAMPLE_TIME = '2026-10-27T09:30:00Z';

// A value of a schema's shape, from what the schema says of itself: its
// enum, its default, its format, a type its description names ("Always
// `node.tag.hashtag-service.hashtag.v1`"), and the field's name.
function example(schema, name = '', seen = new Set(), depth = 0) {
  if (!schema || depth > 5) return null;
  if (schema.$ref) {
    const ref = refName(schema.$ref);
    if (seen.has(ref)) return {};
    return example(getApi().schemas[ref], name, new Set([...seen, ref]), depth + 1);
  }
  if (schema.anyOf) return example(schema.anyOf[0], name, seen, depth + 1);
  if (schema.enum) return schema.enum[0];
  if (schema.default !== undefined) return schema.default;
  const type = Array.isArray(schema.type) ? schema.type.find((t) => t !== 'null') : schema.type;
  switch (type) {
    case 'object': {
      if (schema.properties) {
        return Object.fromEntries(
          Object.keys(schema.properties)
            .sort()
            .map((key) => [key, example(schema.properties[key], key, seen, depth + 1)]),
        );
      }
      if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
        return { key: example(schema.additionalProperties, '', seen, depth + 1) };
      }
      return {};
    }
    case 'array':
      return [example(schema.items, name, seen, depth + 1)];
    case 'integer':
      if (name === 'id' || name.endsWith('_id')) return 42;
      return schema.minimum && schema.minimum > 1 ? schema.minimum : 1;
    case 'number':
      return schema.minimum ?? 1.5;
    case 'boolean':
      return false;
    case 'string': {
      const always = (schema.description || '').match(/Always `([^`]+)`/);
      if (always) return always[1];
      if (schema.format === 'date-time' || name.endsWith('_at')) return EXAMPLE_TIME;
      if (schema.format === 'date') return EXAMPLE_TIME.slice(0, 10);
      if (schema.format === 'email' || name === 'email') return 'picard@example.org';
      if (schema.format === 'uri' || schema.format === 'url' || /(^|_)(url|uri)$/.test(name)) return 'https://example.org/';
      if (schema.format === 'binary') return '…';
      if (name === 'language') return 'en';
      return 'string';
    }
    default:
      return null;
  }
}

// The request, as curl, JavaScript and Python, and an example of what is
// answered when all goes well: Markdown, for the code tabs (lib/markdown.js).
function examples(route, server) {
  const { method, path: route_path, op } = route;
  const upper = method.toUpperCase();
  const query = (op.parameters || []).filter((p) => p.in === 'query' && p.required);
  const url = `https://${server}${route_path.replace(/\{(\w+)\}/g, '<$1>')}${query.length ? `?${query.map((p) => `${p.name}=<${p.name}>`).join('&')}` : ''}`;
  const signed = !(op.security || []).some((s) => Object.keys(s).length === 0) && (op.security || []).length > 0;

  const content = op.requestBody?.content || {};
  const media = ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'].find((m) => content[m]);
  const body = media ? example(content[media].schema) : null;
  const fields = body && typeof body === 'object' && !Array.isArray(body) ? Object.entries(body) : [];
  const isFile = (key) => {
    let schema = content[media]?.schema;
    if (schema?.$ref) schema = getApi().schemas[refName(schema.$ref)];
    return schema?.properties?.[key]?.format === 'binary';
  };
  const json = (value, indent) => JSON.stringify(value, null, 2).replace(/\n/g, `\n${indent}`);

  const curl = [`curl ${upper === 'GET' ? '' : `-X ${upper} `}"${url}"`];
  if (signed) curl.push('  -H "Authorization: Bearer $TOKEN"');
  if (media === 'application/json') {
    curl.push('  -H "Content-Type: application/json"', `  -d '${json(body, '  ')}'`);
  } else if (media === 'application/x-www-form-urlencoded') {
    for (const [key, value] of fields) curl.push(`  --data-urlencode "${key}=${typeof value === 'object' ? JSON.stringify(value) : value}"`);
  } else if (media === 'multipart/form-data') {
    for (const [key, value] of fields) curl.push(isFile(key) ? `  -F "${key}=@photo.jpg"` : `  -F "${key}=${typeof value === 'object' ? JSON.stringify(value) : value}"`);
  }

  const headers = [];
  if (signed) headers.push('Authorization: `Bearer ${token}`');
  if (media === 'application/json') headers.push("'Content-Type': 'application/json'");
  const js = [`const response = await fetch('${url}', {`, `  method: '${upper}',`];
  if (headers.length) js.push(`  headers: { ${headers.join(', ')} },`);
  if (media === 'application/json') js.push(`  body: JSON.stringify(${json(body, '  ')}),`);
  else if (media) js.push('  body: form,');
  js.push('});', 'const answer = await response.json();');
  if (media && media !== 'application/json') {
    const make = media === 'multipart/form-data' ? 'new FormData()' : 'new URLSearchParams()';
    const lines = fields.map(([key, value]) => (isFile(key) ? `form.append('${key}', file);` : `form.append('${key}', ${JSON.stringify(typeof value === 'object' ? JSON.stringify(value) : String(value))});`));
    js.unshift(`const form = ${make};`, ...lines);
  }

  const py = ['import requests', '', `response = requests.${method}(`, `    "${url}",`];
  if (signed) py.push('    headers={"Authorization": f"Bearer {token}"},');
  if (media === 'application/json') py.push(`    json=${json(body, '    ').replace(/\bnull\b/g, 'None').replace(/\btrue\b/g, 'True').replace(/\bfalse\b/g, 'False')},`);
  else if (media) {
    const plain = fields.filter(([key]) => !isFile(key)).map(([key, value]) => `"${key}": ${JSON.stringify(typeof value === 'object' ? JSON.stringify(value) : String(value))}`);
    py.push(`    data={${plain.join(', ')}},`);
    const files = fields.filter(([key]) => isFile(key)).map(([key]) => `"${key}": open("photo.jpg", "rb")`);
    if (files.length) py.push(`    files={${files.join(', ')}},`);
  }
  py.push(')', 'answer = response.json()');

  const ok = Object.keys(op.responses || {}).sort().find((code) => code.startsWith('2'));
  const answerSchema = ok && op.responses[ok].content?.['application/json']?.schema;
  const answer = answerSchema ? JSON.stringify(example(answerSchema), null, 2) : null;

  return {
    request: [
      '**curl**', '', '```bash', curl.join(' \\\n'), '```', '',
      '**JavaScript**', '', '```js', js.join('\n'), '```', '',
      '**Python**', '', '```python', py.join('\n'), '```',
    ].join('\n'),
    answer: answer && ['```json', answer, '```'].join('\n'),
    status: ok || null,
  };
}

async function code(text) {
  if (!text) return '';
  return String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeHighlight, { detect: false })
      .use(codeTabs)
      .use(rehypeStringify)
      .process(text),
  );
}

// One route, worked out for its page.
async function describe(route, server) {
  const { op } = route;
  const description = (op.description || '').replace(/\s*Who may call it:[\s\S]*$/, '').trim();
  const scopes = (op.security || []).flatMap((s) => Object.values(s).flat());
  const who = [VIEWERS[op['x-viewer']] || op['x-viewer'] || 'Anyone'];
  if (scopes.length) who.push(`with ${scopes.map((s) => `<code>${escape(s)}</code>`).join(' or ')}`);
  if (op['x-step-up']) who.push('who has just proved who they are again');

  // A form taken either way is one list.
  const bodies = [];
  for (const [media, { schema }] of Object.entries(op.requestBody?.content || {}).sort()) {
    const key = JSON.stringify(schema);
    const same = bodies.find((b) => b.key === key);
    if (same) same.media.push(media);
    else {
      let resolved = schema;
      if (schema?.$ref) resolved = getApi().schemas[refName(schema.$ref)];
      bodies.push({ key, media: [media], fields: fieldsOf(resolved), type: resolved?.properties ? null : typeOf(schema) });
    }
  }

  const { request, answer, status } = examples(route, server);
  return {
    id: route.id,
    method: route.method,
    path: route.path,
    summary: route.summary,
    description: markdown(description),
    who: who.join(', '),
    internal: Boolean(op['x-internal']),
    parameters: (op.parameters || []).map((p) => ({
      name: p.name,
      in: p.in,
      required: Boolean(p.required),
      type: typeOf(p.schema),
      description: markdown(`${p.description || ''}${constraints(p.schema)}`.trim(), { inline: true }),
    })),
    bodies: bodies.map(({ media, fields, type }) => ({ media, fields, type })),
    responses: Object.keys(op.responses || {})
      .sort()
      .map((code_) => ({
        code: code_,
        description: markdown(op.responses[code_].description, { inline: true }),
        bodies: Object.entries(op.responses[code_].content || {}).map(([media, { schema }]) => ({ media, type: typeOf(schema) })),
      })),
    request: await code(request),
    answer: await code(answer),
    status,
  };
}

// A service's page: what it says of itself, and each of its routes.
export async function getServicePage(slug) {
  const service = getService(slug);
  if (!service) return null;
  const { server } = getApi();
  return {
    ...service,
    about: markdown(service.about),
    routes: await Promise.all(service.routes.map((route) => describe(route, server))),
  };
}
