import { useState, MouseEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { clsx } from 'clsx';
import TypePath from './components/TypePath/TypePath';
import Schema from './components/Schema/Schema';
import Type from './components/Type/Type';
import Arguments from './components/Arguments/Arguments';
import { Response } from '@/pages/api/types';
import styles from './Documentation.module.scss';

const Documentation = ({ response }: { response: Response | null }) => {
  const { t } = useTranslation('common');
  const [currentType, setCurrentType] = useState<string>('Schema');
  const [typePath, setTypePath] = useState<string[]>([currentType]);

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

  const typeObject = response?.data?.__schema.types.find((type) => type.name === currentType);

  return (
    <div className={styles.documentation}>
      <h3 className={styles.documentation__title}>{t('documentationTitle')}</h3>
      <p className={styles.documentation__subtitle}>{t('apiDescription')}</p>
      {response?.errors && <p>{t('failed')}</p>}
      {response?.data &&
        (currentType === 'Schema' ? (
          <Schema schema={response.data.__schema} changeType={changeType} />
        ) : (
          <>
            <TypePath path={typePath} changeType={changeType} />
            <div className={styles.types}>
              {typeObject?.description && (
                <p className={styles.types__description}>{typeObject.description}</p>
              )}
              {typeObject?.fields &&
                typeObject.fields.map((field) => (
                  <div className={styles.box} key={field.name}>
                    <div className={styles.box__title}>
                      <span>{field.name}</span>
                      <Arguments args={field.args} changeType={changeType} />
                      {':'}&nbsp;
                      <Type type={field.type} changeType={changeType} />
                    </div>
                    <p className={styles.box__description}>{field.description}</p>
                  </div>
                ))}
              {typeObject?.inputFields &&
                typeObject.inputFields.map((input) => (
                  <div className={clsx(styles.box, styles.box__filter)} key={input.name}>
                    <p>{input.description}</p>
                    <span>{input.name}</span>
                    {':'}&nbsp;
                    <Type type={input.type} changeType={changeType} />
                  </div>
                ))}
            </div>
          </>
        ))}
    </div>
  );
};

export default Documentation;
