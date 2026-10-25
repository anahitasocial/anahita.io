# The new www.anahita.io

anahita-web roadmap row 91. A static website in place of the old PHP
application, whose email was turned off on 2026-10-15.

## Checklist

Ticked as the work lands.

### The site

1. [x] The frame: theme, header, footer, a not-found page, the Pages workflow
2. [x] Search (Pagefind), running in the visitor's browser
3. [x] A light/dark toggle that starts from the system and stores nothing
4. [x] The home page, a first draft
5. [x] Docs: the landing page, and the repositories' docs rendered on the site
6. [x] `llms.txt`
7. [x] The blog, its Atom feed, and a first post (a draft)
8. [x] Donate, with the platforms "Coming soon"
9. [x] Staging: hidden from search engines (`site.hidden`), `CNAME` set to staging.anahita.io
10. [x] A nightly build, so the docs stay current
11. [ ] Products: anahita-services, anahita-web, anahita-mobile, anahita-cli
12. [ ] The services catalogue, `/products/services/`
13. [ ] FAQ
14. [ ] Diagrams, drawn as SVG: the architecture, the services, how federation works
15. [ ] Brand: the logo files and how the name and mark may be used
16. [ ] History: the page and its timeline, with placeholders for the photos
17. [ ] About: the page, for the user's words
18. [ ] Blog drafts (`draft: true`) and a template for new posts
19. [ ] `LICENSE-CONTENT` (CC BY 4.0), and the README's licences
20. [ ] `sitemap.xml`
21. [ ] Code in the docs coloured by language
22. [ ] Launch: `site.hidden` off, `CNAME` to www.anahita.io, roadmap row 91 done in anahita-web

### Waiting on the user

1. [ ] The logo as .pdf (or .ai), at `_source/logo.pdf`: for a sharp logo and favicon
2. [ ] The 12 milestones for History, each with a date, a title and a line;
       and the 6 photos before 2013 (plus any after), each with its date, a
       caption and who is in it, in `_source/history/`
3. [ ] History's opening paragraphs
4. [ ] About
5. [ ] The home page's headline and copy, in your words
6. [ ] The first blog post, rewritten in your voice
7. [ ] Donate: what the money goes to, in your words; then the accounts on
       Open Collective, GitHub Sponsors and Liberapay, and their links
8. [ ] Photos for decoration, stock or Anahita's own (no AI-generated images)
9. [ ] A colour scheme, when you have ideas
10. [ ] GitHub settings: Pages' source set to "GitHub Actions", the custom
        domain staging.anahita.io, and its DNS record (a CNAME to
        `anahitasocial.github.io`)
11. [ ] Whether staging needs a real lock (Cloudflare Access) or only to be
        kept out of search engines
12. [ ] anahita-services made public: then its repository goes in
        `src/data/docSources.mjs`, and its docs and the API reference appear

## What was settled (the user, 2026-10-24)

1. **Next.js with Material UI, exported as static files.** Jekyll was
   dropped because the local Ruby was too old to build its gems and the user
   preferred no Ruby. Astro was weighed and dropped, because MUI works there
   only as separate islands. With Next.js the site uses real MUI, and can
   later share one theme with anahita-web.
2. **Hosted on GitHub Pages** at www.anahita.io, built by
   `.github/workflows/pages.yml`. Until launch, at staging.anahita.io, kept
   out of search engines.
3. **MUI's default colours** until the user chooses Anahita's own.
4. **The logo:** anahita-web's circle PNGs until the user sends the vector
   files (.ai and .pdf). The PDF is then converted to SVG.
5. **Photos:** placeholders until the user sends them. No AI-generated
   images; technical subjects are drawn as SVG diagrams.
6. **Donations** through Open Collective, GitHub Sponsors and Liberapay.
7. **The docs are rendered on the site,** read from the repositories at
   build time, not linked to on GitHub. anahita-services' docs join when it
   is public. The site is rebuilt every night to keep them current.
8. **The blog** is written as Markdown files and published by pushing to
   `main`.

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
| Docs | `/docs/` | The four ways in, the web app's docs, the API reference, the MCP server (coming soon), `llms.txt` |
| A repository's docs | `/docs/web/`, `/docs/web/<page>/` | Its README, then each page, with a sidebar and "On this page" |
| API reference | `/api/` | A copy of anahita-services' `docs/api/index.html` |
| FAQ | `/faq/` | Numbered questions: the fediverse, a server, the AT Protocol, how Anahita differs, federation is opt-in, the graph, the chronological feed, tracking, what it takes to run, who makes it, the licences |
| Blog | `/blog/` | Posts in Markdown (`content/blog/`), with an Atom feed at `/blog/feed.xml` |
| Donate | `/donate/` | Why, where the money goes, the three platforms |
| About | `/about/` | Written by the user |
| History | `/history/` | The user's paragraphs, then 12 milestones: 6 before 2013 with photos, 6 since |
| Brand | `/brand/` | The logo files, and how the name and mark may be used |

The docs stay in their repositories, one set for people and agents alike.
`scripts/fetch-docs.mjs` copies each repository's `docs/` (without
`docs/plans/`) into `.docs-src/` before every build; `src/lib/docs.js`
renders them. Links between docs become links within the site, links to
code go to GitHub, and links to a repository not yet on the site are shown
as plain text. While writing docs, `DOCS_WEB_PATH=../anahita-web yarn dev`
reads a local checkout instead.

## How it is built

| Path | What it is |
| --- | --- |
| `src/app/` | One folder per page (App Router); `layout.jsx` holds the theme, header and footer |
| `src/components/` | Header, Footer, Logo, Search, ModeToggle, Section, PageHeader, LinkCard, Prose, DocsNav, DocPage |
| `src/data/` | The words of lists and cards: `site.js` (links, and `hidden` for staging), `home.js`, `docs.js`, `donate.js`; `docSources.mjs`, the repositories whose docs are shown |
| `src/lib/docs.js` | Reads and renders the fetched docs |
| `scripts/fetch-docs.mjs` | Fetches the docs (`yarn docs` to fetch again) |
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
