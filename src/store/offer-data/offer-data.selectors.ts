import {State} from '@/types/state';
import {Offer, Offers} from '@/types/offer.ts';
import {NameSpace} from '@/constants/constants.ts';
import {createSelector} from '@reduxjs/toolkit';

const DEFAULT_START_INDEX = 0;
const NEAREST_OFFERS_COUNT = 3;

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].currentOffer;
export const getNearestLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isNearestLoading;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isDataLoading;
export const getAllNearest = (state: State): Offers => state[NameSpace.Offer].nearestOffers;
export const getNearest = createSelector([getAllNearest], (nearestOffers) =>
  nearestOffers.slice(DEFAULT_START_INDEX, NEAREST_OFFERS_COUNT));
