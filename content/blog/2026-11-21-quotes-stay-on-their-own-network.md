---
title: Quotes stay on their own network
date: 2026-11-21T22:08:00-07:00
summary: We changed our mind about quotes. A quote of a Mastodon post now stays on the fediverse, a quote of a Bluesky post stays on Bluesky, and on the fediverse nothing goes out until the author says yes.
author: Rastin Mehr
image: /images/blog/quotes-stay-on-their-own-network.png
imageAlt: "A line drawing: your post, with the post you quote inside it, waiting; an arrow asks its author, a stamp comes back, and only then does your post go out to other servers."
tags: [Fediverse, Atmosphere, ActivityPub, Atproto, SocialWeb]
draft: false
---

Earlier this week we wrote that [quotes written on Anahita reach Mastodon and Bluesky](/blog/quotes-everywhere/). Since then, we have changed our minds and refined the design: carrying quotes across networks automatically was a bad idea.

When someone on Mastodon allows their post to be quoted, they agree to have it shared on the fediverse, but that doesn’t imply consent to share it automatically on other social networks. For example: they have not agreed to have their post carried to Bluesky, even though their post is public. The same is true the other way round. Consent given on one network isn’t consent for another.

## Where a quote goes now

Starting with Anahita Services v1.4.1, a quote goes only where the post it quotes is:

* A quote of a post from the fediverse goes to the fediverse.
* A quote of a post from Bluesky goes to Bluesky.
* A quote of a post written on Anahita goes to the networks that post is on.

Anahita is part of both networks, so every quote is shown here. Anyone can still copy a post’s address and paste it into a post on another network themselves; we didn’t want that built into the software and done automatically.

## Asking first

In v1.4.0, a quote of a Mastodon post went out right away, and Anahita asked its author for permission at the same moment. If they declined, the quote was sent again without their post. Consent came after the fact, which is backwards.

Now consent comes first. For asking and approving, Anahita follows [FEP-044f](https://codeberg.org/fediverse/fep/src/branch/main/fep/044f/fep-044f.md), the proposal Mastodon's quotes are built on: when you quote a post from the fediverse, your server sends a `QuoteRequest` to its author's server, and nothing else goes out. If the author accepts, their server replies with an `Accept` and a stamp, a `QuoteAuthorization`, and only then does your quote go out, carrying the stamp so that any server can check it. If they decline, nothing is sent, and their post is taken out of your quote here; your own words stay. A request that is never answered sends nothing either: silence is not consent.

FEP-044f also lets an author take their consent back after saying yes, by deleting the stamp. Anahita doesn't handle that yet, in either direction; it is next on our list.

## Who may quote

Authors can also give consent in advance. Since Mastodon 4.5, each Mastodon post says who may quote it, in its `interactionPolicy.canQuote`; Anahita reads that as anyone, the author's followers, or nobody. A post that says nothing, such as one from an older server, counts as nobody, as it does on Mastodon. On Bluesky, an author can turn quotes off for a post with a postgate. Anahita reads both, follows them when authors change their minds, and offers Quote only where the author allows it. On the fediverse, the policy is only a hint, though: what lets a quote go out is still the author’s stamp.

Building a social network means paying attention to the subtle cultural and ethical nuances of how people interact online. One thing we love about the fediverse is how consent-centric it is: sharing is an agreement, not an assumption, and that includes where a quote goes.
