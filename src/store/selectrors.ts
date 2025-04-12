import {Offer} from '@/types/offer.tsx';
import {State} from '@/types/state.ts';
import {Cities} from '@/constants/constants.ts';

type FavoriteOffersByCity = {
  city: string;
  offers: Offer[];
}[];

export const filterFavoriteOffers = (state: State): FavoriteOffersByCity => {
  const favorites: FavoriteOffersByCity = [];
  Cities.map((city) => {
    favorites.push(
      {
        city: city.name,
        offers: state.favorites.filter((favorite) => favorite.city.name === city.name),
      }
    );
  });
  return favorites;
};
