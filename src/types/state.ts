import {store} from '@/store';
import {AxiosInstance} from 'axios';
import {RouterType} from '@/services/router';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
    router: RouterType;
  };
};
