import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { BallTriangle } from 'react-loader-spinner';
import { INTROSPECTION } from '@/pages/api/introspection';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import TypePath from './components/TypePath/TypePath';
import Schema from './components/Schema/Schema';
import Type from './components/Type/Type';
import Arguments from './components/Arguments/Arguments';
import styles from './Documentation.module.scss';

const Documentation = () => {
  const [typePath, setTypePath] = useState<string[]>(['Schema']);
  const [currentType, setCurrentType] = useState<string>(typePath[0]);
  const { loading, error, data } = useQuery<IntrospectionQuery>(INTROSPECTION);

  const changeType = (event: React.MouseEvent<HTMLElement>) => {
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

  return (
    <div className={styles.wrapper}>
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
  );
};

export default Documentation;
