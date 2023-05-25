import { useTranslation } from 'next-i18next';
import { clsx } from 'clsx';
import Editor from '../Editor/Editor';
import { RequestProps } from './types';
import runIcon from '../../assets/images/icons/run.svg';
import prettifyIcon from '../../assets/images/icons/prettify.svg';
import prettify from '@/services/prettifyService';
import EditorButton from '../Buttons/EditorButton/EditorButton';
import styles from './Request.module.scss';

const Request = ({ value, setValue, onSubmit, isVariablesOpen }: RequestProps) => {
  const { t } = useTranslation();

  const handlePrettify = () => {
    if (!value) return;
    setValue(prettify(value));
  };

  return (
    <div className={clsx(styles.request, isVariablesOpen && styles.request__variablesOpen)}>
      <div className={styles.request__header}>
        <p className={styles.request__heading}>{t('operation')}</p>
        <div className={styles['request__button-container']}>
          <EditorButton
            onClick={handlePrettify}
            disabled={!value}
            src={prettifyIcon}
            alt="prettify"
          />
          <EditorButton onClick={onSubmit} disabled={!value} src={runIcon} alt="run" />
        </div>
      </div>
      <Editor value={value} setValue={setValue} language={'graphql'} />
    </div>
  );
};

export default Request;
