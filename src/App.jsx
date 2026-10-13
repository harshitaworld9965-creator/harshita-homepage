import './App.css';
import Banner from './components/Banner.jsx';

export default function App() {
  return (
    <div className="page">
      <div className="frame">
        <Banner />

        <div className="frame__strip box">blinkies</div>

        <aside className="frame__left">
          <div className="box">site map</div>
          <div className="box">music player</div>
        </aside>

        <main className="frame__main">
          <div className="box">welcome / about / diary…</div>
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