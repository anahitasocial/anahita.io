---
title: The title of the post
date: 2026-01-31
summary: One line, shown in the blog's list, the feed and link previews.
author: Rastin Mehr
image: /images/blog/the-address.png
imageAlt: What the card shows, in words.
draft: true
---

Copy this file to `YYYY-MM-DD-the-address.md`: the part after the date is
the post's address, so `2026-11-02-hello.md` is published at `/blog/hello/`.

Write in Markdown. While `draft: true` is above, the post shows under
`yarn dev` only. Take that line out when it is ready, and push to `main`.

## A heading

Links: [the FAQ](/faq/), or [another site](https://example.org), which opens
in a new tab.

`image` is the card shown where the post is shared, 1200 by 630 pixels, and
`imageAlt` says what it shows; without them, the site's own card is shown.

Pictures go in `public/images/blog/`:

![What the picture shows](/images/blog/a-picture.webp)
