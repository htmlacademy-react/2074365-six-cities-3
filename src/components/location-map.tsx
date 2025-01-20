import {JSX} from 'react';
import {Classes} from '../constants/constants.tsx';


function LocationMap({classType}: { classType: 'city' | 'offer' }): JSX.Element {
  const offerClasses = Classes[classType];

  return (
    <section className={`${offerClasses.map} map`}></section>
  );
}

export default LocationMap;
