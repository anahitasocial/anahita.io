'use client';

import { useEffect } from 'react';
import { postOnBanu } from '../data/moved';

// On the not-found page: an old post's address sends the browser on to the
// post on banu.io (src/data/moved.js). Anything else stays not found.
export default function MovedPost() {
  useEffect(() => {
    const to = postOnBanu(window.location.pathname);
    if (to) window.location.replace(to);
  }, []);
  return null;
}
