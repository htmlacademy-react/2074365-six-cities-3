import {JSX, MouseEvent} from 'react';
import {AppRoute, AuthorizationStatus} from '@/constants/constants.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {logoutAction} from '@/store/api-actions.ts';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const countFavorites = useAppSelector((state) => state.countFavorites);

  const handleClickOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth ? (
          <>
            <li className="header__nav-item user">
              <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                <div
                  className="header__avatar-wrapper user__avatar-wrapper"
                  style={{backgroundImage: `url(${userInfo?.avatarUrl || '../img/avatar.svg'})`}}
                />
                <span className="header__user-name user__name">{userInfo?.email}</span>
                <span className="header__favorite-count">{countFavorites}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="#" className="header__nav-link" onClick={handleClickOut}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"/>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
