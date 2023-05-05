import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword } from '@/services/authService';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { LoginFormsFields, LoginProps } from './types';
import styles from './../Auth.module.scss';
import clsx from 'clsx';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';
import { ThreeDots } from 'react-loader-spinner';

const Login = ({ activeRegisterOption }: LoginProps) => {
  const [isLoginRequestSent, setIsLoginRequestSent] = useState<boolean>(false);
  const { register, handleSubmit, getValues } = useForm<LoginFormsFields>();
  const [, loading] = useAuthState(auth);
  const { passwordType, isPasswordVisible, setIsPasswordVisible } =
    usePasswordVisibilityState(false);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  const onSubmit = async () => {
    const { email, password } = getValues();
    setIsLoginRequestSent(true);
    await logInWithEmailAndPassword(email, password);
    setIsLoginRequestSent(false);
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
      <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.auth__form, styles.form)}>
        <input
          type="text"
          className={clsx(styles.form__textBox, styles['form__textbox-email'])}
          {...register('email')}
          placeholder="E-mail Address"
        />
        <p className={styles.form__error}></p>
        <div className={styles['form__textbox-container']}>
          <input
            type={passwordType}
            className={clsx(styles.form__textBox, styles['form__textbox-password'], 'password')}
            {...register('password')}
            placeholder="Password"
          />
          <span
            className={styles[`password__icon-${passwordType}`]}
            onClick={setIsPasswordVisible.bind(this, !isPasswordVisible)}
          ></span>
        </div>
        <p className={styles.form__error}></p>
        <div className={styles['form__textbox-container']}>
          <input type="submit" className={styles.form__button} value="Sign in" />
          <ThreeDots
            height="30"
            width="30"
            radius="4"
            color="white"
            wrapperClass={styles.auth__loader}
            visible={isLoginRequestSent}
          />
        </div>
      </form>
    </>
  );
};

export default Login;
