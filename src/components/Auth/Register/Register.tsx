import { useForm } from 'react-hook-form';
import Link from 'next/link';
import clsx from 'clsx';
import { registerWithEmailAndPassword } from '@/services/authService';
import { FormsFields, RegisterProps } from './types';
import styles from './../Auth.module.scss';
import { validationScheme } from './validationScheme';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';
import { useTranslation } from 'next-i18next';
import getNotificationType, { sendNotification } from '@/services/firebaseNotificationService';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Register = ({ activeRegisterOption }: RegisterProps) => {
  const { locale } = useRouter();
  const [isLoginRequestSent, setIsRegisterRequestSent] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({ reValidateMode: 'onSubmit' });
  const { passwordType, isPasswordVisible, setIsPasswordVisible } =
    usePasswordVisibilityState(false);

  const onSubmit = async () => {
    const { name, email, password } = getValues();
    setIsRegisterRequestSent(true);
    const response = await registerWithEmailAndPassword(name, email, password);
    setIsRegisterRequestSent(false);
    const { type, message } = await getNotificationType(response.message);
    sendNotification(type, t(message, { ns: 'firebaseMessages' }).toString(), setError);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>{t('signUp')}</h2>
        <span className={styles['auth__link-container']}>
          {t('loginSuggestion')}{' '}
          <Link
            href="/auth"
            locale={locale}
            className={styles['auth__link']}
            onClick={activeRegisterOption.bind(this, false)}
          >
            {t('signIn')}.
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
          placeholder={t('namePlaceholder').toString()}
        />
        <p className={styles.form__error}>{errors.name?.message && t(errors.name.message)}</p>
        <input
          type="text"
          className={clsx(styles.form__textBox, styles['form__textbox-email'], {
            [styles.form__textBox_invalid]: errors.email?.message,
          })}
          {...register('email', validationScheme.email)}
          placeholder={t('emailPlaceholder').toString()}
        />
        <p className={styles.form__error}>{errors.email?.message && t(errors.email.message)}</p>
        <div className={styles['form__textbox-container']}>
          <input
            type={passwordType}
            className={clsx(
              styles.form__textBox,
              styles['form__textbox-password'],
              {
                [styles.form__textBox_invalid]: errors.password?.message,
              },
              'password'
            )}
            {...register('password', validationScheme.password)}
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
        <div className={styles['auth__textbox-container']}>
          <input
            type="submit"
            className={styles.form__button}
            value={t('signUpButton').toString()}
          />
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

export default Register;
