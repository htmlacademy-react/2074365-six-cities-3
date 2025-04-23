import {State} from '@/types/state';
import {Offer, Offers} from '@/types/offer.tsx';
import {NameSpace} from '@/constants/constants.ts';

const DEFAULT_START_INDEX = 0;
const NEAREST_OFFERS_COUNT = 3;

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].currentOffer;
export const getNearest = (state: State): Offers => state[NameSpace.Offer].nearestOffers.slice(DEFAULT_START_INDEX, NEAREST_OFFERS_COUNT);
export const getNearestLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isNearestLoading;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isDataLoading;
export const getError = (state: State): string | null => state[NameSpace.Offer].error;
