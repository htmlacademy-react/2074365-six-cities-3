import {JSX} from 'react';
import MainLocationsItem from './main-locations-item.tsx';
import {Cities} from '@/constants/constants.tsx';

function MainLocationsList(): JSX.Element {
  const cities = [...new Set(Object.values(Cities))];

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, index) => (
        <MainLocationsItem
          isActive={index === 3}
          city={city}
          key={city}
        />
      ))}
    </ul>
  );
}

export default MainLocationsList;
