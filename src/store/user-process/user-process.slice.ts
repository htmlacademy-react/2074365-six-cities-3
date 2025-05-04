import {AuthorizationStatus, NameSpace} from '@/constants/constants.ts';
import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, loginAction, logoutAction} from '@/store/api-actions.ts';
import {RequestStatus, User} from '@/types/user.ts';


type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  error: string | null;
  status: RequestStatus;
};

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  status: RequestStatus.Idle
};

export const userProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = 'Ошибка авторизации';
      })
      .addCase(loginAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.error = 'Неверный логин или пароль';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
