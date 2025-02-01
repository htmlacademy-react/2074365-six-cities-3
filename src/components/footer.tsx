import {JSX} from 'react';
import {AppRoute} from '../constants/constants.tsx';
import Logo from 'components/logo.tsx';

function Footer(): JSX.Element {

  return (
    <footer className="footer container">
      <Logo logo='footer' route={AppRoute.Root} width='64' height='33' isActive={false}/>
    </footer>
  );
}

export default Footer;
