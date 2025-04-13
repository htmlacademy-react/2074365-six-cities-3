import {JSX} from 'react';
import HeaderNav from './components/header-nav.tsx';
import {Outlet, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import {AppRoute, AuthorizationStatusType} from '../constants/constants.ts';
import Footer from '../components/footer.tsx';
import Logo from 'components/logo.tsx';

function Layout({authorizationStatus}: { authorizationStatus: AuthorizationStatusType }): JSX.Element {
  const uri = useLocation();
  const isUriMain = AppRoute.Root === uri?.pathname;
  const isUriLogin = AppRoute.Login === uri?.pathname;
  const isUriFavorites = AppRoute.Favorites === uri?.pathname;

  return (
    <div className={clsx(
      'page',
      (isUriMain || isUriLogin) && 'page--gray',
      isUriMain && 'page--main',
      isUriLogin && 'page--login'
    )}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo logo='header' route={AppRoute.Root} width='81' height='41' isActive={isUriMain}/>
            </div>
            {!isUriLogin && <HeaderNav authorizationStatus={authorizationStatus}/>}
          </div>
        </div>
      </header>
      <Outlet/>
      {isUriFavorites && <Footer/>}
    </div>
  );
}

export default Layout;
