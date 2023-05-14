import styles from '@/styles/NotFound.module.scss';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { changeLanguage } from 'i18next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { lang } = cookies;
  changeLanguage(lang || 'en');
  return { props: {} };
};

const Custom404 = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.text}>
          <h4 className={styles.main__heading}>{t('404error')}</h4>
          <h2>{t('hey')}</h2>
          <p className={styles.text__details}>{t('404text')}</p>
          <Link className={styles.button} href="/">
            {t('goHomeButton')}
          </Link>
        </div>
        <div className={styles.imageBox} />
      </div>
    </div>
  );
};

export default Custom404;
