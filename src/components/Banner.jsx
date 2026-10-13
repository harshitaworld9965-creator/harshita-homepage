
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import './Banner.css';

const TITLE = "harshita's homepage";

// where the little sparkles sit, as % of the banner
const SPARKLES = [
  { top: 12, left: 8 },
  { top: 30, left: 46 },
  { top: 8, left: 70 },
  { top: 55, left: 92 },
  { top: 70, left: 38 },
  { top: 20, left: 24 },
];

export default function Banner() {
  const root = useRef(null);

  useGSAP(
    () => {
      // 1. on load: the picture fades in and settles, then the title pops in letter by letter
      const tl = gsap.timeline();

      tl.from('.banner__img', {
        opacity: 0,
        scale: 1.08,
        duration: 1.2,
        ease: 'power2.out',
      }).from(
        '.banner__letter',
        {
          y: -30,
          scale: 0.4,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(3)',
        },
        '-=0.5' // start 0.5s BEFORE the picture finishes, so they overlap
      );

      // 2. forever: sparkles twinkle, each at its own speed
      gsap.to('.banner__sparkle', {
        opacity: 0.2,
        scale: 0.6,
        duration: 'random(0.6, 1.4)',
        repeat: -1, // -1 = forever
        yoyo: true, // go back and forth instead of jumping back to the start
        ease: 'sine.inOut',
        stagger: { each: 0.2, from: 'random' },
      });
    },
    { scope: root }
  );

  return (
    <header className="frame__banner box banner" ref={root}>
      <img className="banner__img" src="/img/banner.png" alt="" />

      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="banner__sparkle"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          aria-hidden="true"
        >
          ✦
        </span>
      ))}

      <h1 className="banner__title" aria-label={TITLE}>
        {TITLE.split('').map((ch, i) => (
          <span key={i} className="banner__letter" aria-hidden="true">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </h1>
    </header>
  );
}