# anahita.io

The website of Anahita, at <https://www.anahita.io>: what Anahita is, who it
is for, and how to run it. A static site built with Jekyll, in place of the
old PHP application.

- Website: <https://www.anahita.io>
- Founder & Core Architect: Rastin Mehr
- Maintained and developed by rmd Studio, <https://www.rmdstudio.com>
- Commercial inquiries: <https://www.rmdstudio.com/contact>

## Status

Just begun. The plans are in [`docs/plans/`](docs/plans/), and nothing is
built yet.

## Anahita

Anahita is an open-source social network designed for schools, newsrooms, libraries, research groups, and non-profits.  It offers a platform free from the control of tech oligarchs.  Anahita natively supports ActivityPub and the AT Protocol, providing a chronological default feed without any tracking.  Users can create groups, events, articles, and customize their feeds.

| Repository | What it is |
| --- | --- |
| [anahita-services](https://github.com/purplerat/anahita-services) | The Go services and the API |
| [anahita-web](https://github.com/anahitasocial/anahita-web) | The web app: React with Material UI |
| anahita.io | This website |

## Running it

Running it locally needs Ruby and Bundler:

```sh
bundle install
bundle exec jekyll serve
```

The site is then at <http://localhost:4000>. Jekyll builds it into `_site/`,
which is not committed.

## Licences

1. **Code:** the templates, styles and scripts are under the MIT License
   ([`LICENSE`](LICENSE)).
2. **Words and pictures:** the pages, their writing, screenshots and
   illustrations are under Creative Commons Attribution 4.0
   (`LICENSE-CONTENT`, to be added).
3. **The name and the logo** are licensed under neither. "Anahita", its logo
   and rmd Studio's marks may not be used to present a copy of this site,
   or anything else, as Anahita's own.
