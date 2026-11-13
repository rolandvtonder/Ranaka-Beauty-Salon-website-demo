import {useEffect} from 'react';

/**
 * Adds `.is-in` to every `[data-reveal]` element the first time it scrolls
 * into view. Content is visible by default; the hidden start state only
 * applies once `html.js` is set, so crawlers and no-JS visitors see it all.
 */
export function useReveals() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      {rootMargin: '0px 0px -8% 0px'},
    );
    const watch = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, {childList: true, subtree: true});
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
