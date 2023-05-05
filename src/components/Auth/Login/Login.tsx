import { useEffect } from 'react';
import { auth, logInWithEmailAndPassword } from '@/services/authService';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { LoginFormsFields, LoginProps } from './types';
import styles from './../Auth.module.scss';
import clsx from 'clsx';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';

const Login = ({ activeRegisterOption }: LoginProps) => {
  const { register, handleSubmit, getValues } = useForm<LoginFormsFields>();
  const [, loading] = useAuthState(auth);
  const { passwordType, isPasswordVisible, setIsPasswordVisible } =
    usePasswordVisibilityState(false);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  const onSubmit = () => {
    const { email, password } = getValues();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>Sign in</h2>
        <span className={styles['auth__link-container']}>
          New to GraphiQL?{' '}
          <Link
            href="/auth?register=true"
            className={styles['auth__link']}
            onClick={activeRegisterOption.bind(this, true)}
          >
            Let&apos;s get started!
          </Link>
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={clsx(styles.auth__textBox, styles['auth__textbox-email'])}
          {...register('email')}
          placeholder="E-mail Address"
        />
        <p className={styles.auth__error}></p>
        <div className={styles['auth__textbox-container']}>
          <input
            type={passwordType}
            className={clsx(styles.auth__textBox, styles['auth__textbox-password'], 'password')}
            {...register('password')}
            placeholder="Password"
          />
          <span
            className={styles[`password__icon-${passwordType}`]}
            onClick={setIsPasswordVisible.bind(this, !isPasswordVisible)}
          ></span>
        </div>
        <p className={styles.auth__error}></p>
        <div className={styles['auth__textbox-container']}>
          <input type="submit" className={styles.auth__button} value="Sign in" />
        </div>
      </form>
    </>
  );
};

export default Login;
