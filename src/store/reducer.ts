import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {loadOffers, setActiveOfferId, setCity, setDataLoadingStatus, setSorting} from './action.ts';
import {Cities, SortType} from '../constants/constants.ts';
import {OfferDetails, Offers} from '@/types/offer.tsx';
import {Nullable} from 'vitest';

type OffersState = {
  city: typeof Cities[0];
  offers: Offers;
  detailOffers: OfferDetails;
  sorting: string;
  activeOfferId: Nullable<string>;
  isDataLoading: boolean;
}

const initialState: OffersState = {
  city: Cities[0],
  offers: [],
  detailOffers: [],
  sorting: SortType.Popular,
  activeOfferId: null,
  isDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(setSorting, (state, action) => {
    state.sorting = action.payload;
  });
  builder.addCase(setActiveOfferId, (state, action: PayloadAction<Nullable<string>>) => {
    state.activeOfferId = action.payload;
  });
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(setDataLoadingStatus, (state, action) => {
    state.isDataLoading = action.payload;
  });
});

export {reducer};
