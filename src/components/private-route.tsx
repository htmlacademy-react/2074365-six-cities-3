import {AppRoute, AuthorizationStatus} from '../constants/constants.ts';
import {JSX} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '@/hooks';
import {getAuthorizationStatus} from '@/store/user-process/user-process.selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
