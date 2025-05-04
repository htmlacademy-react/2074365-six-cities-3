import {store} from '@/store';
import {AxiosInstance} from 'axios';
import {RouterType} from '@/services/router';
import {City, Comments, Offer, Offers} from '@/types/offer.ts';
import {Nullable} from 'vitest';
import {RequestStatus} from '@/types/user.ts';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
    router: RouterType;
  };
};

export type MainData = {
  offers: Offers;
  favorites: Offers;
  isDataLoading: boolean;
  error: string | null;
  city: City;
  sorting: string;
  offersLoadingStatus: RequestStatus;
}

export type OfferData = {
  currentOffer: Offer | null;
  nearestOffers: Offers;
  isDataLoading: boolean;
  isNearestLoading: boolean;
  error: string | null;
}

export type MapProcess = {
  activeOfferId: Nullable<string>;
}

export type CommentsProcess = {
  comments: Comments;
  countComments: number;
  isCommentsLoading: boolean;
  isReviewLoading: boolean;
  error: string | null;
}

export const FAVORITE_STATUS = {
  ADD: 1,
  REMOVE: 0,
} as const;
