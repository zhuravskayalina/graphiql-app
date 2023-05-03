import { clsx } from 'clsx';
import styles from './Header.module.scss';
import Image from 'next/image';
import logoImg from '@/assets/images/logo-small.svg';
import Link from 'next/link';
import { HeaderProps } from '@/components/Header/types';
import HeaderButton from '@/components/Header/HeaderButton/HeaderButton';

const Header = ({ isLoggedIn }: HeaderProps) => {
  const onClick = () => {
    console.log('he');
  };
  return (
    <header className={clsx(styles.header)}>
      <Link href="/" className={clsx(styles.header__logo)}>
        <Image src={logoImg} alt="logo" />
      </Link>
      <p className={clsx(styles.header__appName)}>GraphiQL App</p>
      <div className={clsx(styles.header__buttons)}>
        {isLoggedIn ? (
          <>
            <HeaderButton link="/graphiql" title="Go to Main Page" />
            <HeaderButton link="/" title="Log out" />
          </>
        ) : (
          <>
            <HeaderButton link="/log-in" title="Log in" onClick={onClick} />
            <HeaderButton link="/sign-up" title="Sign up" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
