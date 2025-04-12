import {JSX} from 'react';
import FavoritesItems from './favorites-items.tsx';
import {useAppSelector} from '@/hooks';
import {filterFavoriteOffers} from '@/store/selectrors.ts';

function FavoritesList(): JSX.Element {
  const favorites = useAppSelector(filterFavoriteOffers);

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

export default FavoritesList;
