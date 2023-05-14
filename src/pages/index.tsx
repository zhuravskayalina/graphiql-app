import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import styles from '@/styles/Home.module.scss';
import graphiQlImg from '@/assets/images/graphiQl.svg';
import arrowIcon from '@/assets/images/icons/arrow.svg';
import rssLogo from '@/assets/images/rss-logo.svg';
import { authorsLinks } from '@/utils/authors';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={clsx(styles.container, styles.container__main)}>
            <div className={styles.main__picture}>
              <Image
                src={graphiQlImg}
                alt="apollo"
                className={styles.main__picture_image}
                priority
              />
            </div>
            <p className={styles.main__description}>
              <span className={styles.main__description_text}>{t('appDescription')}</span>
            </p>
            <button className={clsx(styles.startButton)}>
              <span>{t('getStartedButton')}</span>
              <Image src={arrowIcon} alt="arrow" className={styles.startButton_icon} />
            </button>
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footer__container}>
            <Link href="https://rs.school/js/">
              <Image src={rssLogo} alt="rss-logo" className={styles.footer__logo} />
            </Link>
            <p className={styles.footer__copyright}>Copyright &copy; 2023</p>
            <div className={styles.authors}>
              {authorsLinks.map((link) => (
                <Link href={link.url} key={link.url} className={styles.authors__item}>
                  {link.fullName}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
