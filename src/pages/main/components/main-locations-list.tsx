import {JSX} from 'react';
import MainLocationsItem from './main-locations-item.tsx';
import {Cities} from '@/constants/constants.ts';

function MainLocationsList(): JSX.Element {
  const cities = [...new Set(Object.values(Cities))];

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

export default MainLocationsList;
