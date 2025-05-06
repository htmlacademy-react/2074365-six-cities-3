import {JSX} from 'react';
import HeaderNav from './components/header-nav-component.tsx';
import {Outlet, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import {AppRoute} from '../constants/constants.ts';
import Footer from 'components/footer-component.tsx';
import Logo from 'components/logo-component.tsx';
import {useAppSelector} from '@/hooks';
import {getCountFavorites} from '@/store/main-data/main-data.selectors.ts';

function Layout(): JSX.Element {
  const uri = useLocation();
  const isUriMain = String(AppRoute.Root) === uri?.pathname;
  const isUriLogin = String(AppRoute.Login) === uri?.pathname;
  const isUriFavorites = String(AppRoute.Favorites) === uri?.pathname;
  const favoritesCount = useAppSelector(getCountFavorites);

  return (
    <div className={clsx(
      'page',
      (isUriMain || isUriLogin) && 'page--gray',
      isUriMain && 'page--main',
      isUriLogin && 'page--login',
      isUriFavorites && favoritesCount === 0 && 'page--favorites-empty'
    )}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo logo='header' route={AppRoute.Root} width='81' height='41' isActive={isUriMain}/>
            </div>
            {!isUriLogin && <HeaderNav/>}
          </div>
        </div>
      </header>
      <Outlet/>
      {isUriFavorites && <Footer/>}
    </div>
  );
}

export default Layout;
