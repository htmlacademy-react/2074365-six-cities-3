import {
  getNearest,
  getNearestLoadingStatus,
  getOffer,
  getOfferLoadingStatus
} from '@/store/offer-data/offer-data.selectors.ts';
import {NameSpace} from '@/constants/constants.ts';
import {mockState} from '@/store/mock.ts';


describe('Offer selectors', () => {

  it('should get current offer', () => {
    expect(getOffer(mockState)).toEqual(mockState[NameSpace.Offer].currentOffer);
  });

  it('should get nearest offers', () => {
    expect(getNearest(mockState)).toEqual(mockState[NameSpace.Offer].nearestOffers.slice(0, 3));
  });

  it('should get nearest loading status', () => {
    expect(getNearestLoadingStatus(mockState)).toBe(mockState[NameSpace.Offer].isNearestLoading);
  });

  it('should get offer loading status', () => {
    expect(getOfferLoadingStatus(mockState)).toBe(mockState[NameSpace.Offer].isDataLoading);
  });
});
