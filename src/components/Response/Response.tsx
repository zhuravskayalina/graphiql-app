import styles from './Response.module.scss';
import { useTranslation } from 'react-i18next';

const Response = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.response}>
      <h3 className={styles.response__heading}>{t('response')}</h3>
      <div className={styles.response__text} />
    </div>
  );
};

export default Response;
