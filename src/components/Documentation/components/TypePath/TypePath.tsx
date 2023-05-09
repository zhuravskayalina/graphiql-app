import { Path } from '../../types';
import styles from './TypePath.module.scss';

const TypePath = ({ path, changeType }: Path) => {
  return (
    <div className={styles.wrapper}>
      {path.map((type, index) => (
        <span className={styles.type} key={type} data-type={type} onClick={changeType}>
          {index !== path.length - 1 ? `${type} >` : `${type}`}
        </span>
      ))}
    </div>
  );
};

export default TypePath;
