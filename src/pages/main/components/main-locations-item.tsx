import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants/constants.tsx';


type LocationsItemProps = {
  isActive: boolean;
  city: string;
}

function MainLocationsItem({isActive, city}: LocationsItemProps): JSX.Element {

  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} to={AppRoute.Root}>
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default MainLocationsItem;
