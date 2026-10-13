import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Calendar.css';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Calendar() {
  const root = useRef(null);

  // ---- work out this month from today's date ----
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0 = January, 11 = December
  const monthName = today.toLocaleString('en', { month: 'long' }).toLowerCase();

  const firstWeekday = new Date(year, month, 1).getDay();    // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // "day 0 of next month" = last day of this one

  // empty cells before the 1st, then 1, 2, 3 … daysInMonth
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  useGSAP(
    () => {
      // days pop in diagonally across the grid
      gsap.from('.cal__day', {
        scale: 0,
        duration: 0.35,
        ease: 'back.out(2.5)',
        stagger: { grid: 'auto', from: 'start', amount: 0.8 },
      });

      // today's heart beats forever
      gsap.to('.cal__heart', {
        scale: 1.3,
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root }
  );

  return (
    <section className="box cal" ref={root}>
      <span className="pill">{monthName} {year}</span>

      <div className="cal__grid">
        {WEEKDAYS.map((d, i) => (
          <span key={`w${i}`} className="cal__weekday">{d}</span>
        ))}

        {cells.map((day, i) =>
          day === null ? (
            <span key={`e${i}`} className="cal__empty" />
          ) : (
            <span
              key={day}
              className={`cal__day ${day === today.getDate() ? 'is-today' : ''}`}
            >
              {day === today.getDate() && (
                <span className="cal__heart" aria-hidden="true">♥</span>
              )}
              <span className="cal__num">{day}</span>
            </span>
          )
        )}
      </div>
    </section>
  );
}