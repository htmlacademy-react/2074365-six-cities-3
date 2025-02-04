import {JSX} from 'react';
import FavoritesList from './components/favorites-list.tsx';

function Favorites(): JSX.Element {

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList/>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
