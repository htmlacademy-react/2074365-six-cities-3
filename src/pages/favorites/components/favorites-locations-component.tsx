import {JSX, memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, CITIES} from '@/constants/constants.ts';
import {setCity} from '@/store/main-data/main-data.slice.ts';
import {useAppDispatch} from '@/hooks';


function FavoritesLocationsComponent({city}: { city: string }): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={AppRoute.Root}
          onClick={() => {
            const selectedCity = CITIES.find((item) => city === item.name);
            if (selectedCity) {
              dispatch(setCity(selectedCity));
            }
          }}
        >
          <span>{city}</span>
        </Link>
      </div>
    </div>
  );
}

const FavoritesLocations = memo(FavoritesLocationsComponent);
export default FavoritesLocations;
