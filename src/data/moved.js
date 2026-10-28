// The old PHP site's addresses whose pages moved to banu.io when it took over
// anahita.io's people and posts (banu.io's launch plan, row 27). Each has a
// page here that sends its visitors on: a canonical link for search engines,
// an instant refresh for browsers, and a link for anybody whose browser does
// neither. Static pages cannot answer with a 301, so this is what they do.
// The old site's posts are not listed one by one: the not-found page sends
// any address shaped like one on to banu.io (postOnBanu, below).
//
// `from` is the old address without its slashes; `to`, where it is now.
export const moved = [
  { from: 'people/rastin', to: 'https://banu.io/@rastin/', name: 'Rastin Mehr' },
];

// The ones under a section of the old site, by the rest of their address:
// movedUnder('people') is [{ alias: 'rastin', … }].
export const movedUnder = (section) => moved
  .filter(({ from }) => from.startsWith(`${section}/`))
  .map((page) => ({ ...page, alias: page.from.slice(section.length + 1) }));

// Where an old post now is: the PHP site's /notes/123-its-title, and its
// photos, articles and topics, kept on banu.io by the same number, which is
// all banu.io reads of the address: it is sent on by that number. '' for
// any other address. A post since deleted is banu.io's own "not found".
const OLD_POST = /^(?:\/@[\w.-]+)?\/(notes|photos|articles|topics)\/(\d+)(?:-[^/]*)?\/?$/;
export const postOnBanu = (path) => {
  const match = OLD_POST.exec(path || '');
  return match ? `https://banu.io/${match[1]}/${match[2]}` : '';
};

