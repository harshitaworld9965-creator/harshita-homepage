import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './SiteMap.css';

// the menu items. id = what App stores, label = what you see
const PAGES = [
  { id: 'home', label: 'home', icon: '/img/icon-home.png' },
  { id: 'about', label: 'about me', icon: '/img/icon-about.png' },
  { id: 'diary', label: 'diary', icon: '/img/icon-diary.png' },
  { id: 'guestbook', label: 'guestbook', icon: '/img/icon-guestbook.png' },
  { id: 'links', label: 'links', icon: '/img/icon-links.png' },
];

// active = which page is showing, onChange = function to change it (both from App)
export default function SiteMap({ active, onChange }) {
  const root = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      // slide the little heart next to whichever link is active
      const link = root.current.querySelector(`[data-id="${active}"]`);
      const heart = root.current.querySelector('.sitemap__heart');

      gsap.to(heart, {
        y: link.offsetTop + (link.offsetHeight - heart.offsetHeight) / 2,
        duration: 0.45,
        ease: 'back.out(2)',
      });
    },
    { scope: root, dependencies: [active] } // run again every time `active` changes
  );

  // hovering a link makes its icon wobble
  const wiggle = contextSafe((e) => {
    const icon = e.currentTarget.querySelector('.sitemap__icon');
    gsap.fromTo(
      icon,
      { rotation: -20, scale: 1.25 },
      { rotation: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.3)' }
    );
  });

  return (
    <nav className="box sitemap" ref={root} aria-label="site map">
      <span className="pill">site map</span>

      <ul className="sitemap__list">
        <span className="sitemap__heart" aria-hidden="true">♥</span>

        {PAGES.map((page) => (
          <li key={page.id}>
            <button
              className={`sitemap__link ${page.id === active ? 'is-active' : ''}`}
              data-id={page.id}
              onClick={() => onChange(page.id)}
              onMouseEnter={wiggle}
              aria-current={page.id === active ? 'page' : undefined}
            >
              <img className="sitemap__icon" src={page.icon} alt="" />
              {page.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}