import {JSX} from 'react';

type LocationsItemProps = {
  isActive: boolean;
  city: string;
}

function MainLocationsItem({isActive, city}: LocationsItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default MainLocationsItem;
