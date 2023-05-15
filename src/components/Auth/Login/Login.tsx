import { logInWithEmailAndPassword } from '@/services/authService';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginFormsFields, LoginProps } from './types';
import styles from './../Auth.module.scss';
import clsx from 'clsx';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';
import { useTranslation } from 'next-i18next';
import getNotificationType, { sendNotification } from '@/services/firebaseNotificationService';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = ({ activeRegisterOption }: LoginProps) => {
  const { locale } = useRouter();
  const [isLoginRequestSent, setIsLoginRequestSent] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<LoginFormsFields>();
  const { passwordType, isPasswordVisible, setIsPasswordVisible } =
    usePasswordVisibilityState(false);

  const onSubmit = async () => {
    const { email, password } = getValues();
    setIsLoginRequestSent(true);
    const response = await logInWithEmailAndPassword(email, password);
    setIsLoginRequestSent(false);
    const { type, message } = await getNotificationType(response.message);
    sendNotification(type, t(message).toString(), setError);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>{t('signInTitle')}</h2>
        <span className={styles['auth__link-container']}>
          {t('registerSuggestion')}{' '}
          <Link
            href="/auth?register=true"
            locale={locale}
            className={styles['auth__link']}
            onClick={activeRegisterOption.bind(this, true)}
          >
            {t('signUpLink')}
          </Link>
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.auth__form, styles.form)}>
        <input
          type="text"
          className={clsx(styles.form__textBox, styles['form__textbox-email'], {
            [styles.form__textBox_invalid]: errors.email?.message,
          })}
          {...(true && { ...register('email') })}
          placeholder={t('emailPlaceholder').toString()}
        />
        <p className={styles.form__error}>{errors.email?.message && t(errors.email.message)}</p>
        <div className={styles['form__textbox-container']}>
          <input
            type={passwordType}
            className={clsx(styles.form__textBox, styles['form__textbox-password'], 'password', {
              [styles.form__textBox_invalid]: errors.password?.message,
            })}
            {...register('password')}
            placeholder={t('passwordPlaceholder').toString()}
          />
          <span
            className={styles[`password__icon-${passwordType}`]}
            onClick={setIsPasswordVisible.bind(this, !isPasswordVisible)}
          ></span>
        </div>
        <p className={styles.form__error}>
          {errors.password?.message && t(errors.password.message)}
        </p>
        <div className={styles['form__textbox-container']}>
          <input type="submit" className={styles.form__button} value={t('signIn').toString()} />
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
