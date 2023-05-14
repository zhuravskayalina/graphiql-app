import styles from './Header.module.scss';
import Image from 'next/image';
import logoImg from '@/assets/images/logo-small.svg';
import Link from 'next/link';
import HeaderButton from '@/components/Header/HeaderButton/HeaderButton';
import { paths } from '@/enums/routerPaths';
import { auth, logout } from '@/services/authService';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import getNotificationType, { sendNotification } from '@/services/firebaseNotificationService';
import LanguageToggle from './LanguageToggle/LanguageToggle';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [user, loading] = useAuthState(auth);

  const handleLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const language = e.target.checked ? e.currentTarget?.value : 'default';
    i18n.changeLanguage(language);
  };

  const handleOnClick = async () => {
    const response = await logout();
    const { type, message } = await getNotificationType(response.message);
    sendNotification(type, t(message, { ns: 'firebaseMessages' }).toString());
  };

  return (
    <header className={styles.header}>
      <Link href={paths.welcome} className={styles.header__logo}>
        <Image src={logoImg} alt="logo" />
      </Link>
      <p className={styles.header__appName}>GraphiQL App</p>
      {!loading && (
        <div className={styles.header__buttons}>
          <LanguageToggle changeLanguage={handleLanguageChange} />
          {user ? (
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
      )}
    </header>
  );
};

export default Header;
