import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { INTROSPECTION } from '@/pages/api/introspection';
import styles from './Documentation.module.scss';
import { IntrospectionQuery } from '../../generatedTypes/IntrospectionQuery';
import Schema from './components/Schema/Schema';
import Type from './components/Type/Type';

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

  const currentTypeObject = data?.__schema.types.find((type) => type.name === currentType);

  return (
    data && (
      <div className={styles.wrapper}>
        {currentType === typePath[0] ? (
          <Schema schema={data.__schema} changeType={changeType} />
        ) : (
          <div>
            {typePath.map((type) => (
              <h5 key={type} data-type={type} onClick={changeType}>
                {type}
              </h5>
            ))}
            <p>{currentTypeObject?.description}</p>
            {currentTypeObject?.fields?.map((field) => (
              <div key={field.name}>
                <p>{field.description}</p>
                <span>{field.name}:</span>
                <Type type={field.type} changeType={changeType} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Documentation;
