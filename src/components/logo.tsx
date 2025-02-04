import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRouteType} from '@/constants/constants.tsx';
import clsx from 'clsx';

type LogoProps = {
  logo: string;
  route: AppRouteType;
  width: string;
  height: string;
  isActive: boolean;
}

function Logo({logo, route, width, height, isActive}: LogoProps): JSX.Element {

  return (
    <Link className={clsx(`${logo}__logo-link`, isActive && `${logo}__logo-link--active`)} to={route}>
      <img className={`${logo}__logo`} src="img/logo.svg" alt="6 cities logo" width={width} height={height}/>
    </Link>
  );
}

export default Logo;
