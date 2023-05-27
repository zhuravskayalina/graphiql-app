import { useTranslation } from 'next-i18next';
import { clsx } from 'clsx';
import Editor from '../Editor/Editor';
import { CopyState, RequestProps } from './types';
import runIcon from '../../assets/images/icons/run.svg';
import prettifyIcon from '../../assets/images/icons/prettify.svg';
import prettify from '@/services/prettifyService';
import EditorButton from '../Buttons/EditorButton/EditorButton';
import styles from './Request.module.scss';
import { useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';

const Request = ({ value, setValue, onSubmit, isVariablesOpen }: RequestProps) => {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<CopyState>({ text: t('copy') });

  const handlePrettify = () => {
    if (!value) return;
    setValue(prettify(value));
  };

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopyState({ text: t('copied'), color: 'grey' });
    setTimeout(() => {
      setCopyState({ text: t('copy') });
    }, 1000);
  };

  return (
    <div className={clsx(styles.request, isVariablesOpen && styles.request__variablesOpen)}>
      <div className={styles.request__header}>
        <p className={styles.request__heading}>{t('operation')}</p>
        <div className={styles['request__button-container']}>
          <Tooltip content={t('run')}>
            <EditorButton
              onClick={handlePrettify}
              disabled={!value}
              src={prettifyIcon}
              alt="prettify"
            />
          </Tooltip>
          <Tooltip content={t('prettify')}>
            <EditorButton onClick={onSubmit} disabled={!value} src={runIcon} alt="run" />
          </Tooltip>
        </div>
      </div>
      <Editor value={value} setValue={setValue} language={'graphql'} />
      {value && (
        <p onClick={handleCopy} className={styles.request__copy} style={{ color: copyState.color }}>
          {copyState.text}
        </p>
      )}
    </div>
  );
};

export default Request;
