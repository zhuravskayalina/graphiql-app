import { useState } from 'react';
import styles from './Response.module.scss';
import { useTranslation } from 'react-i18next';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import { Error } from '@/pages/api/query';
import Editor from '@monaco-editor/react';

interface Response {
  data: IntrospectionQuery | null;
  errors: Error[] | null;
}

const Response = ({ data, errors }: Response) => {
  const { t } = useTranslation();

  return (
    <div className={styles.response}>
      <h3 className={styles.response__heading}>{t('response')}</h3>
      {data && (
        <Editor
          height="500px"
          language="json"
          options={{
            readOnly: true,
          }}
          value={JSON.stringify(data, null, 2)}
        />
      )}
      {errors && (
        <Editor
          height="500px"
          language="json"
          options={{
            readOnly: true,
          }}
          value={JSON.stringify(errors, null, 2)}
        />
      )}
    </div>
  );
};

export default Response;
