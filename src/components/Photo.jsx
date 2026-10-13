import './Photo.css';

export default function Photo() {
  return (
    <figure className="box photo">
      <div className="photo__polaroid">
        <img className="photo__img" src="/img/me.png" alt="harshita" />
        <figcaption className="photo__caption">hi it's me :D</figcaption>
      </div>
    </figure>
  );
}