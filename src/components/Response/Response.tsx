import { useTranslation } from 'next-i18next';
import styles from './Response.module.scss';
import Loader from '@/components/Loader/Loader';
import { CopyState, ResponseProps } from '@/components/Response/types';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { HotKeys } from '@/enums/hotKeys';
import LinkButton from '../Buttons/LinkButton/LinkButton';
import CmEditor from '../Editor/CM-Editor';

const Response = ({ responseValue, isLoading, statusCode }: ResponseProps) => {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<CopyState>({
    text: 'copy',
    hotKey: true,
  });

  const handleCopy = async () => {
    if (!responseValue) return;
    await navigator.clipboard.writeText(JSON.stringify(responseValue));
    setCopyState({ text: 'copied', color: 'grey', hotKey: false });
    setTimeout(() => {
      setCopyState({ text: 'copy', hotKey: true });
    }, 1000);
  };

  useHotkeys(HotKeys.copyResponse, handleCopy);

  return (
    <div className={styles.response}>
      <div className={styles.response__header}>
        <p className={styles.response__heading}>{t('response')}</p>
        {statusCode && responseValue && (
          <p className={styles.response__status}>{`${t('status')} ${statusCode}`}</p>
        )}
      </div>
      {isLoading && <Loader />}
      {responseValue && (
        <CmEditor
          value={JSON.stringify(responseValue, null, 2)}
          type="json"
          readonly={true}
        ></CmEditor>
      )}
      {responseValue && (
        <LinkButton
          onClick={handleCopy}
          text={`${t(copyState.text)} ${copyState.hotKey ? '(' + HotKeys.copyResponse + ')' : ''}`}
          color={copyState.color}
        />
      )}
    </div>
  );
};

export default Response;
