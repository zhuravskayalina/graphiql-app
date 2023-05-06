import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import styles from '@/styles/Home.module.scss';
import apolloImg from '@/assets/images/apollo.svg';
import graphQlImg from '@/assets/images/graphQL.svg';
import arrowIcon from '@/assets/images/icons/arrow.svg';
import rssLogo from '@/assets/images/rss-logo.svg';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={clsx(styles.layout)}>
        <div className={clsx(styles.main)}>
          <div className={clsx(styles.container, styles.container__main)}>
            <div className={clsx(styles.main__picture)}>
              <Image
                src={apolloImg}
                alt="apollo"
                className={clsx(styles.main__picture_image)}
                priority
              />
              <Image
                src={graphQlImg}
                alt="graphiQl"
                className={clsx(styles.main__picture_image)}
                priority
              />
            </div>
            <p className={clsx(styles.main__description)}>{t('appDescription')}</p>
            <button className={clsx(styles.startButton)}>
              <span>{t('getStartedButton')}</span>
              <Image src={arrowIcon} alt="arrow" className={clsx(styles.startButton_icon)} />
            </button>
          </div>
        </div>
        <footer className={clsx(styles.footer)}>
          <div className={clsx(styles.footer__container)}>
            <Link href="https://rs.school/js/">
              <Image src={rssLogo} alt="rss-logo" className={clsx(styles.footer__logo)} />
            </Link>
            <p className={clsx(styles.footer__copyright)}>Copyright &copy; 2023</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
