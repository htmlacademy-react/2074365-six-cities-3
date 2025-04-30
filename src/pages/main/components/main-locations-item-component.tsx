import {JSX, memo} from 'react';
import {Link} from 'react-router-dom';
import {City} from '@/types/offer.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import clsx from 'clsx';
import {setCity} from '@/store/main-data/main-data.slice.ts';
import {getCity} from '@/store/main-data/main-data.selectors.ts';

function MainLocationsItemComponent({city}: { city: City }): JSX.Element {

  const currentCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <Link
        className={clsx('locations__item-link', 'tabs__item', {'tabs__item--active': currentCity === city})}
        to='#'
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(setCity(city));
        }}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

const MainLocationsItem = memo(MainLocationsItemComponent);
export default MainLocationsItem;
