import styles from './Variables.module.scss';
import { useTranslation } from 'react-i18next';

const Variables = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.variables}>
      <h3 className={styles.variables__heading}>{t('variables')}</h3>
      <div className={styles.input}></div>
    </div>
  );
};

export default Variables;
