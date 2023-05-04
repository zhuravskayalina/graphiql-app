import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword } from '@/services/authService';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginProps } from './types';
import styles from './../Auth.module.scss';
import clsx from 'clsx';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';

const Login = ({ activeRegisterOption }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, loading] = useAuthState(auth);
  const { passwordType, isPasswordVisible, setIsPasswordVisible } =
    usePasswordVisibilityState(false);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  const handleOnClick = () => {
    activeRegisterOption(true);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>Sign in</h2>
        <span className={styles['auth__link-container']}>
          New to GraphiQL?{' '}
          <Link href="/auth?register=true" className={styles['auth__link']} onClick={handleOnClick}>
            Let&apos;s get started!
          </Link>
        </span>
      </div>
      <input
        type="text"
        className={clsx(styles.auth__textBox, styles['auth__textbox-email'])}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <p className={styles.auth__error}></p>
      <div className={styles['auth__textbox-container']}>
        <input
          type={passwordType}
          className={clsx(styles.auth__textBox, styles['auth__textbox-password'], 'password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <span
          className={styles[`password__icon-${passwordType}`]}
          onClick={setIsPasswordVisible.bind(this, !isPasswordVisible)}
        ></span>
      </div>
      <p className={styles.auth__error}></p>
      <button
        className={styles.auth__button}
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Sign in
      </button>
    </>
  );
};

export default Login;
