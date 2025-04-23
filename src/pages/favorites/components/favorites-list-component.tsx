import {JSX, memo} from 'react';
import FavoritesItems from './favorites-items-component.tsx';
import {useAppSelector} from '@/hooks';
import {getFilterFavoriteOffers} from '@/store/main-data/main-data.selectors.ts';

function FavoritesListComponent(): JSX.Element {
  const favorites = useAppSelector(getFilterFavoriteOffers);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favorites.map((favoriteItem) => (
          favoriteItem.offers.length) ? (
            <FavoritesItems
              city={favoriteItem.city}
              offers={favoriteItem.offers}
              key={favoriteItem.city}
            />
          ) : null)}
      </ul>
    </section>
  );
}

const FavoritesList = memo(FavoritesListComponent);
export default FavoritesList;
