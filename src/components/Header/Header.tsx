import { clsx } from 'clsx';
import styles from './Header.module.scss';
import Image from 'next/image';
import logoImg from '@/assets/images/logo-small.svg';
import Link from 'next/link';
import { HeaderProps } from '@/components/Header/types';
import HeaderButton from '@/components/Header/HeaderButton/HeaderButton';
import { paths } from '@/enums/routerPaths';
import { logout } from '@/services/authService';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALES } from '@/i18n/locales';
import getNotificationType, { sendNotification } from '@/services/firebaseNotificationService';

const Header = ({ isLoggedIn }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleOnClick = async () => {
    const response = await logout();
    const { type, message } = await getNotificationType(response.message);
    sendNotification(type, t(message, { ns: 'firebaseMessages' }).toString());
  };

  return (
    <header className={clsx(styles.header)}>
      <Link href={paths.welcome} className={clsx(styles.header__logo)}>
        <Image src={logoImg} alt="logo" />
      </Link>
      <p className={clsx(styles.header__appName)}>GraphiQL App</p>
      <div className={clsx(styles.header__buttons)}>
        <select value={i18n.resolvedLanguage} name="lang" id="lang" onChange={handleOnChange}>
          {LOCALES.map((locale) => (
            <option value={locale.code} key={locale.code}>
              {locale.language}
            </option>
          ))}
        </select>
        {isLoggedIn ? (
          <>
            <HeaderButton link={paths.main} title={t('backToMain')} />
            <HeaderButton link={paths.welcome} title={t('logout')} onClick={handleOnClick} />
          </>
        ) : (
          <>
            <HeaderButton link={paths.signIn} title={t('signIn')} />
            <HeaderButton link={paths.signUp} title={t('signUp')} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
