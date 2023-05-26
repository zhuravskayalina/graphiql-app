import { useTranslation } from 'next-i18next';
import Editor from '../Editor/Editor';
import styles from './Response.module.scss';
import Loader from '@/components/Loader/Loader';
import { CopyState, ResponseProps } from '@/components/Response/types';
import { useState } from 'react';

const Response = ({ responseValue, isLoading }: ResponseProps) => {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<CopyState>({ text: t('copy') });

  const handleCopy = async () => {
    if (!responseValue) return;
    await navigator.clipboard.writeText(JSON.stringify(responseValue));
    setCopyState({ text: t('copied'), color: 'grey' });
    setTimeout(() => {
      setCopyState({ text: t('copy') });
    }, 1000);
  };

  return (
    <div className={styles.response}>
      <div className={styles.response__header}>
        <p className={styles.response__heading}>{t('response')}</p>
      </div>
      {isLoading && <Loader />}
      {responseValue && (
        <Editor value={JSON.stringify(responseValue, null, 2)} language={'json'} readOnly={true} />
      )}
      {responseValue && (
        <p
          onClick={handleCopy}
          className={styles.response__copy}
          style={{ color: copyState.color }}
        >
          {copyState.text}
        </p>
      )}
    </div>
  );
};

export default Response;
