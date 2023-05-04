import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import clsx from 'clsx';
import { auth, registerWithEmailAndPassword } from '@/services/authService';
import { FormsFields, RegisterProps } from './types';
import styles from './../Auth.module.scss';
import { validationScheme } from './validationScheme';

const Register = ({ activeRegisterOption }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormsFields>();
  const [user, loading, error] = useAuthState(auth);
  console.log(errors);

  const onSubmit = () => {
    const { name, email, password } = getValues();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={clsx(styles.auth__textBox, styles['auth__textbox-name'])}
          {...register('name', validationScheme.name)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={clsx(styles.auth__textBox, styles['auth__textbox-email'])}
          {...register('email', validationScheme.email)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={clsx(styles.auth__textBox, styles['auth__textbox-password'])}
          {...register('password', validationScheme.password)}
          placeholder="Password"
        />
        <input type="submit" className={styles.auth__button} value={'Sign up'} />
      </form>
    </>
  );
};

export default Register;
