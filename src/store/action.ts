import {createAction} from '@reduxjs/toolkit';
import {City, Comment, Comments, Offer, Offers} from '../types/offer';
import {Nullable} from 'vitest';
import {AppRoute, AuthorizationStatus} from '@/constants/constants.ts';
import {User} from '@/types/user.ts';

export const setCity = createAction<City>('main/setCity');

export const setSorting = createAction<string>('main/setSorting');

export const setActiveOfferId = createAction<Nullable<string>>('map/setActiveOfferId');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadFavorites = createAction<Offers>('data/loadFavorites');

export const loadOfferById = createAction<Offer>('data/loadOfferById');

export const loadNearestOffers = createAction<Offers>('data/nearestOffers');

export const loadComments = createAction<Comments>('data/loadComments');

export const addComment = createAction<Comment>('data/addComment');

export const setCountComments = createAction<number>('data/setCountComments');

export const setReviewRating = createAction<number>('data/setReviewRating');

export const setReviewComment = createAction<string>('data/setReviewComment');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const setNearestLoadingStatus = createAction<boolean>('data/setNearestLoadingStatus');

export const setCommentsLoadingStatus = createAction<boolean>('data/setCommentsLoadingStatus');

export const setReviewLoadingStatus = createAction<boolean>('data/setReviewLoadingStatus');

export const setAuthorizationStatus =
  createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setUser = createAction<User>('user/setUser');

export const setError = createAction<string | null>('app/setError');

export const redirectToRoute
  = createAction<AppRoute>('app/redirectToRoute');
