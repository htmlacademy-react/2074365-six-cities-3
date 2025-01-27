import {JSX} from 'react';


function FavoritesLocations({city}: { city: string }): JSX.Element {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{city}</span>
        </a>
      </div>
    </div>
  );
}

export default FavoritesLocations;
