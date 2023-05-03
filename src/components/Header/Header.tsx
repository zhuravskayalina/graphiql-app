import { clsx } from 'clsx';
import styles from './Header.module.scss';
import Image from 'next/image';
import logoImg from '@/assets/images/logo-small.svg';
import Link from 'next/link';
import { HeaderProps } from '@/components/Header/types';

const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <header className={clsx(styles.header)}>
      <Link href="/" className={clsx(styles.header__logo)}>
        <Image src={logoImg} alt="logo" />
      </Link>
      <p className={clsx(styles.header__appName)}>Apollo GraphQL App</p>
      <Link href="/auth" className={clsx(styles.header__button)}>
        {isLoggedIn ? 'Log out' : 'Log in'}
      </Link>
    </header>
  );
};

export default Header;
