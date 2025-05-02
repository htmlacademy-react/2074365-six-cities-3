import {MainData} from '@/types/state.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CITIES, NameSpace, SortType} from '@/constants/constants.ts';
import {
  fetchFavoritesAction,
  fetchFavoritesStatusAction,
  fetchOffersAction,
  logoutAction
} from '@/store/api-actions.ts';
import {RequestStatus} from '@/types/user.ts';

const initialState: MainData = {
  city: CITIES[0],
  sorting: SortType.Popular,
  offers: [],
  favorites: [],
  isDataLoading: false,
  offersLoadingStatus: RequestStatus.Idle,
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoadingStatus = RequestStatus.Loading;
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = RequestStatus.Success;
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
      .addCase(logoutAction.fulfilled, (state) => {
        state.favorites = [];
      })
      .addCase(fetchFavoritesStatusAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
        }
      });
  }
});

export const {setCity, setSorting} = mainDataSlice.actions;
