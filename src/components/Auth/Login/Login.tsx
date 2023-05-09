import { logInWithEmailAndPassword } from '@/services/authService';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginFormsFields, LoginProps, NotifyFunction } from './types';
import styles from './../Auth.module.scss';
import clsx from 'clsx';
import usePasswordVisibilityState from '@/hooks/usePasswordVisibilityState';
import { useTranslation } from 'react-i18next';
import sendNotification from '@/services/firebaseNotificationService';
import { toast } from 'react-toastify';

const Login = ({ activeRegisterOption }: LoginProps) => {
  const { t } = useTranslation(['translation', 'firebaseMessages']);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<LoginFormsFields>();
  const { passwordType, isPasswordVisible, setIsPasswordVisible } =
    usePasswordVisibilityState(false);

  const notify: NotifyFunction = (id, message, type) => {
    toast.update(id, {
      render: t(message, { ns: 'firebaseMessages' }),
      type,
      isLoading: false,
      autoClose: 1000,
    });
  };

  const onSubmit = async () => {
    const { email, password } = getValues();
    const id = toast(t('pending', { ns: 'firebaseMessages' }), { isLoading: true });
    const response = await logInWithEmailAndPassword(email, password);
    sendNotification(response.message, notify.bind(this, id), setError);
  };

  return (
    <>
      <div className={styles['auth__title-container']}>
        <h2 className={styles.auth__title}>{t('signInTitle')}</h2>
        <span className={styles['auth__link-container']}>
          {t('registerSuggestion')}{' '}
          <Link
            href="/auth?register=true"
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
          {...register('email')}
          placeholder={t('emailPlaceholder').toString()}
        />
        <p className={styles.form__error}>
          {errors.email?.message && t(errors.email.message, { ns: ['firebaseMessages'] })}
        </p>
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
          {errors.password?.message && t(errors.password.message, { ns: ['firebaseMessages'] })}
        </p>
        <div className={styles['form__textbox-container']}>
          <input type="submit" className={styles.form__button} value={t('signIn').toString()} />
        </div>
      </form>
    </>
  );
};

export default Login;
