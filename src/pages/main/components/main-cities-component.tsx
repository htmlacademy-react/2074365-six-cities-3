import {JSX, memo, useCallback, useMemo} from 'react';
import MainPlacesSorting from '@/pages/main/components/main-places-sorting-component.tsx';
import MainCitiesPlace from '@/pages/main/components/main-cities-place-component.tsx';
import LocationMap from 'components/location-map-component.tsx';
import {City, Offer} from '@/types/offer.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {Nullable} from 'vitest';
import {getSortedOffers} from '@/utils/sort-helper.ts';
import {setActiveOfferId} from '@/store/map-process/map-process.slice.ts';
import {getSorting} from '@/store/main-data/main-data.selectors.ts';


type MainCitiesPlacesProps = {
  currentCity: City;
  currentOffers: Offer[];
}

function MainCitiesComponent({currentCity, currentOffers}: MainCitiesPlacesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector(getSorting);
  const sortedOffers = useMemo(() => getSortedOffers(currentOffers, sorting), [currentOffers, sorting]);

  const handleOfferHover = useCallback((cardId: Nullable<string>): void => {
    dispatch(setActiveOfferId(cardId ?? null));
  }, [dispatch]);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedOffers.length} places to stay in {currentCity.name}</b>
        <MainPlacesSorting/>
        <MainCitiesPlace
          offers={sortedOffers}
          onOfferActionId={handleOfferHover}
        />
      </section>
      <div className="cities__right-section">
        <LocationMap
          classType="city"
          offers={sortedOffers}
        />
      </div>
    </div>
  );
}

const MainCities = memo(MainCitiesComponent);
export default MainCities;
