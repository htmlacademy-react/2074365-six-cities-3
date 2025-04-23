import {JSX} from 'react';
import style from './spinner.module.css';

function SpinnerComponent(): JSX.Element {
  return (
    <div className={style.spinner}>
      <div className={style.spinner__loading}></div>
      <p className={style.spinner__text}>Загрузка...</p>
    </div>
  );
}

export default SpinnerComponent;
