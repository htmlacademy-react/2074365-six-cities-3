import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '@/types/state.ts';
import {AxiosInstance} from 'axios';
import {loadOffers, setDataLoadingStatus} from '@/store/action.ts';
import {Offers} from '@/types/offer.tsx';
import {ApiEndpoints} from '@/constants/constants.ts';

export const fetchOffersAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offers>(ApiEndpoints.OFFERS);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);
