import {createBrowserRouter} from 'react-router-dom';
import {AppRoute} from '@/constants/constants.ts';
import {HelmetProvider} from 'react-helmet-async';
import ScrollToTop from '../../layout/components/scroll-to-top.ts';
import Layout from '../../layout/layout.tsx';
import LoginPage from '../../pages/login/login-page.tsx';
import PrivateRoute from 'components/private-route.tsx';
import FavoritesPage from '../../pages/favorites/favorites-page.tsx';
import Offer from '../../pages/offer/offer-page.tsx';
import PageNotFound from '../../pages/error/page-not-found.tsx';
import MainPage from '../../pages/main/main-page.tsx';

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
        element: <MainPage/>,
      },
      {
        path: AppRoute.Login,
        element: <LoginPage/>,
      },
      {
        path: AppRoute.Favorites,
        element: (
          <PrivateRoute>
            <FavoritesPage/>
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
