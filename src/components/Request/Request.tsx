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
import { useHotkeys } from 'react-hotkeys-hook';
import { HotKeys } from '@/enums/hotKeys';
import LinkButton from '../Buttons/LinkButton/LinkButton';

const Request = ({ value, setValue, onSubmit, isVariablesOpen }: RequestProps) => {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<CopyState>({
    text: 'copy',
    hotKey: true,
  });

  const handlePrettify = () => {
    if (!value) return;
    setValue(prettify(value));
  };

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopyState({ text: 'copied', color: 'grey', hotKey: false });
    setTimeout(() => {
      setCopyState({ text: 'copy', hotKey: true });
    }, 1000);
  };

  useHotkeys(HotKeys.prettify, handlePrettify);
  useHotkeys(HotKeys.copyRequest, handleCopy);
  useHotkeys(HotKeys.runQuery, onSubmit);

  return (
    <div className={clsx(styles.request, isVariablesOpen && styles.request__variablesOpen)}>
      <div className={styles.request__header}>
        <p className={styles.request__heading}>{t('operation')}</p>
        <div className={styles['request__button-container']}>
          <Tooltip content={`${t('prettify')} (${HotKeys.prettify})`}>
            <EditorButton
              onClick={handlePrettify}
              disabled={!value}
              src={prettifyIcon}
              alt="prettify"
            />
          </Tooltip>
          <Tooltip content={`${t('run')} (${HotKeys.runQuery})`}>
            <EditorButton onClick={onSubmit} disabled={!value} src={runIcon} alt="run" />
          </Tooltip>
        </div>
      </div>
      <Editor value={value} setValue={setValue} language={'graphql'} />
      <div className={styles.request__copy}>
        {value && (
          <LinkButton
            onClick={handleCopy}
            text={`${t(copyState.text)} ${
              copyState.hotKey ? '(' + HotKeys.copyResponse + ')' : ''
            }`}
            color={copyState.color}
          />
        )}
      </div>
    </div>
  );
};

export default Request;
