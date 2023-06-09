import { useTranslation } from 'next-i18next';
import { clsx } from 'clsx';
import { CopyState, RequestProps } from './types';
import runIcon from '../../assets/images/icons/run.svg';
import prettifyIcon from '../../assets/images/icons/prettify.svg';
import prettify from '@/services/prettifyService';
import EditorButton from '../Buttons/EditorButton/EditorButton';
import styles from './Request.module.scss';
import { useEffect, useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { HotKeys } from '@/enums/hotKeys';
import LinkButton from '../Buttons/LinkButton/LinkButton';
import CmEditor from '../Editor/CM-Editor';
import { buildSchema, buildClientSchema } from 'graphql';

const Request = ({ value, setValue, onSubmit, isVariablesOpen, responseDoc }: RequestProps) => {
  const { t } = useTranslation();
  const [schema, setSchema] = useState(buildSchema('type Query { id: ID! }'));
  const [copyState, setCopyState] = useState<CopyState>({
    text: 'copy',
    hotKey: true,
  });

  useEffect(() => {
    if (!responseDoc) return;
    setSchema(buildClientSchema(responseDoc));
  }, [responseDoc]);

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
          <Tooltip content={`${t('prettify')} (${HotKeys.prettify})`} leftPosition="-90%">
            <EditorButton
              onClick={handlePrettify}
              disabled={!value}
              src={prettifyIcon}
              alt="prettify"
            />
          </Tooltip>
          <Tooltip content={`${t('run')} (${HotKeys.runQuery})`} leftPosition="-90%">
            <EditorButton onClick={onSubmit} disabled={!value} src={runIcon} alt="run" />
          </Tooltip>
        </div>
      </div>
      <CmEditor
        editorValue={value}
        setEditorValue={setValue}
        schema={schema}
        type="graphql"
      ></CmEditor>
      <div className={styles.request__copy}>
        {value && (
          <LinkButton
            onClick={handleCopy}
            text={`${t(copyState.text)} ${copyState.hotKey ? '(' + HotKeys.copyRequest + ')' : ''}`}
            color={copyState.color}
          />
        )}
      </div>
    </div>
  );
};

export default Request;
