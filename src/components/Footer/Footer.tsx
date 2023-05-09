import { clsx } from 'clsx';
import styles from './Footer.module.scss';
import rssLogo from '@/assets/images/rss-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const authorsLinks = [
  {
    name: 'A',
    url: 'https://github.com/zhuravskayalina',
  },
  {
    name: 'K',
    url: 'https://github.com/shutikate',
  },
  {
    name: 'D',
    url: 'https://github.com/dziana-babrova',
  },
];

const Footer = () => {
  const { pathname } = useRouter();

  return pathname !== '/' ? (
    <footer className={clsx(styles.footer)}>
      <div className={clsx(styles.footer__container)}>
        <Link href="https://rs.school/js/">
          <Image src={rssLogo} alt="rss-logo" className={clsx(styles.footer__logo)} priority />
        </Link>
        <p className={clsx(styles.footer__copyright)}>
          <span className={clsx(styles.footer__copyright_text)}>Copyright</span> &copy; 2023
        </p>
        <div className={clsx(styles.authors)}>
          {authorsLinks.map((link) => (
            <Link href={link.url} key={link.url} className={clsx(styles.authors__link)}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
