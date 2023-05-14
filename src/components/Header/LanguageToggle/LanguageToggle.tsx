import { LanguageToggleProps } from './types';
import { LOCALES } from '@/i18n/locales';
import styles from './LanguageToggle.module.scss';

const LanguageToggle = ({ changeLanguage, language }: LanguageToggleProps) => {
  const value = LOCALES[1].code;
  const checked = LOCALES[1].code === language;

  return (
    <label className={styles.switcher}>
      <input type="checkbox" value={value} onChange={changeLanguage} checked={checked} />
      <span className={styles.switcher__background}>
        <span className={styles.switcher__option1}>EN</span>
        <span className={styles.switcher__option2}>RU</span>
      </span>
    </label>
  );
};

export default LanguageToggle;
