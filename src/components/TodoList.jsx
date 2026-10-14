import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './TodoList.css';

const START = [
  { id: 1, text: 'finish my law degree', done: true },
  { id: 2, text: 'learn react + gsap', done: true },
  { id: 3, text: 'build a cute homepage', done: true },
  { id: 4, text: 'launch my portfolio', done: false },
  { id: 5, text: 'post my projects on instagram', done: false },
  { id: 6, text: 'get a design engineer job', done: false },
  { id: 7, text: 'make a site that wins an award', done: false },
  { id: 8, text: 'adopt a pug 🐶', done: false },
];

export default function TodoList() {
  const root = useRef(null);
  const [todos, setTodos] = useState(START);

  const { contextSafe } = useGSAP({ scope: root });

  const toggle = contextSafe((id, e) => {
    const item = e.currentTarget;
    const stamp = item.querySelector('.todo__stamp');
    const willBeDone = !todos.find((t) => t.id === id).done;

    // 1. update the data (React re-renders with the new class)
    setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

    // 2. the whole row squishes, then wobbles back
    gsap.fromTo(
      item,
      { scaleX: 1.04, scaleY: 0.85 },
      { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' }
    );

    // 3. the stamp slams down (or lifts off)
    if (willBeDone) {
      gsap.fromTo(
        stamp,
        { scale: 2.5, rotation: -30, opacity: 0 },
        { scale: 1, rotation: -12, opacity: 1, duration: 0.4, ease: 'back.out(3)' }
      );
    } else {
      gsap.to(stamp, { scale: 0.5, opacity: 0, duration: 0.2 });
    }
  });

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <section className="box todo" ref={root}>
      <span className="pill">to-do list</span>

      <ol className="todo__list">
        {todos.map((t) => (
          <li key={t.id}>
            <button
              className={`todo__item ${t.done ? 'is-done' : ''}`}
              onClick={(e) => toggle(t.id, e)}
              aria-pressed={t.done}
            >
              <span className="todo__text">{t.text}</span>
              <span className="todo__stamp" aria-hidden="true">done!</span>
            </button>
          </li>
        ))}
      </ol>

      <p className="todo__count">
        {doneCount} / {todos.length} done {doneCount === todos.length ? '🎉' : '✿'}
      </p>
    </section>
  );
}