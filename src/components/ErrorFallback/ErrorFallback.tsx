import { useTranslation } from 'react-i18next';
import { ErrorFallbackProps } from './types';
import styles from './ErrorFallback.module.scss';

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>{t('wrong')}</h2>
      <p className={styles.error__message}>{`${t('error')}: ${error.message}`}</p>
      <p className={styles.error__contact}>
        {`${t('contact')}: `}
        <span className={styles.error__mail}>support@support</span>
      </p>
      <button className={styles.error__button} onClick={resetErrorBoundary}>
        {t('reload')}
      </button>
    </div>
  );
};

export default ErrorFallback;
