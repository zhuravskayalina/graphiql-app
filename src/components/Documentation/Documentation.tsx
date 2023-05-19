import { useState, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { clsx } from 'clsx';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import { introspectionQuery } from '@/pages/api/introspection';
import TypePath from './components/TypePath/TypePath';
import Schema from './components/Schema/Schema';
import Type from './components/Type/Type';
import Arguments from './components/Arguments/Arguments';
import { showToast } from '@/utils/toastUtil';
import styles from './Documentation.module.scss';

const Documentation = () => {
  const { t } = useTranslation('common');
  const [typePath, setTypePath] = useState<string[]>(['Schema']);
  const [currentType, setCurrentType] = useState<string>(typePath[0]);
  const [data, setData] = useState<IntrospectionQuery | null>(null);
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
    introspectionQuery()
      .then((res) => {
        setData(res);
        setIsError(false);
      })
      .catch((error: Error) => {
        setIsError(true);
        showToast('error', error.message);
      });
  }, []);

  const typeObject = data?.__schema.types.find((type) => type.name === currentType);

  return (
    <>
      <h3 className={styles.title}>{t('documentationTitle')}</h3>
      <p className={styles.subtitle}>{t('apiDescription')}</p>
      {isError && <p>{t('failed')}</p>}
      {data && currentType === typePath[0] ? (
        <Schema schema={data.__schema} changeType={changeType} />
      ) : (
        data && (
          <>
            <TypePath path={typePath} changeType={changeType} />
            {typeObject?.description ? (
              <p className={styles.typeDescription}>{typeObject?.description}</p>
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
          </>
        )
      )}
    </>
  );
};

export default Documentation;
