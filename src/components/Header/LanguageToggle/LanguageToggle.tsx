import { LanguageToggleProps } from './types';
import { LOCALES } from '@/i18n/locales';
import styles from './LanguageToggle.module.scss';

const LanguageToggle = ({ changeLanguage }: LanguageToggleProps) => {
  return (
    <label className={styles.switcher}>
      <input type="checkbox" value={LOCALES[1].code} onChange={changeLanguage} />
      <span className={styles.switcher__background}>
        <span className={styles.switcher__option1}>EN</span>
        <span className={styles.switcher__option2}>RU</span>
      </span>
    </label>
  );
};

export default LanguageToggle;
