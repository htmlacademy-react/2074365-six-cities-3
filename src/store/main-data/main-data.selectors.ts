import {State} from '@/types/state';
import {City, Offers} from '@/types/offer.tsx';
import {Cities, NameSpace} from '@/constants/constants.ts';

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
export const getError = (state: State): string | null => state[NameSpace.Main].error;

export const getFilterFavoriteOffers = (state: State): FavoriteOffersByCity => {
  const favorites: FavoriteOffersByCity = [];
  Cities.map((city) => {
    favorites.push(
      {
        city: state[NameSpace.Main].city.name,
        offers: state[NameSpace.Main].favorites.filter((favorite) => favorite.city.name === city.name),
      }
    );
  });
  return favorites;
};


export const getFilteredOffers = (state: State) =>
  state[NameSpace.Main].offers.filter((offer) => offer.city.name === state[NameSpace.Main].city.name);
