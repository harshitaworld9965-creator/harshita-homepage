import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './MusicPlayer.css';

// change the titles to match the songs you downloaded
const SONGS = [
  { title: 'strawberry soda — mochi beats', src: '/music/song-1.mp3' },
  { title: 'rainy day tulips — lofi club', src: '/music/song-2.mp3' },
  { title: 'pug parade — 8-bit orchestra', src: '/music/song-3.mp3' },
];

export default function MusicPlayer() {
  const root = useRef(null);
  const spin = useRef(null);  // the CD's spin tween
  const audio = useRef(null); // the <audio> element, so the buttons can control it
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  const { contextSafe } = useGSAP(
    () => {
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

  // when the song changes while we're playing, start the new one
  useEffect(() => {
    if (playing) {
      audio.current.play().catch(() => {});
    }
  }, [track]); // runs every time `track` changes

  const toggle = contextSafe(() => {
    gsap.killTweensOf(spin.current);

    if (playing) {
      audio.current.pause();
      gsap.to(spin.current, {
        timeScale: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => spin.current.pause(),
      });
    } else {
      audio.current.play().catch(() => {});
      spin.current.timeScale(0).play();
      gsap.to(spin.current, { timeScale: 1, duration: 1.2, ease: 'power2.in' });
    }

    setPlaying(!playing);
  });

  const next = contextSafe(() => {
    setTrack((t) => (t + 1) % SONGS.length);
    gsap.fromTo(
      '.player__title',
      { y: -14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  });

  return (
    <div className={`box player ${playing ? 'is-playing' : ''}`} ref={root}>
      <span className="pill">click 4 music!</span>

      {/* the real sound. invisible — our own buttons control it */}
      <audio ref={audio} src={SONGS[track].src} onEnded={next} preload="none" />

      <img className="player__cd" src="/img/cd.png" alt="" />

      <div className="player__screen">
        <div className="player__title">
          <span className="player__scroll">♪ {SONGS[track].title}</span>
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