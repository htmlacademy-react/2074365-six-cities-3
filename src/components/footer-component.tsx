import {JSX, memo} from 'react';
import {AppRoute} from '../constants/constants.ts';
import Logo from 'components/logo-component.tsx';

function FooterComponent(): JSX.Element {

  return (
    <footer className="footer container">
      <Logo logo='footer' route={AppRoute.Root} width='64' height='33' isActive={false}/>
    </footer>
  );
}

const Footer = memo(FooterComponent);
export default Footer;
