---
title: Quotes stay on their own network
date: 2026-11-19T10:00:00-08:00
summary: We changed our mind about quotes. A quote of a Mastodon post now stays on the fediverse, a quote of a Bluesky post stays on Bluesky, and on Mastodon nothing goes out until the author says yes.
author: Rastin Mehr
image: /images/blog/quotes-everywhere.png
imageAlt: "A line drawing: your post, a quotation mark before your words, and inside it the post you quote, with its own author and picture."
tags: [Fediverse, Atmosphere, ActivityPub, Atproto, SocialWeb]
draft: true
---

Yesterday we wrote that [quotes written on Anahita reach Mastodon and Bluesky](/blog/quotes-everywhere/). Since then, we have changed our mind, and refined the design.

When somebody on Mastodon lets their post be quoted, they agree to a quote on the fediverse. They have not agreed to have their post carried to Bluesky, even though it is public. The same is true the other way round. Consent given on one network isn't consent for another.

## Where a quote goes now

Starting with Anahita Services v1.4.1, a quote goes only where the post it quotes is:

* A quote of a post from the fediverse goes to the fediverse.
* A quote of a post from Bluesky goes to Bluesky.
* A quote of a post written here goes to every network its author shares it with.

Anahita is part of both networks, so every quote is shown here. A post crosses from one network to the other only when somebody pastes its address into a post themselves.

## Asking first

Until now, a quote of a Mastodon post went out at once, and its author was asked at the same moment. If they said no, the quote was sent again without their post. Now Anahita asks first, and the quote goes out only when they say yes. If they say no, nothing goes out, and their post is taken out of the quote here; your words stay.

## Who may quote

Every post on Mastodon says who may quote it: anyone, the author's followers, or nobody. On Bluesky, an author can turn quotes off for a post. Anahita now reads both, and offers Quote only where the author allows it.

Sharing is an agreement, not an assumption, and that includes where a quote goes.
