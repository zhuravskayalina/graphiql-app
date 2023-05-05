import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import clsx from 'clsx';
import { auth, registerWithEmailAndPassword } from '@/services/authService';
import { FormsFields, RegisterProps } from './types';
import styles from './../Auth.module.scss';
import { validationScheme } from './validationScheme';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';

const Register = ({ activeRegisterOption }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormsFields>({ reValidateMode: 'onSubmit' });
  const [, loading] = useAuthState(auth);
  const { passwordType, isPasswordVisible, setIsPasswordVisible } =
    usePasswordVisibilityState(false);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  const onSubmit = () => {
    const { name, email, password } = getValues();
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>Sign up</h2>
        <span className={styles['auth__link-container']}>
          Already have an account?{' '}
          <Link
            href="/auth"
            className={styles['auth__link']}
            onClick={activeRegisterOption.bind(this, false)}
          >
            Sign in.
          </Link>
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.auth__form, styles.form)}>
        <input
          type="text"
          className={clsx(styles.form__textBox, styles['form__textbox-name'], {
            [styles.form__textBox_invalid]: errors.name?.message,
          })}
          {...register('name', validationScheme.name)}
          placeholder="Full Name*"
        />
        <p className={styles.form__error}>{errors.name?.message}</p>
        <input
          type="text"
          className={clsx(styles.form__textBox, styles['form__textbox-email'], {
            [styles.form__textBox_invalid]: errors.name?.message,
          })}
          {...register('email', validationScheme.email)}
          placeholder="E-mail Address*"
        />
        <p className={styles.form__error}>{errors.email?.message}</p>
        <div className={styles['form__textbox-container']}>
          <input
            type={passwordType}
            className={clsx(
              styles.form__textBox,
              styles['form__textbox-password'],
              {
                [styles.form__textBox_invalid]: errors.name?.message,
              },
              'password'
            )}
            {...register('password', validationScheme.password)}
            placeholder="Password*"
          />
          <span
            className={styles[`password__icon-${passwordType}`]}
            onClick={setIsPasswordVisible.bind(this, !isPasswordVisible)}
          ></span>
        </div>
        <p className={styles.form__error}>{errors.password?.message}</p>
        <input type="submit" className={styles.form__button} value={'Sign up'} />
      </form>
    </>
  );
};

export default Register;
