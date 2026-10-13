import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Sparkles.css';

const COLOURS = ['#ff8fb8', '#a8e0a0', '#ffd9a8', '#c9b8ff'];
const SHAPES = ['✦', '♥', '✧', '⋆'];

export default function Sparkles() {
  const layer = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      // respect people who've asked their computer for less motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let lastX = 0;
      let lastY = 0;

      const onMove = contextSafe((e) => {
        // only make a sparkle every 18px of movement, not on every tiny twitch
        if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 18) return;
        lastX = e.clientX;
        lastY = e.clientY;

        // 1. create a new element and drop it at the cursor
        const s = document.createElement('span');
        s.className = 'sparkle';
        s.textContent = gsap.utils.random(SHAPES);
        s.style.color = gsap.utils.random(COLOURS);
        layer.current.appendChild(s);

        gsap.set(s, { x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50 });

        // 2. it drifts down, spins and shrinks away…
        gsap.to(s, {
          y: `+=${gsap.utils.random(20, 50)}`,
          x: `+=${gsap.utils.random(-20, 20)}`,
          rotation: gsap.utils.random(-180, 180),
          scale: 0,
          duration: gsap.utils.random(0.6, 1),
          ease: 'power1.in',
          // 3. …and is deleted when it's gone, so they don't pile up forever
          onComplete: () => s.remove(),
        });
      });

      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: layer }
  );

  return <div className="sparkles" ref={layer} aria-hidden="true" />;
}