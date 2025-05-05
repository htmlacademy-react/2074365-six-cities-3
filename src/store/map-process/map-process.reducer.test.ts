import {mapProcessSlice, setActiveOfferId} from '@/store/map-process/map-process.slice.ts';
import {generateMockOffer} from '@/store/mock.ts';

const emptyAction = {type: ''};
const expectedState = {
  activeOfferId: null,
};


describe('MapProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const result = mapProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = mapProcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set ActiveCardId with "setActiveCardId" action', () => {
    const initialState = {
      activeOfferId: null,
    };

    const uuid = generateMockOffer().id;
    const result = mapProcessSlice.reducer(initialState, setActiveOfferId(uuid));

    expect(result.activeOfferId).toEqual(uuid);
  });
});
