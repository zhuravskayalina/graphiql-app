import { useState, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { clsx } from 'clsx';
import TypePath from './components/TypePath/TypePath';
import Schema from './components/Schema/Schema';
import Type from './components/Type/Type';
import Arguments from './components/Arguments/Arguments';
import { showToast } from '@/utils/toastUtil';
import { introspectionRequest } from './introspectionRequest';
import { getQuery } from '@/pages/api/query';
import { Response } from '@/pages/api/types';
import styles from './Documentation.module.scss';

const Documentation = () => {
  const { t } = useTranslation('common');
  const [typePath, setTypePath] = useState<string[]>(['Schema']);
  const [currentType, setCurrentType] = useState<string>(typePath[0]);
  const [response, setResponse] = useState<Response | null>(null);
  const [isError, setIsError] = useState(false);

  const changeType = (event: MouseEvent<HTMLElement>) => {
    if (event.currentTarget.dataset.type) {
      const name = event.currentTarget.dataset.type;
      if (!typePath.includes(name)) {
        setTypePath([...typePath, name]);
      } else {
        setTypePath(typePath.slice(0, typePath.indexOf(name) + 1));
      }
      setCurrentType(name);
    }
  };

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const res = await getQuery(introspectionRequest);
        setResponse(res);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        showToast('error', (error as Error).message);
      }
    };
    fetchQuery();
  }, []);

  const typeObject = response?.data?.__schema.types.find((type) => type.name === currentType);

  return (
    <div className={styles.documentation}>
      <h3 className={styles.documentation__title}>{t('documentationTitle')}</h3>
      <p className={styles.documentation__subtitle}>{t('apiDescription')}</p>
      {isError && <p>{t('failed')}</p>}
      {response?.data && currentType === typePath[0] ? (
        <Schema schema={response?.data.__schema} changeType={changeType} />
      ) : (
        response?.data && (
          <>
            <TypePath path={typePath} changeType={changeType} />
            <div className={styles.types}>
              {typeObject?.description ? (
                <p className={styles.types__description}>{typeObject?.description}</p>
              ) : null}
              {typeObject?.fields
                ? typeObject?.fields?.map((field) => (
                    <div className={styles.box} key={field.name}>
                      <div className={styles.box__title}>
                        <span>{field.name}</span>
                        <Arguments args={field.args} changeType={changeType} />
                        {':'}&nbsp;
                        <Type type={field.type} changeType={changeType} />
                      </div>
                      <p className={styles.box__description}>{field.description}</p>
                    </div>
                  ))
                : typeObject?.inputFields?.map((input) => (
                    <div className={clsx(styles.box, styles.box__filter)} key={input.name}>
                      <p>{input.description}</p>
                      <span>{input.name}</span>
                      {':'}&nbsp;
                      <Type type={input.type} changeType={changeType} />
                    </div>
                  ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Documentation;
