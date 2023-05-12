import { useTranslation } from 'react-i18next';
import Editor from '../Editor/Editor';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import { Error } from '@/pages/api/query';
import styles from './Response.module.scss';

interface Response {
  data: IntrospectionQuery | null;
  errors: Error[] | null;
}

const Response = ({ data, errors }: Response) => {
  const { t } = useTranslation();

  return (
    <div className={styles.response}>
      <h3 className={styles.response__heading}>{t('response')}</h3>
      {data && !errors && (
        <Editor value={JSON.stringify(data, null, 2)} language={'json'} readOnly={true} />
      )}
      {errors && (
        <Editor value={JSON.stringify(errors, null, 2)} language={'json'} readOnly={true} />
      )}
    </div>
  );
};

export default Response;
