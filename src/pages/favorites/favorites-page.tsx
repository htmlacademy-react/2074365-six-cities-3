import {JSX} from 'react';
import FavoritesList from './components/favorites-list-component.tsx';
import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '@/hooks';
import SpinnerComponent from 'components/spinner/spinner-component.tsx';
import FavoritesEmptyComponent from '@/pages/favorites/components/favorites-empty-component.tsx';
import {getCountFavorites, getDataLoadingStatus} from '@/store/main-data/main-data.selectors.ts';

function FavoritesPage(): JSX.Element {

  const isDataLoading = useAppSelector(getDataLoadingStatus);
  const isEmpty = useAppSelector(getCountFavorites) === 0;

  if (isDataLoading) {
    return (
      <SpinnerComponent/>
    );
  }

  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        {isEmpty
          ? <FavoritesEmptyComponent/>
          : <FavoritesList/>}
      </div>
    </main>
  );
}

export default FavoritesPage;
