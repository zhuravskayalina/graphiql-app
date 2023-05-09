import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from '@apollo/client';
import { INTROSPECTION } from '@/pages/api/introspection';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import TypePath from './components/TypePath/TypePath';
import Schema from './components/Schema/Schema';
import Type from './components/Type/Type';
import Arguments from './components/Arguments/Arguments';
import styles from './Documentation.module.scss';
import { clsx } from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import closeIcon from '@/assets/images/icons/close.svg';
import Image from 'next/image';

interface DocumentationProps {
  isTablet: boolean;
  isOpen: boolean;
  setOpenDoc: Dispatch<SetStateAction<boolean>>;
}

const Documentation = ({ isTablet, isOpen, setOpenDoc }: DocumentationProps) => {
  const { t } = useTranslation();
  const [typePath, setTypePath] = useState<string[]>(['Schema']);
  const [currentType, setCurrentType] = useState<string>(typePath[0]);
  const { loading, data } = useQuery<IntrospectionQuery>(INTROSPECTION);

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

  const typeObject = data?.__schema.types.find((type) => type.name === currentType);

  const handleOpenDoc = () => {
    if (isOpen) setOpenDoc(false);
  };

  return (
    <>
      <div
        className={clsx(
          styles.wrapper,
          isTablet && styles.wrapper_tablet,
          isOpen && styles.wrapper_tabletOpen
        )}
      >
        {isTablet && (
          <button className={styles.close} onClick={handleOpenDoc}>
            <Image src={closeIcon} alt="close docs" />
          </button>
        )}
        <h3 className={styles.title}>{t('documentationTitle')}</h3>
        {loading && (
          <BallTriangle
            height={80}
            width={80}
            radius={4}
            color="darkblue"
            wrapperClass={styles.doc__loader}
            visible={true}
          />
        )}
        {data && currentType === typePath[0] ? (
          <Schema schema={data.__schema} changeType={changeType} />
        ) : (
          data && (
            <>
              <TypePath path={typePath} changeType={changeType} />
              {typeObject?.description ? (
                <p className={styles.objectDescription}>{typeObject?.description}</p>
              ) : null}
              {typeObject?.fields
                ? typeObject?.fields?.map((field) => (
                    <div className={styles.fields} key={field.name}>
                      <div className={styles.field}>
                        <span className={styles.name}>{field.name}</span>
                        <Arguments args={field.args} changeType={changeType} />
                        {':'}
                        <Type type={field.type} changeType={changeType} />
                      </div>
                      <p className={styles.description}>{field.description}</p>
                    </div>
                  ))
                : typeObject?.inputFields?.map((input) => (
                    <div className={styles.fields} key={input.name}>
                      <p>{input.description}</p>
                      <span>{input.name}</span>
                      {':'}
                      <Type type={input.type} changeType={changeType} />
                    </div>
                  ))}
            </>
          )
        )}
      </div>
      {isOpen && <div className={clsx(styles.background)}></div>}
    </>
  );
};

export default Documentation;
