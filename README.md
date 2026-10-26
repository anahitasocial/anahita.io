# anahita.io

The website of Anahita, at <https://www.anahita.io>: what Anahita is, who it
is for, and how to run it. A static site built with Next.js and Material UI,
in place of the old PHP application.

- Website: <https://www.anahita.io>
- Founder & Core Architect: Rastin Mehr
- Maintained and developed by rmd studio, <https://www.rmdstudio.com>
- Commercial inquiries: <https://www.rmdstudio.com/contact>

## Status

Being built. The plan and its progress are in
[`docs/plans/website.md`](docs/plans/website.md).

## Anahita

Anahita is an open-source social network designed for schools, newsrooms, libraries, research groups, and non-profits.  It offers a platform free from the control of tech oligarchs.  Anahita natively supports ActivityPub and the AT Protocol, providing a chronological default feed without any tracking.  Users can create groups, events, articles, and customize their feeds.

| Repository | What it is |
| --- | --- |
| [anahita-services](https://github.com/purplerat/anahita-services) | The Go services and the API |
| [anahita-web](https://github.com/anahitasocial/anahita-web) | The web app: React with Material UI |
| anahita.io | This website |

## Running it

Running it locally needs Node.js 22 and Yarn:

```sh
yarn install
yarn dev
```

The site is then at <http://localhost:4000>. Anahita Services' docs are left
out until its repository is public; to see them, read a local checkout with
`DOCS_SERVICES_PATH`. `yarn dev:services` does it for a checkout at
`../go/src/github.com/purplerat/anahita-services`:

```sh
DOCS_SERVICES_PATH=../go/src/github.com/purplerat/anahita-services yarn dev
```

`yarn build` makes the static site in `out/`, which is not committed; GitHub
Actions builds and publishes it to GitHub Pages on every push to `main`.

## Licences

1. **Code:** the templates, styles and scripts are under the MIT License
   ([`LICENSE`](LICENSE)).
2. **Words and pictures:** the pages, their writing, screenshots and
   illustrations are under Creative Commons Attribution 4.0
   (`LICENSE-CONTENT`, to be added).
3. **The name and the logo** are licensed under neither. "Anahita", its logo
   and rmd studio's marks may not be used to present a copy of this site,
   or anything else, as Anahita's own.
