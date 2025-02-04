import {JSX} from 'react';
import clsx from 'clsx';

type PlacesOptionProps = {
  isActive: boolean;
  sortType: string;
}

function MainPlacesOption({isActive, sortType}: PlacesOptionProps): JSX.Element {

  return (
    <li className={clsx('places__option', isActive && 'places__option--active')} tabIndex={0}>{sortType}</li>
  );
}

export default MainPlacesOption;
