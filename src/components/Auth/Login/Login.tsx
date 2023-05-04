import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword } from '@/services/authService';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginProps } from './types';
import styles from './../Auth.module.scss';
import clsx from 'clsx';

const Login = ({ activeRegisterOption }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
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
      <input
        type="password"
        className={clsx(styles.auth__textBox, styles['auth__textbox-password'])}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
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
