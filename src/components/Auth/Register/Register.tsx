import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { auth, registerWithEmailAndPassword } from '@/services/authService';
import { RegisterProps } from './types';
import styles from './../Auth.module.scss';

function Register({ activeRegisterOption }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  const handleOnClick = () => {
    activeRegisterOption(false);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>Sign up</h2>
        <span className={styles['auth__link-container']}>
          Already have an account?{' '}
          <Link href="/auth" className={styles['auth__link']} onClick={handleOnClick}>
            Sign in.
          </Link>
        </span>
      </div>
      <input
        type="text"
        className={styles.auth__textBox}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        className={styles.auth__textBox}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className={styles.auth__textBox}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className={styles.auth__button} onClick={register}>
        Sign up
      </button>
    </>
  );
}
export default Register;
