import {OfferData} from '@/types/state.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants/constants.ts';
import {fetchFavoritesStatusAction, fetchNearbyOffersAction, fetchOfferAction} from '@/store/api-actions.ts';

const initialState: OfferData = {
  currentOffer: null,
  nearestOffers: [],
  isDataLoading: false,
  isNearestLoading: false,
  error: null,
};


export const offerDataSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.error = 'Ошибка загрузки';
        state.isDataLoading = false;
      })
      .addCase(fetchFavoritesStatusAction.fulfilled, (state, action) => {
        if (state.currentOffer) {
          state.currentOffer.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearestLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearestOffers = action.payload;
        state.isNearestLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.error = 'Ошибка загрузки';
        state.isNearestLoading = false;
      });
  }
});
