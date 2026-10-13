import { useState } from 'react';
import './App.css';
import Banner from './components/Banner.jsx';
import Blinkies from './components/Blinkies.jsx';
import SiteMap from './components/SiteMap.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Content from './components/Content.jsx';

export default function App() {
  // which page the middle box shows. lives here because SiteMap CHANGES it
  // and Content SHOWS it
  const [page, setPage] = useState('home');

  return (
    <div className="page">
      <div className="frame">
        <Banner />
        <Blinkies />

        <aside className="frame__left">
          <SiteMap active={page} onChange={setPage} />
          <MusicPlayer />
        </aside>

        <main className="frame__main">
          <Content page={page} />
          <div className="box">to-do list</div>
        </main>

        <aside className="frame__right">
          <div className="box">photo</div>
          <div className="box">visitor counter</div>
          <div className="box">calendar</div>
        </aside>

        <footer className="frame__footer box">footer</footer>
      </div>
    </div>
  );
}