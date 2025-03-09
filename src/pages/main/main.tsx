import {JSX, useState} from 'react';
import MainLocationsList from './components/main-locations-list.tsx';
import MainCitiesPlace from './components/main-cities-place.tsx';
import MainPlacesSorting from './components/main-places-sorting.tsx';
import LocationMap from '@/components/location-map.tsx';
import {offersMock} from '@/mock/offers-mock.tsx';
import {Nullable} from 'vitest';

function Main(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<string>>(null);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <MainLocationsList/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <MainPlacesSorting/>
            <MainCitiesPlace
              setActiveOffer={setActiveOffer}
            />
          </section>
          <div className="cities__right-section">
            <LocationMap
              classType='city'
              offers={offersMock}
              activeOfferId={activeOffer}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
