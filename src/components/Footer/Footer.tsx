import styles from './Footer.module.scss';
import rssLogo from '@/assets/images/rss-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authorsLinks } from '@/utils/authors';

const Footer = () => {
  const { pathname } = useRouter();

  return pathname !== '/' ? (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link href="https://rs.school/js/" as={'image'}>
          <Image
            src={rssLogo}
            alt="rss-logo"
            className={styles.footer__logo}
            width={65}
            height={24}
            priority={true}
          />
        </Link>
        <p className={styles.footer__copyright}>
          <span className={styles.footer__copyright_text}>Copyright</span> &copy; 2023
        </p>
        <div className={styles.authors}>
          {authorsLinks.map((link) => (
            <Link href={link.url} key={link.url} className={styles.authors__link}>
              {link.shortName}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
