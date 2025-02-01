import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants/constants.tsx';


function FavoritesLocations({city}: { city: string }): JSX.Element {

  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.Root}>
          <span>{city}</span>
        </Link>
      </div>
    </div>
  );
}

export default FavoritesLocations;
