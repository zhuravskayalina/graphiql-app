import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { auth, registerWithEmailAndPassword } from '@/services/authService';
import { RegisterProps } from './types';
import styles from './register.module.scss';

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
    <div className={styles.register}>
      <div className={styles.register__container}>
        <input
          type="text"
          className={styles.register__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={styles.register__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.register__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className={styles.register__btn} onClick={register}>
          Register
        </button>
        <div>
          Already have an account?{' '}
          <Link href="/auth" onClick={handleOnClick}>
            Login
          </Link>{' '}
          now.
        </div>
      </div>
    </div>
  );
}
export default Register;
