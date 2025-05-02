import {createAsyncThunk} from '@reduxjs/toolkit';
import {FAVORITE_STATUS, ThunkApiConfig} from '@/types/state.ts';
import {redirectToRoute} from '@/store/action.ts';
import {Comment, Comments, Offer, Offers} from '@/types/offer.tsx';
import {ApiEndpoints, AppRoute} from '@/constants/constants.ts';
import {AuthData, User} from '@/types/user.ts';
import {dropToken, saveToken} from '@/services/token.ts';
import {sortByDateDescending} from '@/utils/sort-helper.ts';
import {generatePath} from 'react-router-dom';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, ThunkApiConfig>(
  'data/fetchOffers',
  async (_arg, {extra: {api}}) => {
    const {data} = await api.get<Offers>(ApiEndpoints.OFFERS);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, ThunkApiConfig>(
  'data/loadFavorites',
  async (_arg, {extra: {api}}) => {
    const {data} = await api.get<Offers>(ApiEndpoints.FAVORITE);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, string, ThunkApiConfig>(
  'data/fetchOffer',
  async (offerId, {extra: {api}}) => {
    const {data} = await api.get<Offer>(generatePath(ApiEndpoints.OFFER, {offerId: offerId}));
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offers, string, ThunkApiConfig>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: {api}}) => {
    const {data} = await api.get<Offers>(generatePath(ApiEndpoints.NEARBY, {offerId: offerId}));
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comments, string, ThunkApiConfig>(
  'data/fetchComments',
  async (offerId, {extra: {api}}) => {
    const {data} = await api.get<Comments>(generatePath(ApiEndpoints.COMMENTS, {offerId: offerId}));
    return sortByDateDescending(data);
  },
);

type FavoriteStatusPayload = {
  'offerId': string;
  'isFavorite': boolean;
};

export const fetchFavoritesStatusAction = createAsyncThunk<Offer, FavoriteStatusPayload, ThunkApiConfig>(
  'data/fetchFavoritesStatus',
  async ({offerId, isFavorite}, {extra: {api}}) => {
    const {data} = await api.post<Offer>(
      generatePath(ApiEndpoints.FAVORITE_STATUS, {
        offerId: offerId,
        status: isFavorite ? FAVORITE_STATUS.ADD : FAVORITE_STATUS.REMOVE
      })
    );
    return (data);
  },
);

type AddingCommentPayload = {
  'offerId': string;
  'comment': string;
  'rating': number;
}

export const addCommentAction = createAsyncThunk<Comment, AddingCommentPayload, ThunkApiConfig>(
  'data/addComment',
  async ({offerId, comment, rating}, {extra: {api}}) => {
    const {data} = await api.post<Comment>(generatePath(ApiEndpoints.COMMENTS, {offerId: offerId}), {comment, rating});
    return (data);
  },
);

export const checkAuthAction = createAsyncThunk<User, undefined, ThunkApiConfig>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: {api}}) => {
    const {data} = await api.get<User>(ApiEndpoints.LOGIN);
    dispatch(fetchFavoritesAction());
    return data;
  },
);

export const loginAction = createAsyncThunk<User, AuthData, ThunkApiConfig>(
  'user/login',
  async ({email, password}, {dispatch, extra: {api, router}}) => {
    const {data} = await api.post<User>(ApiEndpoints.LOGIN, {email, password});
    saveToken(data.token);
    dispatch(fetchFavoritesAction());
    dispatch(redirectToRoute(AppRoute.Favorites));
    await router.navigate(AppRoute.Root);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/logout',
  async (_arg, {dispatch, extra: {api}}) => {
    await api.delete(ApiEndpoints.LOGOUT);
    dropToken();
    dispatch(fetchOffersAction());
  },
);
