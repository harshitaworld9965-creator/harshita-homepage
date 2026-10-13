import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Blinkies.css';

// each blinkie: its text, a little icon, and two gradient colours
const BLINKIES = [
  { text: 'i ♥ coffee', icon: '☕', from: '#ffb8d2', to: '#ffe0ec' },
  { text: 'pug lover', icon: '🐶', from: '#a8e0a0', to: '#e6f7e2' },
  { text: 'made with gsap', icon: '✦', from: '#ffd9a8', to: '#fff8ee' },
  { text: "harshita's world", icon: '🌷', from: '#c9b8ff', to: '#efe8ff' },
  { text: 'stay cute', icon: '🎀', from: '#ffb8d2', to: '#ffe0ec' },
  { text: 'web 1.0 forever', icon: '💾', from: '#a8d8ff', to: '#e3f3ff' },
];

export default function Blinkies() {
  const root = useRef(null);
  const loop = useRef(null); // keeps the tween so the hover handlers can reach it

  const { contextSafe } = useGSAP(
    () => {
      // slide the track left by exactly half its width, forever.
      // the second half is a copy of the first, so the jump back is invisible
      loop.current = gsap.to('.blinkies__track', {
        xPercent: -50,
        duration: 20,
        ease: 'none', // constant speed, no speeding up or slowing down
        repeat: -1,
      });
    },
    { scope: root }
  );

  // hovering gently slows the strip to a stop; leaving speeds it back up
  const slowDown = contextSafe(() => {
    gsap.to(loop.current, { timeScale: 0, duration: 0.5 });
  });
  const speedUp = contextSafe(() => {
    gsap.to(loop.current, { timeScale: 1, duration: 0.5 });
  });

  // the list drawn twice, back to back
  const twice = [...BLINKIES, ...BLINKIES];

  return (
    <div
      className="frame__strip box blinkies"
      ref={root}
      onMouseEnter={slowDown}
      onMouseLeave={speedUp}
    >
      <ul className="blinkies__track">
        {twice.map((b, i) => (
          <li
            key={i}
            className="blinkie"
            style={{ '--from': b.from, '--to': b.to }}
            aria-hidden={i >= BLINKIES.length} // screen readers only read the first copy
          >
            <span className="blinkie__icon">{b.icon}</span>
            {b.text}
          </li>
        ))}
      </ul>
    </div>
  );
}