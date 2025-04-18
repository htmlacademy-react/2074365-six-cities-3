import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkApiConfig} from '@/types/state.ts';
import log from 'loglevel';
import {
  addComment,
  loadComments,
  loadFavorites,
  loadNearestOffers,
  loadOfferById,
  loadOffers,
  redirectToRoute,
  setAuthorizationStatus,
  setCommentsLoadingStatus,
  setCountComments,
  setDataLoadingStatus,
  setNearestLoadingStatus,
  setReviewLoadingStatus,
  setUser
} from '@/store/action.ts';
import {Comment, Comments, Offer, Offers} from '@/types/offer.tsx';
import {ApiEndpoints, AppRoute, AuthorizationStatus} from '@/constants/constants.ts';
import {AuthData, User} from '@/types/user.ts';
import {dropToken, saveToken} from '@/services/token.ts';
import {sortByDateDescending} from '@/utils/sort-helper.ts';
import {generatePath} from 'react-router-dom';

export const fetchOffersAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: {api}}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offers>(ApiEndpoints.OFFERS);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'data/loadFavorites',
  async (_arg, {dispatch, extra: {api}}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offers>(ApiEndpoints.FAVORITE);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadFavorites(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, ThunkApiConfig>(
  'data/fetchOffer',
  async (offerId, {dispatch, extra: {api}}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offer>(generatePath(ApiEndpoints.OFFER, {offerId: offerId}));
    dispatch(loadOfferById(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, ThunkApiConfig>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: {api}}) => {
    dispatch(setNearestLoadingStatus(true));
    const {data} = await api.get<Offers>(generatePath(ApiEndpoints.NEARBY, {offerId: offerId}));
    dispatch(loadNearestOffers(data));
    dispatch(setNearestLoadingStatus(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, ThunkApiConfig>(
  'data/fetchComments',
  async (offerId, {dispatch, extra: {api}}) => {
    dispatch(setCommentsLoadingStatus(true));
    const {data} = await api.get<Comments>(generatePath(ApiEndpoints.COMMENTS, {offerId: offerId}));

    dispatch(loadComments(sortByDateDescending(data)));
    dispatch(setCountComments(data.length));
    dispatch(setCommentsLoadingStatus(false));
  },
);

type AddingCommentPayload = {
  'offerId': string;
  'comment': string;
  'rating': number;
}

export const addCommentAction = createAsyncThunk<void, AddingCommentPayload, ThunkApiConfig>(
  'data/addComment',
  async ({offerId, comment, rating}, {dispatch, extra: {api}}) => {
    dispatch(setReviewLoadingStatus(true));
    const {data} = await api.post<Comment>(generatePath(ApiEndpoints.COMMENTS, {offerId: offerId}), {comment, rating});
    dispatch(addComment(data));
    dispatch(setReviewLoadingStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: {api}}) => {
    try {
      const {data} = await api.get<User>(ApiEndpoints.LOGIN);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      dispatch(fetchFavoritesAction());
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkApiConfig>(
  'user/login',
  async ({email, password}, {dispatch, extra: {api, router}}) => {
    try {
      const {data} = await api.post<User>(ApiEndpoints.LOGIN, {email, password});
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(fetchFavoritesAction());
      dispatch(redirectToRoute(AppRoute.Favorites));
      await router.navigate(AppRoute.Root);
    } catch (err) {
      log.error(err);
      throw err;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/logout',
  async (_arg, {dispatch, extra: {api}}) => {
    await api.delete(ApiEndpoints.LOGOUT);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(loadFavorites([]));
  },
);
