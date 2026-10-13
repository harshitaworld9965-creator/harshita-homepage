import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import './Content.css';

// every page's title and content, keyed by the same ids the site map uses.
// rewrite all of this in your own words!
const PAGES = {
  home: {
    title: 'welcome ✿',
    body: (
      <>
        <h2 className="content__big">entering the park…</h2>
        <p>hi hi! welcome to my little corner of the internet.</p>
        <p>click around the site map on the left to explore ♡</p>
        <p className="content__note">best viewed with a cup of coffee ☕</p>
      </>
    ),
  },
  about: {
    title: 'about me',
    body: (
      <>
        <p><strong>name:</strong> harshita</p>
        <p><strong>i do:</strong> make websites, slowly and with love</p>
        <p><strong>i like:</strong> coffee, pugs, pastel everything, gsap</p>
        <p><strong>currently:</strong> building this homepage!</p>
      </>
    ),
  },
  diary: {
    title: 'diary',
    body: (
      <>
        <article className="content__entry">
          <h3>oct 13 ✦ the blinkies work!!</h3>
          <p>learned the seamless loop trick today. it's just the list twice lol</p>
        </article>
        <article className="content__entry">
          <h3>oct 12 ✦ started this site</h3>
          <p>gingham background made with zero images. css is magic.</p>
        </article>
      </>
    ),
  },
  guestbook: {
    title: 'guestbook',
    body: (
      <>
        <p className="content__entry">♡ mochi: cute site!! the cd spins!!</p>
        <p className="content__entry">♡ biscuit: woof (i love the pug)</p>
        <p className="content__entry">♡ a visitor: 10/10 gingham</p>
        <p className="content__note">sign the guestbook… coming soon!</p>
      </>
    ),
  },
  links: {
    title: 'links',
    body: (
      <>
        <p><a href="https://harshita-works.vercel.app" target="_blank" rel="noreferrer">my portfolio ↗</a></p>
        <p><a href="https://github.com/your-username" target="_blank" rel="noreferrer">github ↗</a></p>
        <p><a href="https://neocities.org" target="_blank" rel="noreferrer">neocities, where cute sites live ↗</a></p>
      </>
    ),
  },
};

// page = what the site map picked (from App)
export default function Content({ page }) {
  const root = useRef(null);
  // what's ON SCREEN right now. lags behind `page` while the old content fades out
  const [shown, setShown] = useState(page);

  // 1. the site map picked a new page → fade the old content out first
  useGSAP(
    () => {
      if (page === shown) return; // nothing to change (this also skips the first load)

      gsap.to('.content__inner', {
        opacity: 0,
        y: 12,
        duration: 0.2,
        ease: 'power1.in',
        onComplete: () => setShown(page), // only NOW swap the content
      });
    },
    { scope: root, dependencies: [page] }
  );

  // 2. new content is on screen → drop it in, lines appearing one by one
  useGSAP(
    () => {
      gsap.fromTo(
        '.content__inner',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }
      );
      gsap.from('.content__inner > *', {
        opacity: 0,
        y: 8,
        duration: 0.3,
        stagger: 0.07,
        delay: 0.1,
      });
    },
    { scope: root, dependencies: [shown] }
  );

  const current = PAGES[shown];

  return (
    <section className="box content" ref={root}>
      <span className="pill">{current.title}</span>
      <div className="content__inner">{current.body}</div>
    </section>
  );
}