import {JSX, useEffect} from 'react';
import MainLocationsList from './components/main-locations-list-component.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import MainEmptyCitiesComponent from '@/pages/main/components/main-empty-cities-component.tsx';
import MainCities from '@/pages/main/components/main-cities-component.tsx';
import {Helmet} from 'react-helmet-async';
import {fetchOffersAction} from '@/store/api-actions.ts';
import SpinnerComponent from 'components/spinner/spinner-component.tsx';
import {getCity, getFilteredOffers, getOffersLoadingStatus} from '@/store/main-data/main-data.selectors.ts';
import {RequestStatus} from '@/types/user.ts';
import clsx from 'clsx';


function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(getCity);
  const currentOffers = useAppSelector(getFilteredOffers);
  const offersLoadingStatus = useAppSelector(getOffersLoadingStatus);

  useEffect(() => {
    if (offersLoadingStatus === RequestStatus.Idle) {
      dispatch(fetchOffersAction());
    }

  }, [dispatch, offersLoadingStatus]);

  if (offersLoadingStatus === RequestStatus.Idle || offersLoadingStatus === RequestStatus.Loading) {
    return <SpinnerComponent/>;
  }

  const isEmpty = currentOffers.length === 0;

  return (
    <main className={clsx('page__main page__main--index', {'page__main--index-empty': isEmpty})}>
      <Helmet>
        <title>{currentCity.name}</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <MainLocationsList/>
        </section>
      </div>
      <div className="cities">
        {isEmpty
          ? <MainEmptyCitiesComponent cityName={currentCity.name}/>
          : <MainCities currentCity={currentCity} currentOffers={currentOffers}/>}
      </div>
    </main>
  );
}

export default MainPage;
