import {createBrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '@/constants/constants.ts';
import {HelmetProvider} from 'react-helmet-async';
import ScrollToTop from '../../layout/components/scroll-to-top.ts';
import Layout from '../../layout/layout.tsx';
import Main from '../../pages/main/main.tsx';
import Login from '../../pages/login/login.tsx';
import PrivateRoute from 'components/private-route.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import Offer from '../../pages/offer/offer.tsx';
import PageNotFound from '../../pages/error/page-not-found.tsx';

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: (
      <HelmetProvider>
        <ScrollToTop/>
        <Layout/>
      </HelmetProvider>
    ),
    children: [
      {
        index: true,
        element: <Main/>,
      },
      {
        path: AppRoute.Login,
        element: <Login/>,
      },
      {
        path: AppRoute.Favorites,
        element: (
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <Favorites/>
          </PrivateRoute>
        ),
      },
      {
        path: AppRoute.Offer,
        element: <Offer/>,
      },
      {
        path: '*',
        element: <PageNotFound/>,
      },
    ],
  },
]);

export type RouterType = typeof router;
export {router};
