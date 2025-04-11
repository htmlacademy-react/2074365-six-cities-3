import {JSX} from 'react';
import {AppRoute, AuthorizationStatus, AuthorizationStatusType} from '@/constants/constants.ts';
import {Link} from 'react-router-dom';

function HeaderNav({authorizationStatus}: { authorizationStatus: AuthorizationStatusType }): JSX.Element {

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {
              authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  <span className="header__favorite-count">3</span>
                </>
              ) : <span className="header__login">Sign in</span>
            }
          </Link>
        </li>
        {
          authorizationStatus === AuthorizationStatus.Auth ? (
            <li className="header__nav-item">
              <Link className="header__nav-link" to={AppRoute.Root}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          ) : null
        }
      </ul>
    </nav>
  );
}

export default HeaderNav;
