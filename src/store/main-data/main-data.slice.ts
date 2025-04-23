import {MainData} from '@/types/state.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cities, NameSpace, SortType} from '@/constants/constants.ts';
import {fetchFavoritesAction, fetchFavoritesStatusAction, fetchOffersAction} from '@/store/api-actions.ts';

const NOT_FOUND_INDEX = -1;
const INCREMENT_VALUE = 1;

const initialState: MainData = {
  city: Cities[0],
  sorting: SortType.Popular,
  offers: [],
  favorites: [],
  isDataLoading: false,
  error: null,
};

export const mainDataSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<MainData['city']>) {
      state.city = action.payload;
    },
    setSorting(state, action: PayloadAction<string>) {
      state.sorting = action.payload;
    },
    resetFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = 'Ошибка загрузки';
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = 'Ошибка загрузки';
      })
      .addCase(fetchFavoritesStatusAction.fulfilled, (state, action) => {
        const indexOffers = state.offers.findIndex((offer) => offer.id === action.payload.id);
        if (indexOffers !== NOT_FOUND_INDEX) {
          state.offers[indexOffers].isFavorite = action.payload.isFavorite;
        }
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          const index = state.favorites.findIndex((favorite) => favorite.id === action.payload.id);
          if (index !== NOT_FOUND_INDEX) {
            state.favorites.splice(index, INCREMENT_VALUE);
          }
        }
      });
  }
});

export const {setCity, setSorting, resetFavorites} = mainDataSlice.actions;
