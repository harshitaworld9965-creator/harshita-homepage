import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './VisitorCounter.css';

const BASE = 4280; // a cute starting number — the counter adds YOUR visits on top

export default function VisitorCounter() {
  const root = useRef(null);

  useGSAP(
    () => {
      // count this visit, remembered by the browser between visits
      const visits = Number(localStorage.getItem('visits') || 0) + 1;
      localStorage.setItem('visits', visits);

      const digits = root.current.querySelectorAll('.counter__digit');
      const counter = { n: 0 };

      // roll the number up from 0, like an odometer
      gsap.to(counter, {
        n: BASE + visits,
        duration: 2,
        ease: 'power3.out', // fast at first, slowing at the end
        onUpdate: () => {
          const text = String(Math.round(counter.n)).padStart(4, '0'); // 42 → "0042"
          digits.forEach((d, i) => {
            d.textContent = text[i];
          });
        },
      });
    },
    { scope: root }
  );

  return (
    <section className="box counter" ref={root}>
      <span className="pill">wonhee! :O</span>
      <p className="counter__label">you are site visitor</p>
      <div className="counter__digits">
        <span className="counter__digit">0</span>
        <span className="counter__digit">0</span>
        <span className="counter__digit">0</span>
        <span className="counter__digit">0</span>
      </div>
    </section>
  );
}