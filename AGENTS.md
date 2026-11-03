# Working on anahita.io

The website of Anahita, at <https://www.anahita.io>: Next.js with Material
UI, exported as static files and published to GitHub Pages. This file is for
anybody changing it, a person or an agent.

- Website: <https://www.anahita.io>
- Founder & Core Architect: Rastin Mehr
- Maintained and developed by rmd studio, <https://www.rmdstudio.com>

## Where to begin

| To learn | Read |
| --- | --- |
| How to run it | [`README.md`](README.md) |
| What is planned, and why | [`docs/plans/website.md`](docs/plans/website.md) |
| What Anahita is and does | anahita-services' `docs/` and anahita-web's `docs/` |

## Rules

1. The interface, the wording and the commit rules are anahita-web's
   (`AGENTS.md` there): calm and restrained, short labels, one main action,
   lists of more than three numbered, 8-pixel spacing; a group has
   followers; "profile", "location".
2. The products are Anahita Services, Anahita Web, Anahita Mobile and
   Anahita CLI; `anahita-web` and the like only for the repositories. What
   an operator runs is an instance. Anahita Services is the **Server**;
   Web, Mobile and CLI are the **Apps**.
   Those who use Anahita are **people**: "each person", "people", "you";
   never "users".
   The company is **rmd studio**, in lower case, everywhere in the copy.
3. **Object storage** for where files are kept, and "S3-compatible object
   storage" where it is explained once; never "S3" alone, which is AWS's.
4. Material UI questions are answered from the MUI MCP server (`.mcp.json`),
   not from memory.
5. Nothing is said about Anahita that the code does not do. Check a claim
   against anahita-services or anahita-web before it goes on a page.
6. The site makes no request to anybody else's server: no analytics, no
   cookies, no fonts or scripts from a CDN.
7. Check every change in headless Chrome at 1280×900 and 390×844, in light
   and dark, and look at the screenshots.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
