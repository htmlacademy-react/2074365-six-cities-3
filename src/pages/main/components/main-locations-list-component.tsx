import {JSX, memo} from 'react';
import MainLocationsItem from './main-locations-item-component.tsx';
import {CITIES} from '@/constants/constants.ts';

function MainLocationsListComponent(): JSX.Element {
  const cities = [...new Set(Object.values(CITIES))];

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <MainLocationsItem
          city={city}
          key={city.name}
        />
      ))}
    </ul>
  );
}

const MainLocationsList = memo(MainLocationsListComponent);
export default MainLocationsList;
