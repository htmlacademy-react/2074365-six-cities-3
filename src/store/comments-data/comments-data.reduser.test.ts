import {commentsDataSlice} from '@/store/comments-data/comments-data.slice.ts';

const emptyAction = {type: ''};

const expectedState = {
  comments: [],
  countComments: 0,
  isCommentsLoading: false,
  isReviewLoading: false,
  error: null,
};

describe('commentsData Slice', () => {
  it('should return initial state with empty action', () => {
    const result = commentsDataSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = commentsDataSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});
