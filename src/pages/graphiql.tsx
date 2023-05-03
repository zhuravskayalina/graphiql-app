import Documentation from '@/components/Documentation/Documentation';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Variables from '@/components/Variables/Variables';
import styles from '../styles/Graphiql.module.scss';

export default function Graphiql() {
  return (
    <div className={styles.main}>
      <div className={styles.main__documentation}>
        <Documentation />
      </div>
      <div className={styles.main__request}>
        <Request />
        <Variables />
      </div>
      <div className={styles.main__response}>
        <Response />
      </div>
    </div>
  );
}
