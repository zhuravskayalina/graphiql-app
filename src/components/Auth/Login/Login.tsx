import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword } from '@/services/authService';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginProps } from './types';
import styles from './login.module.scss';

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
    <div className={styles.login}>
      <div className={styles.login__btn}>
        <input
          type="text"
          className={styles.login__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.login__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className={styles.login__btn}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <div>
          Don&apos;t have an account?{' '}
          <Link href="/auth" onClick={handleOnClick}>
            Register
          </Link>{' '}
          now.
        </div>
      </div>
    </div>
  );
};

export default Login;
