import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import clsx from 'clsx';
import { auth, registerWithEmailAndPassword } from '@/services/authService';
import { FormsFields, RegisterProps } from './types';
import styles from './../Auth.module.scss';
import { validationScheme } from './validationScheme';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';
import { ThreeDots } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';

const Register = ({ activeRegisterOption }: RegisterProps) => {
  const { t } = useTranslation(['validationMessages', 'translation']);
  const [isRegisterRequestSent, setIsRegisterRequestSent] = useState<boolean>(false);
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

  const onSubmit = async () => {
    const { name, email, password } = getValues();
    setIsRegisterRequestSent(true);
    await registerWithEmailAndPassword(name, email, password);
    setIsRegisterRequestSent(false);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>{t('signUp', { ns: ['translation'] })}</h2>
        <span className={styles['auth__link-container']}>
          {t('loginSuggestion', { ns: ['translation'] })}{' '}
          <Link
            href="/auth"
            className={styles['auth__link']}
            onClick={activeRegisterOption.bind(this, false)}
          >
            {t('signIn', { ns: ['translation'] })}.
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
          placeholder={t('namePlaceholder', { ns: ['translation'] }).toString()}
        />
        <p className={styles.form__error}>{errors.name?.message && t(errors.name.message)}</p>
        <input
          type="text"
          className={clsx(styles.form__textBox, styles['form__textbox-email'], {
            [styles.form__textBox_invalid]: errors.name?.message,
          })}
          {...register('email', validationScheme.email)}
          placeholder={t('emailPlaceholder', { ns: ['translation'] }).toString()}
        />
        <p className={styles.form__error}>{errors.email?.message && t(errors.email.message)}</p>
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
            placeholder={t('passwordPlaceholder', { ns: ['translation'] }).toString()}
          />
          <span
            className={styles[`password__icon-${passwordType}`]}
            onClick={setIsPasswordVisible.bind(this, !isPasswordVisible)}
          ></span>
        </div>
        <p className={styles.form__error}>
          {errors.password?.message && t(errors.password.message)}
        </p>
        <div className={styles['auth__textbox-container']}>
          <input
            type="submit"
            className={styles.form__button}
            value={t('signUpButton', { ns: ['translation'] }).toString()}
          />
        </div>
        <ThreeDots
          height="30"
          width="30"
          radius="4"
          color="white"
          wrapperClass={styles.auth__loader}
          visible={isRegisterRequestSent}
        />
      </form>
    </>
  );
};

export default Register;
