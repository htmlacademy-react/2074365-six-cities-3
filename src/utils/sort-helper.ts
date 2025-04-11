import {OfferListItem} from '@/types/offer.tsx';
import {SortType} from '@/constants/constants.ts';

export const getSortedOffers = ((data: OfferListItem[], sortingType: string) => {
  const sortedData = [...data];
  switch (sortingType) {
    case SortType.PriceAscending:
      return sortedData.sort((first, second) => first.price - second.price);
    case SortType.PriceDescending:
      return sortedData.sort((first, second) => second.price - first.price);
    case SortType.Rating:
      return sortedData.sort((first, second) => second.rating - first.rating);
    case SortType.Popular:
      return sortedData;
    default:
      throw new Error(`Unknown sorting type: ${sortingType}`);
  }
});
