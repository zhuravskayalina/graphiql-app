import { BallTriangle } from 'react-loader-spinner';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <BallTriangle
      height={80}
      width={80}
      radius={4}
      color="darkblue"
      wrapperClass={styles.loader}
      visible={true}
    />
  );
};

export default Loader;
