// The old PHP site's addresses whose pages moved to banu.io when it took over
// anahita.io's people and posts (banu.io's launch plan, row 27). Each has a
// page here that sends its visitors on: a canonical link for search engines,
// an instant refresh for browsers, and a link for anybody whose browser does
// neither. Static pages cannot answer with a 301, so this is what they do.
// Every other old address is a 404.
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
