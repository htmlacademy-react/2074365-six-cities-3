import {JSX} from 'react';
import {favoritesMock} from '../../../mock/favorites-mock.tsx';
import FavoritesItems from './favorites-items.tsx';

function FavoritesList(): JSX.Element {
  const favorites = favoritesMock;
  const citiesName = new Set(
    favorites.map((item) => item?.city?.name).filter((name) => name));

  return (
    <ul className="favorites__list">
      {Array.from(citiesName).map((cityName) => (
        <FavoritesItems
          city={cityName}
          offers={favorites}
          key={cityName}
        />
      ))}
    </ul>
  );
}

export default FavoritesList;
