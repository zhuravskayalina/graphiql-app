import { useTranslation } from 'next-i18next';
import Editor from '../Editor/Editor';
import styles from './Response.module.scss';
import Loader from '@/components/Loader/Loader';
import { ResponseProps } from '@/components/Response/types';

const Response = ({ responseValue, isLoading }: ResponseProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.response}>
      <h3 className={styles.response__heading}>{t('response')}</h3>
      {isLoading && <Loader />}
      {responseValue && (
        <Editor value={JSON.stringify(responseValue, null, 2)} language={'json'} readOnly={true} />
      )}
    </div>
  );
};

export default Response;
