import styles from './Request.module.scss';
import Editor from '@monaco-editor/react';
import runIcon from '../../assets/images/icons/run.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Request {
  value?: string;
  setValue: (value?: string) => void;
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
      <section className={styles.editor}>
        <Editor
          className={styles.editor}
          language="graphql"
          options={{
            cursorBlinking: 'phase',
            formatOnPaste: true,
            formatOnType: true,
            minimap: {
              enabled: false,
            },
          }}
          value={value}
          onChange={setValue}
        />
      </section>
    </div>
  );
};

export default Request;
