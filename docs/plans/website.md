# The new www.anahita.io

anahita-web roadmap row 91. A static website in place of the old PHP
application, whose email was turned off on 2026-10-15.

## Status

| Part | State |
| --- | --- |
| 1. The frame: theme, header with search and a light/dark toggle, footer, Pages workflow | done |
| 2. The home page | done, a first draft for the user to edit |
| 3. Products and the services catalogue | to do |
| 4. Docs and `llms.txt` | done; the API reference waits for anahita-services to be public |
| 5. FAQ | to do |
| 6. Blog and its first post | done, the post a draft for the user to edit |
| 7. Donate | done; the platforms show "Coming soon" until the accounts exist |
| 8. About, History, Brand, `LICENSE-CONTENT`, README | to do |

## What was settled (the user, 2026-10-24)

1. **Next.js with Material UI, exported as static files.** Jekyll was
   dropped because the local Ruby was too old to build its gems and the user
   preferred no Ruby. Astro was weighed and dropped, because MUI works there
   only as separate islands. With Next.js the site uses real MUI, and can
   later share one theme with anahita-web.
2. **Hosted on GitHub Pages** at www.anahita.io, built by
   `.github/workflows/pages.yml`.
3. **MUI's default colours** until the user chooses Anahita's own.
4. **The logo:** anahita-web's circle PNGs until the user sends the vector
   files (.ai and .pdf). The PDF is then converted to SVG.
5. **Photos:** placeholders until the user sends them.
6. **Donations** through Open Collective, GitHub Sponsors and Liberapay.

## Who writes what

1. Claude: the frame, and the technical pages (Products, Docs, FAQ).
2. The user: About, History and the other marketing pages. Claude's drafts
   of the home page and Donate are for the user to make more human.

## Positioning

1. **Category.** Open-source social software that an organisation runs for
   its own community, connected to the fediverse and to Bluesky. Not
   "another Mastodon".
2. **The wedge.** Breadth in one install: people, groups, events, articles,
   photos, videos, custom feeds and websites.
3. **Readers, in order:** operators (the technical person at a school,
   newsroom, library, research group or non-profit), builders (the open
   API), supporters, and members.
4. **Three promises:** Yours, Open, Calm.
5. **The site practises them:** no analytics, no cookies, no third-party
   requests. Roboto is downloaded at build time by `next/font`. Next.js'
   own telemetry is off in `package.json`'s scripts.

## Site map

| Page | Path | What it holds |
| --- | --- | --- |
| Home | `/` | Headline, the three promises, what's inside, who it is for, federation, a call to action |
| Products | `/products/` | anahita-services, anahita-web, anahita-mobile (coming soon), anahita-cli (coming soon) |
| Services | `/products/services/` | Every service: its name, what it does, whether it is optional, its doc |
| Docs | `/docs/` | The four ways in, the API reference, the MCP server (coming soon), `llms.txt` |
| API reference | `/api/` | A copy of anahita-services' `docs/api/index.html` |
| FAQ | `/faq/` | Numbered questions: the fediverse, a server, the AT Protocol, how Anahita differs, federation is opt-in, the graph, the chronological feed, tracking, what it takes to run, who makes it, the licences |
| Blog | `/blog/` | Posts in Markdown (`content/blog/`), with an Atom feed at `/blog/feed.xml` |
| Donate | `/donate/` | Why, where the money goes, the three platforms |
| About | `/about/` | Written by the user |
| History | `/history/` | The user's paragraphs, then 12 milestones: 6 before 2013 with photos, 6 since |
| Brand | `/brand/` | The logo files, and how the name and mark may be used |

The docs are linked, not copied: one set of docs, in the repositories.
anahita-services is still private, so its links wait for the public release.

## How it is built

| Path | What it is |
| --- | --- |
| `src/app/` | One folder per page (App Router); `layout.jsx` holds the theme, header and footer |
| `src/components/` | Header, Footer, Logo, Section, Link |
| `src/data/` | The words of lists and cards: `site.js` (links, and `services`, set when anahita-services is public), `home.js`, `docs.js`, `donate.js` |
| `src/lib/blog.js` | Reads the posts in `content/blog/` |
| `content/blog/` | One Markdown file per post, `YYYY-MM-DD-slug.md` |
| `src/theme.js` | The MUI theme: default palette, light and dark from the OS |
| `public/` | Images, `CNAME` |
| `out/` | What `yarn build` makes; not committed |

**Light and dark.** The page follows the system's setting on every visit;
the toggle in the header switches it for that visit only. Nothing is stored
(`storageManager={null}` in `layout.jsx`).

**Search.** `yarn build` runs Pagefind after Next.js: it indexes what is
inside `<main>` on every page except the not-found ones (folders beginning
with `_` or `4`), into `out/pagefind/`. The visitor's browser searches that
index; nothing is sent anywhere. Under `yarn dev` there is no index, and the
search dialog says so. Mark what should not be found (buttons) with
`data-pagefind-ignore`.

## Later

1. Translations of the site.
2. A fediverse profile for the blog, once banu.io is live.
3. Anahita's own colours, shared with anahita-web.
