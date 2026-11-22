# Releases on anahita.io, and in the Anahita channel (roadmap row 161)

Asked for by the user on 2026-11-18: when anahita-services or anahita-web is
released, the Anahita channel on banu.io says so, without anything tied to
GitHub. Settled with the user the same day: no webhooks and no bot; the
releases go into anahita.io's own feed, which the channel reads already, one
post a day at most, with the blog's posts. Planned and built the same day,
at the user's word ("let's have the releases page and them showing in the
feeds working tonight"); the first day in the feed is 2026-11-18.

## Contents

1. [Why this way](#why-this-way)
2. [What is settled](#what-is-settled)
3. [Release days](#release-days)
4. [The pages](#the-pages)
5. [The feed](#the-feed)
6. [The channel](#the-channel)
7. [Out of scope](#out-of-scope)
8. [Phases](#phases)
9. [Documentation](#documentation)

## Why this way

Mastodon has no incoming webhooks: a release reaches it from a CI job that
calls its API, or from a bridge that reads a feed. Anahita's channels read
feeds already ([channels.md](https://github.com/anahitasocial/anahita-services/blob/main/docs/channels.md)),
on a domain their admins prove is theirs, so a feed on anahita.io needs no
new code in anahita-services, and nothing about it depends on where the
repositories are kept: the changelogs are read, not GitHub's tags.

There were 48 releases in the 23 days to 2026-11-18, on 12 of those days,
up to six in a day. One post for each would bury the blog's news; one post
for each day with releases does not.

## What is settled

1. **One post a day at most,** for the day's releases of both repositories
   together, in `/feed.xml` with the blog's posts. The same Anahita channel
   carries both; no second channel.
2. **Read from the changelogs,** `CHANGELOG.md` of anahita-services and
   anahita-web, by their headings (`## v1.4.0 Birth, 2026-11-18`): Embryo,
   the section above the first Birth heading, is never read.
3. **Finished days only.** A channel never edits a post and never posts an
   item twice, so a day goes into the feed only once it is over, in
   Vancouver's time (`America/Vancouver`), as the changelogs' dates are.
   The nightly build at 08:00 UTC, midnight or 1 am there, is the one
   that adds it; a build during the day leaves the day out.
4. **From the day this is built,** not before: the days already past would
   otherwise all reach the channel in its next read, a dozen posts at once.
   A start date in the code (`RELEASES_SINCE`) says from when.
5. **Its own card for each kind of day,** on a lavender ground no blog card
   uses, drawn 2026-11-18 and in `public/images/blog/`: `releases-services.png`
   (services only), `releases-web.png` (web only), `releases-both.png`. None
   carries a version or a date, so each is reused. A client released later
   gets a card of its own.
6. **The same five hashtags as the blog's posts:** Fediverse, Atmosphere,
   ActivityPub, Atproto, SocialWeb, as categories, which the channel adds
   as hashtags.

7. **A page for each release day,** found while planning: a post's link
   card is the linked page's own picture (`og:image`), so if every day
   linked to one `/releases` page, every post would show the same card.
   Each day is a small page, `/releases/2026-11-18/`, with its card, and
   `/releases/` lists them all.

## Release days

A release day is a date with one Birth heading or more in either changelog.
For each:

| What | From |
| --- | --- |
| Its versions | each repository's headings that day, oldest to newest: "Services v1.2.3 to v1.2.7", "Web v1.2.3" |
| What works with what | the web release's own line, "Works with Anahita Services v1.4.0 or later." |
| What changed | each release's sections (Added, Changed, Removed, Fixed), in the changelog's words |
| Upgrading | a release's `### Upgrading` section, which only a minor release with a manual step has |
| Its card | services only, web only, or both |

Its title: "Services v1.3.5 to v1.3.6, Web v1.3.6", the repositories in that
order and the one alone when only one was released. Its summary, which the
channel posts as its words (300 characters at most): the title's versions in
a sentence, and, on a day with an Upgrading section, "Read the upgrading
notes before upgrading." first, so that operators see it; then what the
web release works with. With the title, the address and the hashtags it
fits in one Bluesky post (`src/lib/bluesky.js`; the user, 2026-11-22): when
it would not, the sentence that says the title again goes first, then what
the web release works with; the upgrading notes stay.

## The pages

1. **`/releases/`:** every release day, newest first, each with its title,
   its date and the first lines of what changed, linking to its page.
   Linked from the footer and from the docs on upgrading.
2. **`/releases/<date>/`:** one day: each release with its version, what it
   works with, its Upgrading section first when it has one, then what
   changed. Its card is the page's `og:image`.
3. **Not in `/blog/`:** the blog's list stays its articles. The blog's
   subtitle, which promises releases, links to `/releases/`.
4. **In the sitemap,** `/releases/` and each day's page.

## The feed

`/feed.xml` keeps one list, newest first: the blog's posts and the release
days, each day an entry with its title, its date (the end of the day, 23:59
in Vancouver), its summary, its page as its link and its five categories.
The feed's `<subtitle>` becomes "News and releases from Anahita."

## The channel

The Anahita channel on banu.io reads `https://www.anahita.io/feed.xml`,
anahita.io proven by its `_anahita` TXT record. If it does not read it
yet, its admins connect it under the channel's settings; nothing else
changes there.

## Out of scope

1. A post for each release, or for Embryo.
2. Webhooks, a bot, or a token for CI: kept for when somebody asks for a
   channel that posts by itself.
3. Changing a post once made: what the changelog says after a day's post
   went out is on the day's page only.

## Phases

One phase, in anahita.io. **Done 2026-11-18,** but for step 5:

1. `scripts/fetch-docs.mjs` keeps each repository's `CHANGELOG.md` beside
   its docs.
2. `src/lib/releases.js`: the release days, from both changelogs, finished
   and since `RELEASES_SINCE`. The site has no unit tests; it is checked by
   building it as on another day (`RELEASES_TODAY`).
3. The two pages, the feed's entries, the sitemap's lines, the footer's
   link and the blog's subtitle.
4. Checked with headless Chrome at desktop and mobile sizes, the feed read
   by syndication-service's own parser, and a build with a fake "today"
   showing the day after a release added and the day itself left out.
5. The channel connected, if it is not, by its admins (the user).

## Documentation

1. anahita.io's `README.md`: the feed carries release days, how they are
   made, and when one appears.
2. anahita-services' `docs/releases.md` and anahita-web's
   `docs/deploying.md`: a changelog heading's form is read by anahita.io,
   so it stays `## vX.Y.Z Birth, YYYY-MM-DD`.
3. This plan moves to `docs/plans/done/` when the phase is finished.
