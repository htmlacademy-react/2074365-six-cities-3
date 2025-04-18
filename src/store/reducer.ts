import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  addComment,
  loadComments,
  loadFavorites,
  loadNearestOffers,
  loadOfferById,
  loadOffers,
  setActiveOfferId,
  setAuthorizationStatus,
  setCity,
  setCommentsLoadingStatus,
  setCountComments,
  setDataLoadingStatus,
  setError,
  setNearestLoadingStatus,
  setReviewLoadingStatus,
  setSorting,
  setUser
} from './action.ts';
import {AuthorizationStatus, Cities, SortType} from '../constants/constants.ts';
import {Comments, Offer, Offers} from '@/types/offer.tsx';
import {Nullable} from 'vitest';
import {User} from '@/types/user.ts';


type OffersState = {
  city: typeof Cities[0];
  offers: Offers;
  favorites: Offers;
  currentOffer: Offer | null;
  nearestOffers: Offers;
  countFavorites: number;
  comments: Comments;
  countComments: number;
  sorting: string;
  activeOfferId: Nullable<string>;
  isDataLoading: boolean;
  isNearestLoading: boolean;
  isCommentsLoading: boolean;
  isReviewLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  error: string | null;
}

const initialState: OffersState = {
  city: Cities[0],
  offers: [],
  favorites: [],
  currentOffer: null,
  nearestOffers: [],
  countFavorites: 0,
  comments: [],
  countComments: 0,
  sorting: SortType.Popular,
  activeOfferId: null,
  isDataLoading: false,
  isNearestLoading: false,
  isCommentsLoading: false,
  isReviewLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setActiveOfferId, (state, action: PayloadAction<Nullable<string>>) => {
      state.activeOfferId = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
      state.countFavorites = state.favorites.length;
    })
    .addCase(loadOfferById, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCountComments, (state, action) => {
      state.countComments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments.splice(0, 0, action.payload);
      state.countComments++;
    })
    .addCase(loadNearestOffers, (state, action) => {
      state.nearestOffers = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setNearestLoadingStatus, (state, action) => {
      state.isNearestLoading = action.payload;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setReviewLoadingStatus, (state, action) => {
      state.isReviewLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
