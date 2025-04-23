import {JSX, memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants/constants.ts';
import clsx from 'clsx';

type LogoProps = {
  logo: string;
  route: AppRoute;
  width: string;
  height: string;
  isActive: boolean;
}

function LogoComponent({logo, route, width, height, isActive}: LogoProps): JSX.Element {

  return (
    <Link className={clsx(`${logo}__logo-link`, isActive && `${logo}__logo-link--active`)} to={route}>
      <img className={`${logo}__logo`} src="img/logo.svg" alt="6 cities logo" width={width} height={height}/>
    </Link>
  );
}

const Logo = memo(LogoComponent);
export default Logo;
