import styles from '@/styles/NotFound.module.scss';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Custom404 = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.main} data-test="not-found">
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
