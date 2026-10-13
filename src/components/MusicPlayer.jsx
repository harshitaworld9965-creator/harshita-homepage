import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './MusicPlayer.css';

const SONGS = [
  'strawberry soda — mochi beats',
  'rainy day tulips — lofi club',
  'pug parade — 8-bit orchestra',
];

export default function MusicPlayer() {
  const root = useRef(null);
  const spin = useRef(null); // the CD's spin tween, so the buttons can control it
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  const { contextSafe } = useGSAP(
    () => {
      // build the spin once, but don't start it: paused: true
      spin.current = gsap.to('.player__cd', {
        rotation: 360,
        duration: 3,
        ease: 'none',
        repeat: -1,
        paused: true,
      });
    },
    { scope: root }
  );

  const toggle = contextSafe(() => {
    // stop any spin-up/spin-down that's still in progress, so they can't fight
    gsap.killTweensOf(spin.current);

    if (playing) {
      // slow down to a stop, THEN pause
      gsap.to(spin.current, {
        timeScale: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => spin.current.pause(),
      });
    } else {
      // start from speed 0, then speed up
      spin.current.timeScale(0).play();
      gsap.to(spin.current, { timeScale: 1, duration: 1.2, ease: 'power2.in' });
    }

    setPlaying(!playing);
  });

  const next = contextSafe(() => {
    setTrack((t) => (t + 1) % SONGS.length); // 0 → 1 → 2 → back to 0
    gsap.fromTo(
      '.player__title',
      { y: -14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  });

  return (
    <div className={`box player ${playing ? 'is-playing' : ''}`} ref={root}>
      <span className="pill">click 4 music!</span>

      <img className="player__cd" src="/img/cd.png" alt="" />

      {/* outer: GSAP drops it in on "next". inner: CSS scrolls the text */}
      <div className="player__screen">
        <div className="player__title">
          <span className="player__scroll">♪ {SONGS[track]}</span>
        </div>
      </div>

      <div className="player__eq" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="player__controls">
        <button className="player__btn" onClick={toggle} aria-label={playing ? 'pause' : 'play'}>
          {playing ? '❚❚' : '▶'}
        </button>
        <button className="player__btn" onClick={next} aria-label="next song">
          ⏭
        </button>
      </div>
    </div>
  );
}