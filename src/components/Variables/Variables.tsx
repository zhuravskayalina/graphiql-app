import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';
import Editor from '../Editor/Editor';
import styles from './Variables.module.scss';

import arrowDownIcon from '@/assets/images/icons/arrow-down.svg';
import Image from 'next/image';
import { clsx } from 'clsx';

interface Variables {
  value?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  isOpen: boolean;
  handleToggleOpen: () => void;
}

const Variables = ({ value, setValue, isOpen, handleToggleOpen }: Variables) => {
  const { t } = useTranslation();

  return (
    <div className={styles.variables}>
      <div className={styles.variables__header}>
        <h3 className={styles.variables__heading}>{t('variables')}</h3>
        <button onClick={handleToggleOpen} className={styles.openButton}>
          <Image
            src={arrowDownIcon}
            alt="open variables section"
            className={clsx(styles.openIcon, isOpen && styles.openIcon_hide)}
          />
        </button>
      </div>
      {isOpen && (
        <div className={styles.input}>
          <Editor value={value} setValue={setValue} language={'json'} />
        </div>
      )}
    </div>
  );
};

export default Variables;
