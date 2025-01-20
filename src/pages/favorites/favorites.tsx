import {JSX} from 'react';
import HeaderNav from '../../components/header-nav.tsx';
import Header from '../../components/header.tsx';
import Footer from '../../components/footer.tsx';
import FavoritesList from './components/favorites-list.tsx';

function Favorites(): JSX.Element {
  return (
    <div className="page">
      <Header>
        <HeaderNav/>
      </Header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList/>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Favorites;
