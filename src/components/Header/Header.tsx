import { clsx } from 'clsx';
import styles from './Header.module.scss';
import Image from 'next/image';
import logoImg from '@/assets/images/logo-small.svg';
import Link from 'next/link';
import { HeaderProps } from '@/components/Header/types';
import HeaderButton from '@/components/Header/HeaderButton/HeaderButton';
import { paths } from '@/consts/routerPaths';
import { logout } from '@/services/authService';

const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <header className={clsx(styles.header)}>
      <Link href={paths.welcome} className={clsx(styles.header__logo)}>
        <Image src={logoImg} alt="logo" />
      </Link>
      <p className={clsx(styles.header__appName)}>GraphiQL App</p>
      <div className={clsx(styles.header__buttons)}>
        {isLoggedIn ? (
          <>
            <HeaderButton link={paths.main} title="Go to Main Page" />
            <HeaderButton link={paths.welcome} title="Log out" onClick={logout} />
          </>
        ) : (
          <>
            <HeaderButton link={paths.signIn} title="Log in" />
            <HeaderButton link={paths.signUp} title="Sign up" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
