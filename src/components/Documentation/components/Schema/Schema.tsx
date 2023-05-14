import { Schema } from '../../types';
import styles from './Schema.module.scss';
import { useTranslation } from 'react-i18next';

const Schema = ({ schema, changeType }: Schema) => {
  const { t } = useTranslation();

  return (
    <>
      <h4 className={styles.heading}>Root Types</h4>
      <p className={styles.description}>{t('schemaDescription')}</p>
      <div className={styles.schema}>
        {schema.queryType ? (
          <div>
            <span className={styles.name}>query:</span>
            <span className={styles.type} data-type={schema.queryType.name} onClick={changeType}>
              {schema.queryType.name}
            </span>
          </div>
        ) : null}
        {schema.mutationType ? (
          <div>
            <span className={styles.name}>mutation:</span>
            <span className={styles.type} data-type={schema.mutationType.name} onClick={changeType}>
              {schema.mutationType.name}
            </span>
          </div>
        ) : null}
        {schema.subscriptionType ? (
          <div>
            <span className={styles.name}>subscription:</span>
            <span
              className={styles.type}
              data-type={schema.subscriptionType.name}
              onClick={changeType}
            >
              {schema.subscriptionType.name}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Schema;
