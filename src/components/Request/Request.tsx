import { useTranslation } from 'next-i18next';
import Editor from '../Editor/Editor';
import { RequestProps } from './types';
import runIcon from '../../assets/images/icons/run.svg';
import Image from 'next/image';
import { clsx } from 'clsx';
import styles from './Request.module.scss';

const Request = ({ value, setValue, onSubmit, isVariablesOpen }: RequestProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.request, isVariablesOpen && styles.request__variablesOpen)}>
      <div className={styles.request__header}>
        <p className={styles.request__heading}>{t('operation')}</p>
        <button
          onClick={onSubmit}
          disabled={!value}
          className={clsx(styles.runBtn, value ? styles.runBtn_active : styles.runBtn_disable)}
        >
          <Image src={runIcon} alt="run" />
        </button>
      </div>
      <Editor value={value} setValue={setValue} language={'graphql'} />
    </div>
  );
};

export default Request;
