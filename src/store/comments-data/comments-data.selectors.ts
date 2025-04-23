import {State} from '@/types/state';
import {NameSpace} from '@/constants/constants.ts';
import {Comments} from '@/types/offer.tsx';

const DEFAULT_START_INDEX = 0;
const MAX_COMMENTS_COUNT = 10;

export const getComments = (state: State): Comments => state[NameSpace.Comments].comments.slice(DEFAULT_START_INDEX, MAX_COMMENTS_COUNT);
export const getReviewLoadingStatus = (state: State): boolean => state[NameSpace.Comments].isReviewLoading;
export const getCountComments = (state: State): number => state[NameSpace.Comments].countComments;
export const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.Comments].isCommentsLoading;
export const getErrorMessage = (state: State): string | null => state[NameSpace.Comments].error;
