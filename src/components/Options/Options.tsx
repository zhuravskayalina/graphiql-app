import { useState, MouseEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { OptionProps } from './types';
import arrowDownIcon from '@/assets/images/icons/arrow-down.svg';
import Image from 'next/image';
import { clsx } from 'clsx';
import styles from './Options.module.scss';
import CmEditor from '../Editor/CM-Editor';

const Options = ({
  variablesValue,
  setVariablesValue,
  headersValue,
  setHeadersValue,
  isOpen,
  handleToggleOpen,
}: OptionProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('variables');

  const handleOption = (event: MouseEvent<HTMLElement>) => {
    if (event.currentTarget.dataset.title) {
      const title = event.currentTarget.dataset.title;
      setTitle(title);
    }
  };

  return (
    <div className={styles.options}>
      <div className={styles.options__header}>
        <div className={styles.options__title}>
          <h3
            className={clsx(styles.options__heading, title === 'headers' && styles.notActive)}
            data-title="variables"
            onClick={handleOption}
          >
            {t('variables')}
          </h3>
          <h3
            className={clsx(styles.options__heading, title === 'variables' && styles.notActive)}
            data-title="headers"
            onClick={handleOption}
          >
            {t('headers')}
          </h3>
        </div>
        <button onClick={handleToggleOpen} className={styles.openButton}>
          <Image
            src={arrowDownIcon}
            alt="open options section"
            className={clsx(styles.openIcon, isOpen && styles.openIcon_hide)}
          />
        </button>
      </div>
      {isOpen && (
        <div className={styles.options__input}>
          <div className={clsx(styles.editor, title === 'headers' && styles.editor__hidden)}>
            <CmEditor value={variablesValue} setValue={setVariablesValue} type="json"></CmEditor>
          </div>
          <div className={clsx(styles.editor, title === 'variables' && styles.editor__hidden)}>
            <CmEditor value={headersValue} setValue={setHeadersValue} type="json"></CmEditor>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
