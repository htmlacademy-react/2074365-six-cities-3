import {JSX} from 'react';
import MainPlacesSorting from '@/pages/main/components/main-places-sorting.tsx';
import MainCitiesPlace from '@/pages/main/components/main-cities-place.tsx';
import LocationMap from 'components/location-map.tsx';
import {City, OfferListItem} from '@/types/offer.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setActiveOfferId} from '@/store/action.ts';
import {Nullable} from 'vitest';
import {getSortedOffers} from '@/utils/sort-helper.ts';


type MainCitiesPlacesProps = {
  currentCity: City;
  currentOffers: OfferListItem[];
}

function MainCities({currentCity, currentOffers}: MainCitiesPlacesProps): JSX.Element {
  const activeOfferId = useAppSelector((state) => state.activeOfferId);
  const sorting = useAppSelector((state) => state.sorting);
  const sortedOffers = getSortedOffers(currentOffers, sorting);
  const dispatch = useAppDispatch();

  function handleOfferHover(cardId: Nullable<string>): void {
    if (activeOfferId !== cardId) {
      dispatch(setActiveOfferId(cardId));
    }
  }

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
          activeOfferId={activeOfferId}
        />
      </div>
    </div>
  );
}

export default MainCities;
