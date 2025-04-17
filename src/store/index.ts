import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import {createAPI} from '@/services/api.ts';
import {router} from '@/services/router';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api, router}
      },
    }),
});
