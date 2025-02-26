import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import getAuthorizationStatus from '../mock/authorization-status.ts';
import {AppRoute} from '../constants/constants.tsx';
import {HelmetProvider} from 'react-helmet-async';
import ScrollToTop from '../layout/components/scroll-to-top.ts';
import Layout from '../layout/layout.tsx';
import Main from '../pages/main/main.tsx';
import Login from '../pages/login/login.tsx';
import PrivateRoute from 'src/components/private-route.tsx';
import Favorites from '../pages/favorites/favorites.tsx';
import Offer from '../pages/offer/offer.tsx';
import PageNotFound from '../pages/error/page-not-found.tsx';

const authorizationStatus = getAuthorizationStatus();

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: (
      <HelmetProvider>
        <ScrollToTop/>
        <Layout authorizationStatus={authorizationStatus}/>
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
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <Favorites/>
          </PrivateRoute>
        ),
      },
      {
        path: AppRoute.Offer,
        element: <Offer authorizationStatus={authorizationStatus}/>,
      },
      {
        path: '*',
        element: <PageNotFound/>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
