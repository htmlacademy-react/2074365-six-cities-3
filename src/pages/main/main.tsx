import {JSX} from 'react';
import Header from '../../components/header.tsx';
import MainLocationsList from './components/main-locations-list.tsx';
import MainCitiesPlace from './components/main-cities-place.tsx';
import MainPlacesSorting from './components/main-places-sorting.tsx';
import HeaderNav from '../../components/header-nav.tsx';
import LocationMap from '../../components/location-map.tsx';

function Main(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header>
        <HeaderNav/>
      </Header>
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
              <MainCitiesPlace/>
            </section>
            <div className="cities__right-section">
              <LocationMap classType={'city'}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
