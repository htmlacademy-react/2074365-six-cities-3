import {OfferListItem} from '@/types/offer.tsx';
import {SortType} from '@/constants/constants.tsx';

export const getSortedOffers = ((data: OfferListItem[], sortingType: string) => {
  const sortedData = [...data];
  switch (sortingType) {
    case SortType.PRICE_UP:
      return sortedData.sort((first, second) => first.price - second.price);
    case SortType.PRICE_DOWN:
      return sortedData.sort((first, second) => second.price - first.price);
    case SortType.RATING:
      return sortedData.sort((first, second) => second.rating - first.rating);

    case SortType.POPULAR:
    default:
      return (data);
  }
});
