import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {City} from '@/types/offer.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setCity} from '@/store/action.ts';
import clsx from 'clsx';

function MainLocationsItem({city}: { city: City }): JSX.Element {

  const currentCity = useAppSelector((state) => state.city);
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

export default MainLocationsItem;
