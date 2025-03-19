import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {setActiveOfferId, setCity, setSorting} from './action.ts';
import {Cities, SortType} from '../constants/constants.tsx';
import {offersMock} from '../mock/offers-mock.tsx';
import {OfferDetail, OfferListItem} from '@/types/offer.tsx';
import {Nullable} from 'vitest';
import {offerDetailMock} from '@/mock/offer-detail-mock.tsx';

type OffersState = {
  city: typeof Cities[0];
  offers: OfferListItem[];
  detailOffers: OfferDetail[];
  sorting: string;
  activeOfferId: Nullable<string>;
}

const initialState: OffersState = {
  city: Cities[0],
  offers: offersMock,
  detailOffers: offerDetailMock,
  sorting: SortType.Popular,
  activeOfferId: null
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
});

export {reducer};
