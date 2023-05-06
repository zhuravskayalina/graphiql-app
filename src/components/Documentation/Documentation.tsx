import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { INTROSPECTION } from '@/pages/api/introspection';
import styles from './Documentation.module.scss';
import { IntrospectionQuery } from '../../generatedTypes/IntrospectionQuery';

const Documentation = () => {
  const [currentType, setCurrentType] = useState<string>('Schema');
  const [previousType, setPreviousType] = useState<string | null>(null);
  const { loading, error, data } = useQuery<IntrospectionQuery>(INTROSPECTION);
  console.log(data);

  return (
    <div className={styles.wrapper}>
      {data && currentType === 'Schema' ? (
        <div>
          <h3>Documentation</h3>
          <p>
            {
              data.__schema.types.find((type) => type.name === data.__schema.__typename)
                ?.description
            }
          </p>
          <p>Root Types</p>
          {data.__schema.queryType ? (
            <div>
              query:<p>{data.__schema.queryType.name}</p>
            </div>
          ) : null}
          {data.__schema.mutationType ? (
            <div>
              mutation:<p>`${data.__schema.mutationType.name}`</p>
            </div>
          ) : null}
          {data.__schema.subscriptionType ? (
            <div>
              subscription:<p>`${data.__schema.subscriptionType.name}`</p>
            </div>
          ) : null}
        </div>
      ) : (
        <h3>`${currentType}`</h3>
      )}
    </div>
  );
};

export default Documentation;
