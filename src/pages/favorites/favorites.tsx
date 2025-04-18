import {JSX} from 'react';
import FavoritesList from './components/favorites-list.tsx';
import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '@/hooks';
import Spinner from 'components/spinner/spinner.tsx';
import FavoritesEmpty from '@/pages/favorites/components/favorites-empty.tsx';

function Favorites(): JSX.Element {

  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const isEmpty = useAppSelector((state) => state.countFavorites === 0);

  if (isDataLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        {isEmpty
          ? <FavoritesEmpty/>
          : <FavoritesList/>}
      </div>
    </main>
  );
}

export default Favorites;
