// How an entry of the feed reads on Bluesky. The Anahita channel follows
// the feed, and posts each entry as its title, its summary, its address and
// its hashtags, each on a paragraph of its own (anahita-services,
// syndication-service, ContentOf); its Bluesky account then posts that,
// with the address shown short (atproto-service, bsky.ShortLink). Bluesky
// takes 300 letters; past that the post is cut, mid-sentence. So whatever
// goes into the feed is made to fit (the user, 2026-11-22).

// What Bluesky takes, in letters, counted as Anahita counts them.
export const BLUESKY_MAX = 300;

// The most letters an address is shown in (anahita-libs posts.LinkLength).
const LINK_SHOWN = 23;

// The most hashtags a channel's post carries.
const TAGS_MAX = 5;

const letters = (text) => [...text].length;

// An address as Bluesky's app shows it, and Anahita with it: without its
// scheme, "www." or a closing slash, cut with "…".
export function shortLink(address) {
  const shown = address.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  return letters(shown) > LINK_SHOWN ? `${[...shown].slice(0, LINK_SHOWN - 1).join('')}…` : shown;
}

// How many letters an entry takes on Bluesky.
export function blueskyLength({ title, summary, address, tags = [] }) {
  const shown = tags.slice(0, TAGS_MAX);
  const text = [title, summary, shortLink(address), shown.length ? `#${shown.join(' #')}` : '']
    .filter(Boolean)
    .join('\n\n');
  return letters(text);
}
