---
title: The title of the post
date: 2026-01-31T09:00:00-07:00
summary: One line, shown in the blog's list, the feed and link previews.
author: Rastin Mehr
image: /images/blog/the-address.png
imageAlt: What the card shows, in words.
tags: [Fediverse, Atmosphere, ActivityPub, Atproto, SocialWeb]
draft: true
---

Copy this file to `YYYY-MM-DD-the-address.md`: the part after the date is
the post's address, so `2026-11-02-hello.md` is published at `/blog/hello/`.

Write in Markdown. While `draft: true` is above, the post shows under
`yarn dev` only. Take that line out when it is ready, and push to `main`.
Set `date:` to the moment you publish, as `date -Iseconds` prints it: the
feed carries it, and a channel that follows the feed dates its post by it.

The title, the summary, the post's address and its hashtags must fit in one
post on Bluesky, 300 letters, as the Anahita channel posts them there; the
address counts as 23 at most. A post that does not stops the build, saying
by how much (`src/lib/bluesky.js`).

## A heading

Links: [the FAQ](/faq/), or [another site](https://example.org), which opens
in a new tab.

`image` is the card shown where the post is shared, 1200 by 630 pixels, and
`imageAlt` says what it shows; without them, the site's own card is shown.

`tags` are the post's hashtags, without the `#`: the feed carries them, and a
channel that follows the feed adds them to its post, five at most.

Pictures go in `public/images/blog/`:

![What the picture shows](/images/blog/a-picture.webp)
