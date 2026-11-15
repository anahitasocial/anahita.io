import { ViewTransition } from 'react';

// Every page eases in, and the one before it eases out, as one moves about
// the site: the browser's own view transitions, which Next.js starts on each
// navigation (src/app/transitions.css). The template is made again for each
// page, as a layout is not, so that each page enters and leaves. A browser
// without them shows the next page at once, as before.
export default function Template({ children }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
