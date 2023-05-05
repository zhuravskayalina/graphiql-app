import { useQuery } from '@apollo/client';
import { INTROSPECTION } from '@/pages/api/introspection';
import styles from './Documentation.module.scss';

const Documentation = () => {
  const { loading, error, data } = useQuery(INTROSPECTION);
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <h3>Documentation</h3>
    </div>
  );
};

export default Documentation;
