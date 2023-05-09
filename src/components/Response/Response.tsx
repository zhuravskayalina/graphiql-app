import styles from './Response.module.scss';

const Response = () => {
  return (
    <div className={styles.response}>
      <h3 className={styles.response__heading}>Response</h3>
      <div className={styles.response__text} />
    </div>
  );
};

export default Response;
