import styles from './Header.module.scss';
import Image from 'next/image';
import logoImg from '@/assets/images/logo-small.svg';
import Link from 'next/link';
import nookies from 'nookies';
import HeaderButton from '@/components/Header/HeaderButton/HeaderButton';
import { paths } from '@/enums/routerPaths';
import { auth, logout } from '@/services/authService';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import getNotificationType, { sendNotification } from '@/services/firebaseNotificationService';
import LanguageToggle from './LanguageToggle/LanguageToggle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [user, loading] = useAuthState(auth);
  const [isSticky, setSticky] = useState(false);

  const HEIGHT_50 = 50;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY > HEIGHT_50) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const language = e.target.checked ? e.currentTarget?.value : 'en';
    const path = router.asPath;
    router.push(path, path, { locale: language });
    nookies.set(undefined, 'lang', language, { path: '/' });
  };

  const handleOnClick = async (e: Event) => {
    e.preventDefault();
    const response = await logout();
    const { type, message } = await getNotificationType(response.message);
    sendNotification(type, t(message, { ns: 'firebaseMessages' }).toString());
  };

  return (
    <header className={clsx(styles.header, styles.sticky, isSticky && styles.onScroll)}>
      <Link href={paths.welcome} locale={router.locale} className={styles.header__logo}>
        <Image src={logoImg} alt="logo" className={styles.header__logoIcon} />
      </Link>
      <p className={styles.header__appName}>GraphiQL App</p>
      {!loading && (
        <div className={styles.header__buttons}>
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
          <LanguageToggle changeLanguage={handleLanguageChange} language={i18n.language} />
        </div>
      )}
    </header>
  );
};

export default Header;
