import {mockState} from '@/store/mock.ts';
import {NameSpace} from '@/constants/constants.ts';
import {
  getCity,
  getCountFavorites,
  getDataLoadingStatus,
  getError,
  getFavorites,
  getFilteredOffers,
  getOffers,
  getSorting
} from '@/store/main-data/main-data.selectors.ts';


describe('Main selectors', () => {
  it('should get city', () => {
    const city = getCity(mockState);
    expect(city).toBe(mockState[NameSpace.Main].city);
  });

  it('should get sorting', () => {
    expect(getSorting(mockState)).toBe(mockState[NameSpace.Main].sorting);
  });

  it('should get offers', () => {
    expect(getOffers(mockState)).toEqual(mockState[NameSpace.Main].offers);
  });

  it('should get favorites', () => {
    expect(getFavorites(mockState)).toEqual(mockState[NameSpace.Main].favorites);
  });

  it('should get count of favorites', () => {
    expect(getCountFavorites(mockState)).toBe(mockState[NameSpace.Main].favorites.length);
  });

  it('should get data loading status', () => {
    expect(getDataLoadingStatus(mockState)).toBe(mockState[NameSpace.Main].isDataLoading);
  });

  it('should get error', () => {
    expect(getError(mockState)).toBe(mockState[NameSpace.Main].error);
  });

  it('should get filtered offers', () => {
    expect(getFilteredOffers(mockState)).toEqual(
      mockState[NameSpace.Main].offers.filter((offer) =>
        offer.city.name === mockState[NameSpace.Main].city.name)
    );
  });
});
