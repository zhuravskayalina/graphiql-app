import styles from './LanguageToggle.module.scss';

const LanguageToggle = () => {
  return (
    <label className={styles.switcher}>
      <input type="checkbox" />
      <span className={styles.switcher__background}>
        <span className={styles.switcher__option1}>EN</span>
        <span className={styles.switcher__option2}>RU</span>
      </span>
    </label>
  );
};

export default LanguageToggle;
