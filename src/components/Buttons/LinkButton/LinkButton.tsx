import { LinkButtonProps } from './types';
import styles from './LinkButton.module.scss';

const LinkButton = ({ text, onClick, color }: LinkButtonProps) => {
  return (
    <p onClick={onClick} className={styles.copy} style={{ color: color }}>
      {text}
    </p>
  );
};

export default LinkButton;
