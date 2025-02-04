import {JSX} from 'react';
import MainPlacesOption from './main-places-option.tsx';
import {SortType} from '@/constants/constants.tsx';


function MainPlacesOptions(): JSX.Element {
  const sortType = Object.values(SortType);

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {sortType.map((type, index) => (
        <MainPlacesOption
          isActive={index === 0}
          sortType={type}
          key={type}
        />
      ))}
    </ul>
  );
}

export default MainPlacesOptions;
