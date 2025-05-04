import {CITIES, SortType} from '@/constants/constants.ts';
import {mainDataSlice, setCity, setSorting} from '@/store/main-data/main-data.slice.ts';
import {RequestStatus} from '@/types/user.ts';


const emptyAction = {type: ''};

const initialState = {
  city: CITIES[0],
  sorting: SortType.Popular,
  offers: [],
  favorites: [],
  isDataLoading: false,
  offersLoadingStatus: RequestStatus.Idle,
  error: null,
};

const expectedState = {
  city: CITIES[0],
  sorting: SortType.Popular,
  offers: [],
  favorites: [],
  isDataLoading: false,
  offersLoadingStatus: RequestStatus.Idle,
  error: null,
};

describe('MainData Slice', () => {
  it('should return initial state with empty action', () => {
    const result = mainDataSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = mainDataSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set sorting with "setSorting" action', () => {
    const result = mainDataSlice.reducer(initialState, setSorting(SortType.PriceDescending));
    expect(result.sorting).toEqual(SortType.PriceDescending);
  });

  it('should set city with "setCity" action', () => {
    const result = mainDataSlice.reducer(initialState, setCity(CITIES[2]));
    expect(result.city).toEqual(CITIES[2]);
  });
});
