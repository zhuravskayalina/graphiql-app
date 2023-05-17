import { FC } from 'react';
import { ErrorFallbackProps } from './types';
import styles from './ErrorFallback.module.scss';

const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles.error}>
      <h3 className={styles.error__title}>Sorry, something went wrong</h3>
      <p className={styles.error__message}>Error: {error.message}</p>
      <p>Please try the following steps:</p>
      <ul className={styles.error__list}>
        <li>Reload the page</li>
        <li>Check your internet connection</li>
        <li>
          Contact Support (<span className={styles.error__contacts}>+637564356, support@mail</span>)
        </li>
      </ul>
      <button className={styles.error__button} onClick={resetErrorBoundary}>
        Reload the page
      </button>
    </div>
  );
};

export default ErrorFallback;
