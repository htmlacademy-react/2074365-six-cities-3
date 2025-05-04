import {mockComments, mockState} from '@/store/mock.ts';
import {NameSpace} from '@/constants/constants.ts';
import {
  getComments,
  getCommentsLoadingStatus,
  getCountComments,
  getErrorMessage,
  getReviewLoadingStatus
} from '@/store/comments-data/comments-data.selectors.ts';


describe('Comments selectors', () => {
  it('should get comments sorted by date (newest first) and limited', () => {
    const expected = [...mockComments]
      .sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()).slice(0, 10);

    expect(getComments(mockState)).toEqual(expected);
  });

  it('should get review loading status', () => {
    expect(getReviewLoadingStatus(mockState)).toBe(mockState[NameSpace.Comments].isReviewLoading);
  });

  it('should get count of comments', () => {
    expect(getCountComments(mockState)).toBe(mockState[NameSpace.Comments].countComments);
  });

  it('should get comments loading status', () => {
    expect(getCommentsLoadingStatus(mockState)).toBe(mockState[NameSpace.Comments].isCommentsLoading);
  });

  it('should get error message', () => {
    expect(getErrorMessage(mockState)).toBe(mockState[NameSpace.Comments].error);
  });
});
