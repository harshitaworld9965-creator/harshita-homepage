import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Footer.css';

export default function Footer() {
  const root = useRef(null);
  const jump = useRef(null); // remembers the current jump, so we don't start another mid-air

  const { contextSafe } = useGSAP({ scope: root });

  // the pug squashes, leaps, stretches, and lands with a bounce
  const hop = contextSafe(() => {
    if (jump.current && jump.current.isActive()) return; // already jumping

    const pug = root.current.querySelector('.footer__pug');

    jump.current = gsap
      .timeline({ defaults: { transformOrigin: '50% 100%' } }) // squash from the feet
      .to(pug, { scaleX: 1.2, scaleY: 0.75, duration: 0.12 })                      // crouch
      .to(pug, { y: -45, scaleX: 0.9, scaleY: 1.15, duration: 0.3, ease: 'power2.out' }) // leap
      .to(pug, { y: 0, scaleX: 1, scaleY: 1, duration: 0.45, ease: 'bounce.out' });    // land
  });

  return (
    <footer className="frame__footer box footer" ref={root}>
      <div className="footer__bob">
        <img
          className="footer__pug"
          src="/img/mascot.png"
          alt="a little pug mascot"
          onMouseEnter={hop}
          onClick={hop}
        />
      </div>

      <p className="footer__text">
        made with ♡ by harshita · {new Date().getFullYear()}
        <br />
        <span className="footer__small">best viewed in any browser, honestly</span>
      </p>
    </footer>
  );
}