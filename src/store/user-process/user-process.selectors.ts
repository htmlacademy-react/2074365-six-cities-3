import {State} from '@/types/state';
import {AuthorizationStatus, NameSpace} from '@/constants/constants.ts';
import {RequestStatus, User} from '@/types/user.ts';
import {createSelector} from '@reduxjs/toolkit';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUser = (state: State): User | null => state[NameSpace.User].user;

export const getStatus = (state: State): RequestStatus => state[NameSpace.User].status;

export const selectLoginStatus = createSelector([getStatus], (status) => ({
  isLoading: status === RequestStatus.Loading,
  isSuccess: status === RequestStatus.Success,
}));
