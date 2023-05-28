import styles from '@/styles/NotFound.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import translation from '../../public/locales/404.json';
import { useEffect } from 'react';
import nookies from 'nookies';

const Custom404 = () => {
  const { locale } = useRouter();
  const resolvedLocale = locale === 'ru' ? locale : locale === 'en' ? locale : 'en';

  useEffect(() => {
    nookies.set(undefined, 'lang', resolvedLocale, { path: '/' });
  });

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.text}>
          <h4 className={styles.main__heading}>{translation[resolvedLocale]['404error']}</h4>
          <h2>{translation[resolvedLocale].hey}</h2>
          <p className={styles.text__details}>{translation[resolvedLocale]['404text']}</p>
          <Link className={styles.button} href="/" locale={locale}>
            {translation[resolvedLocale]['goHomeButton']}
          </Link>
        </div>
        <div className={styles.imageBox} />
      </div>
    </div>
  );
};

export default Custom404;
