# The new www.anahita.io

anahita-web roadmap row 91. A static website in place of the old PHP
application, whose email was turned off on 2026-10-15.

## Checklist

`⬜ todo` · `🚧 in progress` · `✅ done` · `⏳ waiting on the user`

`#` is the row, which is how work is referred to. Rows `U1`, `U2`… are what
waits on the user; the **Needs** column names them where they hold work up.

| # | State | Item | Needs |
| --- | --- | --- | --- |
| **M1. The frame and the first pages** | ✅ | | |
| 1 | ✅ | The frame: theme, header, footer, a not-found page, the Pages workflow | — |
| 2 | ✅ | Search (Pagefind), in the visitor's browser | — |
| 3 | ✅ | A light/dark toggle that starts from the system and stores nothing | — |
| 4 | ✅ | The home page, a first draft | — |
| 5 | ✅ | Docs: the landing page, and the repositories' docs rendered on the site | — |
| 6 | ✅ | `llms.txt` | — |
| 7 | ✅ | The blog, its Atom feed, and a first post (a draft) | — |
| 8 | ✅ | Donate, with the platforms "Coming soon"; hidden until an account is open (`site.donations`) | U7 |
| 9 | ✅ | Staging: kept out of search engines (`site.hidden`), `CNAME` to staging.anahita.io | — |
| 10 | ✅ | A nightly build, so the docs stay current | — |
| 11 | ✅ | The products by name, grouped as Server and Apps | — |
| **M2. Explaining Anahita** | ✅ | | |
| 12 | ✅ | Products: Anahita Services (Server); Anahita Web, Mobile and CLI (Apps) | — |
| 13 | ✅ | The services catalogue, `/products/services/` | — |
| 14 | ✅ | FAQ: eleven numbered questions | — |
| 15 | ✅ | Diagrams, drawn as SVG in the theme's colours: Server and Apps, federation, the graph | — |
| **M3. The story** | ⬜ | | |
| 16 | ✅ | About (was History): who makes Anahita, then the story and a timeline of Polaroids with captions | — |
| 17 | — | ~~About~~: left out by the user on 2026-10-25; the home page says what Anahita is, History where it came from, the FAQ who makes it | — |
| 18 | — | ~~Brand~~: left out by the user on 2026-10-25; the README says how the name and mark may be used | — |
| 19 | ✅ | A sharp logo and favicon from the vector file | U1 |
| **M4. Before launch** | ⬜ | | |
| 20 | ✅ | Blog drafts (`draft: true`) and a template for new posts | — |
| 21 | ✅ | `LICENSE-CONTENT` (CC BY 4.0), and the README's licences | — |
| 22 | ✅ | `sitemap.xml` | — |
| 23 | ✅ | Code in the docs coloured by language | — |
| 24 | ⬜ | Anahita Services' docs and the API reference on the site | U12 |
| 25 | ⬜ | Launch: `site.hidden` off, `CNAME` to www.anahita.io, roadmap row 91 done in anahita-web | U5, U6, U10 |

### Waiting on the user

| # | State | What | Where it goes | Unblocks |
| --- | --- | --- | --- | --- |
| U1 | ✅ | The logo as .pdf (or .ai) | `_source/logo.pdf` | 19 |
| U2 | ✅ | The 12 milestones for History: a date, a title and a line each | a note, or `src/data/history.js` | 16 |
| U3 | ✅ | The 6 photos before 2013 (and any after): each with its date, a caption and who is in it | `_source/history/` | 16 |
| U4 | ✅ | History's story (About was left out) | `content/history.md` | 16 |
| U5 | ⏳ | The home page's headline and copy, in your words | `src/data/home.js`, `src/app/page.jsx` | 25 |
| U6 | ⏳ | The first blog post, in your voice | `content/blog/` | 25 |
| U7 | ⏳ | Donations: the accounts, then what the money goes to, in your words; see "Donations" below. Not before launch | `src/data/donate.js`, `site.donations` | 8 |
| U8 | ⏳ | Photos for decoration: stock, or Anahita's own (no AI-generated images) | `_source/photos/` | — |
| U9 | ⏳ | A colour scheme, when you have ideas | `src/theme.js` | — |
| U10 | ⏳ | GitHub: Pages' source "GitHub Actions", custom domain staging.anahita.io, and a DNS CNAME from `staging` to `anahitasocial.github.io` | repository settings, DNS | 25 |
| U11 | ⏳ | Whether staging needs a real lock (Cloudflare Access) or only to stay out of search engines | — | — |
| U12 | ⏳ | anahita-services made public | `src/data/docSources.mjs` | 24 |

## Donations (looked into on 2026-10-25)

Hidden until an account is open: `site.donations` in `src/data/site.js`
takes Donate out of the header and makes `/donate/` answer "not found". The
user is putting it off until after launch.

| Platform | Set-up | In Canada | Fees and terms |
| --- | --- | --- | --- |
| Liberapay | Minutes: an account, then Stripe or PayPal connected | Yes, through Stripe or PayPal | No fee of its own, only the processor's. One user reported Stripe closing their account over its crowdfunding terms: keep PayPal as a fallback |
| GitHub Sponsors | About a day's work, then GitHub's review, for which no time is published | Yes, a supported region | The `anahitasocial` organisation can be sponsored. Needs two-factor sign-in, a Canadian bank account (a personal one is allowed) and tax details. The payout choice (bank or fiscal host) is fixed at sign-up |
| Open Collective | An application to a fiscal host, the slowest | Through a host | Open Source Collective takes 10% and has verification criteria it does not publish; probably better once anahita-services is public. Hypha, a Canadian worker co-operative, also hosts open-source projects |

Suggested order: Liberapay and GitHub Sponsors first, Open Collective after
anahita-services is public. Donations to a person or to rmd studio, neither a
registered charity, are likely taxable income: a question for an accountant.

Sources:

1. [About GitHub Sponsors](https://docs.github.com/en/sponsors/getting-started-with-github-sponsors/about-github-sponsors)
2. [Setting up GitHub Sponsors for your organization](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/setting-up-github-sponsors-for-your-organization)
3. [GitHub Sponsors and Stripe Connect Express](https://stripe.com/en-ch/newsroom/stories/githubsponsors)
4. [DEV Community: GitHub Sponsors' supported countries](https://dev.to/ashucommits/exploring-github-sponsors-global-impact-and-future-innovations-in-open-source-funding-46h5)
5. [Open Source Collective: apply](https://opencollective.com/opensource/apply/intro)
6. [Open Collective Europe: fiscal hosting FAQs](https://docs.opencollective.com/oceurope/faq/fiscal-hosting-faqs)
7. [Open Collective: becoming a fiscal host](https://docs.opencollective.com/help/hosts/become-host)
8. [Hypha: fiscal sponsorship](https://handbook.hypha.coop/Hypha-Worker-Co-operative/fiscal-sponsorship.html)
9. [Liberapay on Wikipedia](https://en.wikipedia.org/wiki/Liberapay)
10. [Techlore: Is Stripe killing Liberapay?](https://blog.techlore.tech/stripe-liberapay)

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
4. **The logo:** `public/images/logo.svg`, drawn from the identity's own
   vector file (`Desktop/Anahita/identity/…/Anahita_base.pdf`), without its
   star and facing right; PNG copies at 32, 180 and 512 pixels for icons.
5. **Photos:** placeholders until the user sends them. No AI-generated
   images; technical subjects are drawn as SVG diagrams.
6. **Donations** through Open Collective, GitHub Sponsors and Liberapay.
7. **The docs are rendered on the site,** read from the repositories at
   build time, not linked to on GitHub. anahita-services' docs join when it
   is public. The site is rebuilt every night to keep them current.
8. **The blog** is written as Markdown files and published by pushing to
   `main`.
9. **The products are named** Anahita Services, Anahita Web, Anahita Mobile
   and Anahita CLI, as titles everywhere on the site (Products, Docs, the
   sidebar). The lowercase repository names (`anahita-web`) only where the
   code itself is meant. What an operator runs is an **instance**.
10. **Server and Apps.** Anahita Services is the server: what an operator
    runs. Anahita Web, Mobile and CLI are the apps: what people use, all
    through the same API. Products, Docs and the FAQ group them so, under
    these two words (not "cloud" and "client").

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
| Docs | `/docs/` | The four ways in (Running an instance), Anahita Web's docs, the API reference, the MCP server (anahita-mcp), `llms.txt` |
| A repository's docs | `/docs/web/`, `/docs/web/<page>/` | Its README, then each page, with a sidebar and "On this page" |
| API reference | `/api/`, `/api/<service>/`, `/api/shapes/` | Made from anahita-services' OpenAPI documents (`src/lib/api.js`): each service's routes in two columns, what each takes and answers beside its request in curl, JavaScript and Python and an example answer; the services under the docs' groups in a sidebar; `anahita.json` at `/api/anahita.json` |
| FAQ | `/faq/` | Numbered questions: the fediverse, a server, the AT Protocol, how Anahita differs, federation is opt-in, the graph, the chronological feed, tracking, what it takes to run, who makes it, the licences |
| Blog | `/blog/` | Posts in Markdown (`content/blog/`), with an Atom feed at `/feed.xml`, named in every page's `<head>` |
| Donate | `/donate/` | Why, where the money goes, the three platforms |
| About | `/about/` | Who makes Anahita, then History: the user's story and twelve Polaroids, 2010 to 2015 |

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
