import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import React from 'react';
import {fetchOffersAction} from '@/store/api-actions.ts';
import App from '@/app.tsx';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
