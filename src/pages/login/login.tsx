import {FormEvent, JSX, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '@/constants/constants.ts';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch} from '@/hooks';
import {loginAction} from '@/store/api-actions.ts';
import {toast} from 'react-toastify';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,15}$/;

function Login(): JSX.Element {

  const [isLoading, setIsLoading] = useState(false);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
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

    setIsLoading(true);

    dispatch(loginAction({email, password}))
      .unwrap()
      .then(() => navigate(AppRoute.Root))
      .catch(() => toast.error('Ошибка авторизации'))
      .finally(() => setIsLoading(false));
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
            <Link className="locations__item-link" to={AppRoute.Root}>
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
