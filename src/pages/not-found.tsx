import styles from '@/styles/NotFound.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getServerSideProps } from '@/utils/serverSidePropsUtil';

export { getServerSideProps };

const Custom404 = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.text}>
          <h4 className={styles.main__heading}>{t('404error')}</h4>
          <h2>{t('hey')}</h2>
          <p className={styles.text__details}>{t('404text')}</p>
          <Link className={styles.button} href="/" locale={locale}>
            {t('goHomeButton')}
          </Link>
        </div>
        <div className={styles.imageBox} />
      </div>
    </div>
  );
};

export default Custom404;
