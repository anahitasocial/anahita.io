// The releases, a day at a time: every Birth release of anahita-services and
// anahita-web, read from their changelogs (scripts/fetch-docs.mjs copies them
// to .docs-src/changelogs/), and grouped by the day they were made. Each day
// is a page at /releases/<date>/ and an entry in /feed.xml, which the Anahita
// channel on banu.io reads: one post a day at most
// (docs/plans/done/releases.md).
//
// A day is read only once it is over, in Vancouver, where the changelogs'
// dates are written: a channel never edits a post nor posts an item twice,
// so a day posted at noon would never tell of a release made that evening.
// The nightly build adds the day before. Embryo, above a changelog's first
// Birth heading, is never read.
import fs from 'node:fs';
import path from 'node:path';
import { changelogToHtml } from './docs';

const folder = path.join(process.cwd(), '.docs-src', 'changelogs');

// The days before this one are not in the feed: when it was built, they
// would all have reached the channel at once. They are on /releases/.
export const RELEASES_SINCE = '2026-11-18';

const ZONE = 'America/Vancouver';

// The repositories, in the order a day names them, each with its card for
// a day when it alone was released.
export const repositories = [
  { key: 'services', name: 'Anahita Services', card: '/images/blog/releases-services.png' },
  { key: 'web', name: 'Anahita Web', card: '/images/blog/releases-web.png' },
];
const BOTH = '/images/blog/releases-both.png';

// The same hashtags as the blog's posts, which the channel adds to its post.
export const releaseTags = ['Fediverse', 'Atmosphere', 'ActivityPub', 'Atproto', 'SocialWeb'];

// A release heading: `## v1.4.0 Birth, 2026-11-18`. Its form is read here,
// and both repositories' release docs say so.
const HEADING = /^## (v\d+\.\d+\.\d+) Birth, (\d{4}-\d{2}-\d{2})\s*$/;

// One changelog's releases, newest first, each with its version, its day,
// what comes before its first `###` (the web's "Works with …") and its
// sections by name (Added, Changed, Removed, Fixed, Upgrading).
export function parseChangelog(markdown) {
  const releases = [];
  let current = null;
  let section = null;
  for (const line of markdown.split('\n')) {
    const heading = line.match(HEADING);
    if (heading) {
      current = { version: heading[1], date: heading[2], lead: [], sections: [] };
      section = null;
      releases.push(current);
      continue;
    }
    // Any other `##` (Embryo, or a heading of another form) ends a release.
    if (line.startsWith('## ')) {
      current = null;
      continue;
    }
    if (!current) continue;
    const sub = line.match(/^### (.+?)\s*$/);
    if (sub) {
      section = { name: sub[1], lines: [] };
      current.sections.push(section);
      continue;
    }
    (section ? section.lines : current.lead).push(line);
  }
  return releases.map(({ lead, sections, ...release }) => ({
    ...release,
    lead: lead.join('\n').trim(),
    sections: sections.map(({ name, lines }) => ({ name, markdown: lines.join('\n').trim() })),
  }));
}

function readChangelog(key) {
  const file = path.join(folder, `${key}.md`);
  return fs.existsSync(file) ? parseChangelog(fs.readFileSync(file, 'utf8')) : [];
}

// Today's date in Vancouver, or RELEASES_TODAY (2026-11-19) to try a build
// as it would be made on another day.
export function today() {
  if (process.env.RELEASES_TODAY) return process.env.RELEASES_TODAY;
  return new Intl.DateTimeFormat('en-CA', { timeZone: ZONE }).format(new Date());
}

// The end of a day in Vancouver (23:59), as a moment in UTC: when its
// releases are dated in the feed.
export function endOfDay(date) {
  for (const offset of ['-07:00', '-08:00']) {
    const moment = new Date(`${date}T23:59:00${offset}`);
    const local = new Intl.DateTimeFormat('en-CA', {
      timeZone: ZONE, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).format(moment);
    if (local.replace(',', '') === `${date} 23:59`) return moment.toISOString();
  }
  return new Date(`${date}T23:59:00-08:00`).toISOString();
}

// "Anahita Services v1.2.3 to v1.2.7": a repository's releases of one day.
function versions(name, releases) {
  const oldest = releases.at(-1).version;
  const newest = releases[0].version;
  return oldest === newest ? `${name} ${newest}` : `${name} ${oldest} to ${newest}`;
}

// Every finished release day, newest first; each with its title, summary,
// card, the moment it ends, and each repository's releases that day,
// newest first.
export function getReleaseDays({ all = false } = {}) {
  const byDate = new Map();
  for (const repository of repositories) {
    for (const release of readChangelog(repository.key)) {
      if (!byDate.has(release.date)) byDate.set(release.date, []);
      const day = byDate.get(release.date);
      let entry = day.find((e) => e.repository.key === repository.key);
      if (!entry) {
        entry = { repository, releases: [] };
        day.push(entry);
      }
      entry.releases.push(release);
    }
  }
  const finishedBefore = today();
  return [...byDate.entries()]
    .filter(([date]) => date < finishedBefore && (all || date >= RELEASES_SINCE))
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([date, entries]) => {
      entries.sort((a, b) => repositories.indexOf(a.repository) - repositories.indexOf(b.repository));
      const named = entries.map(({ repository, releases }) => versions(repository.name, releases));
      const title = named.join(' and ');
      const upgrading = entries.some(({ releases }) => releases.some((r) => r.sections.some((s) => s.name === 'Upgrading')));
      const works = entries
        .flatMap(({ releases }) => releases.slice(0, 1).map((r) => r.lead.match(/^Works with .+$/m)?.[0].trim()))
        .filter(Boolean);
      const summary = [
        upgrading && 'Read the upgrading notes before upgrading.',
        `${title} ${entries.length > 1 || entries[0].releases.length > 1 ? 'are' : 'is'} out.`,
        ...works.map((line) => `Anahita Web ${line.charAt(0).toLowerCase()}${line.slice(1)}`),
      ].filter(Boolean).join(' ');
      return {
        date,
        title,
        summary,
        upgrading,
        published: endOfDay(date),
        card: entries.length > 1 ? BOTH : entries[0].repository.card,
        entries,
      };
    });
}

export function getReleaseDay(date) {
  return getReleaseDays({ all: true }).find((day) => day.date === date);
}

// A release as Markdown: its version, what it works with, how to upgrade
// to it first, when it says, then what it adds, changes, removes and fixes.
function releaseMarkdown(name, release) {
  const sections = [
    ...release.sections.filter((s) => s.name === 'Upgrading'),
    ...release.sections.filter((s) => s.name !== 'Upgrading'),
  ];
  return [
    `## ${name} ${release.version}`,
    release.lead,
    ...sections.map(({ name: heading, markdown }) => `### ${heading}\n\n${markdown}`),
  ].filter(Boolean).join('\n\n');
}

// A day's notes as HTML, for its page and its entry in the feed.
export async function getReleaseHtml(day) {
  const parts = await Promise.all(
    day.entries.flatMap(({ repository, releases }) =>
      releases.map((release) => changelogToHtml(repository.key, releaseMarkdown(repository.name, release))),
    ),
  );
  return parts.join('\n');
}
