import dayjs from 'dayjs';
import {Comments, Offer} from '@/types/offer.ts';
import {SortType} from '@/constants/constants.ts';


export const getSortedOffers = ((data: Offer[], sortingType: string) => {
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

export const sortByDateDescending = (data: Comments): Comments =>
  data.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));

export const capitalizeFirstLetter = (str: string) =>
  str ? str[0].toUpperCase() + str.slice(1) : str;
