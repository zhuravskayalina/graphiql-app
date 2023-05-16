import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';
import Editor from '../Editor/Editor';
import styles from './Variables.module.scss';

interface Variables {
  value?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
}

const Variables = ({ value, setValue }: Variables) => {
  const { t } = useTranslation();
  return (
    <div className={styles.variables}>
      <h3 className={styles.variables__heading}>{t('variables')}</h3>
      <div className={styles.input}>
        <Editor value={value} setValue={setValue} language={'json'} />
      </div>
    </div>
  );
};

export default Variables;
