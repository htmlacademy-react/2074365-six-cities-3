import {JSX} from 'react';
import style from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={style.loadingScreen}>
      <div className={style.loadingScreen__spinner}></div>
      <p className={style.loadingScreen__text}>Загрузка...</p>
    </div>
  );
}

export default LoadingScreen;
