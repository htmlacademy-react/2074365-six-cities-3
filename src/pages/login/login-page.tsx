import {FormEvent, JSX, MouseEvent, useCallback, useRef} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '@/constants/constants.ts';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {loginAction} from '@/store/api-actions.ts';
import {toast} from 'react-toastify';
import {getAuthorizationStatus, selectLoginStatus} from '@/store/user-process/user-process.selectors.ts';
import {getRandomCity} from '@/utils/number-helper.ts';
import {setCity} from '@/store/main-data/main-data.slice.ts';
import {getErrorMessage} from '@/store/comments-data/comments-data.selectors.ts';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,15}$/;

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {isLoading} = useAppSelector(selectLoginStatus);
  const errorMessage = useAppSelector(getErrorMessage);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!loginRef.current || !passwordRef.current) {
      toast.error('Ошибка формы');
      return;
    }

    const email = loginRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!EMAIL_PATTERN.test(email)) {
      toast.error('Введите корректный email');
      return;
    }

    if (!PASSWORD_PATTERN.test(password)) {
      toast.error('Пароль должен содержать 9-15 символов, включая буквы и цифры');
      return;
    }

    dispatch(loginAction({email, password}))
      .unwrap()
      .then(() => navigate(AppRoute.Root))
      .catch(() => toast.error('Ошибка авторизации'));
  }, [dispatch, loginRef, passwordRef, navigate]);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root}/>;
  }

  const city = getRandomCity();
  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCity(city));
    navigate(AppRoute.Root);
  };

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#" method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sign in...' : 'Sign in'}
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" onClick={handleButtonClick}>
              <span>{city.name}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
