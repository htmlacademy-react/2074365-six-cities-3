import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api.ts';
import {router} from '@/services/router';
import {rootReducer} from '@/store/root-reducer.ts';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api, router}
      },
    }),
});
