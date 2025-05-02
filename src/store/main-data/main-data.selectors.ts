import {State} from '@/types/state';
import {City, Offers} from '@/types/offer.tsx';
import {CITIES, NameSpace} from '@/constants/constants.ts';
import {createSelector} from '@reduxjs/toolkit';
import {RequestStatus} from '@/types/user.ts';

type FavoriteOffersByCity = {
  city: string;
  offers: Offers;
}[];

export const getCity = (state: State): City => state[NameSpace.Main].city;
export const getSorting = (state: State): string => state[NameSpace.Main].sorting;
export const getOffers = (state: State): Offers => state[NameSpace.Main].offers;
export const getFavorites = (state: State): Offers => state[NameSpace.Main].favorites;
export const getCountFavorites = (state: State): number => state[NameSpace.Main].favorites.length;
export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Main].isDataLoading;
export const getOffersLoadingStatus = (state: State): RequestStatus => state[NameSpace.Main].offersLoadingStatus;
export const getError = (state: State): string | null => state[NameSpace.Main].error;

export const getFilterFavoriteOffers = (state: State): FavoriteOffersByCity =>
  CITIES.reduce<FavoriteOffersByCity>((acc, city) => {
    acc.push({
      city: city.name,
      offers: state[NameSpace.Main].favorites.filter(
        (favorite) => favorite.city.name === city.name
      ),
    });
    return acc;
  }, []);

export const getFilteredOffers = createSelector([getCity, getOffers],
  (city, offers) => offers.filter((offer) => offer.city.name === city.name)
);
