import { useState } from 'react';
import './App.css';
import Banner from './components/Banner.jsx';
import Blinkies from './components/Blinkies.jsx';
import SiteMap from './components/SiteMap.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Content from './components/Content.jsx';
import TodoList from './components/TodoList.jsx';
import Photo from './components/Photo.jsx';
import VisitorCounter from './components/VisitorCounter.jsx';
import Calendar from './components/Calendar.jsx';
import Footer from './components/Footer.jsx';
import Sparkles from './components/Sparkles.jsx';

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
          <TodoList />
        </main>

        <aside className="frame__right">
          <Photo />
          <VisitorCounter />
          <Calendar />
        </aside>

        <Footer />
      </div>

      {/* outside the frame: it covers the whole screen */}
      <Sparkles />
    </div>
  );
}