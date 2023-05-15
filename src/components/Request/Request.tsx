import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';
import Editor from '../Editor/Editor';
import styles from './Request.module.scss';
import runIcon from '../../assets/images/icons/run.svg';
import Image from 'next/image';

interface Request {
  value?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  onSubmit: () => void;
}

const Request = ({ value, setValue, onSubmit }: Request) => {
  const { t } = useTranslation();

  return (
    <div className={styles.request}>
      <div className={styles.request__header}>
        <p className={styles.request__heading}>{t('operation')}</p>
        <button onClick={onSubmit} className={styles.runBtn}>
          <Image src={runIcon} alt="run" />
        </button>
      </div>
      <Editor value={value} setValue={setValue} language={'graphql'} />
    </div>
  );
};

export default Request;
