import { useRef } from 'react';
import styles from './Request.module.scss';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import runIcon from '../../assets/images/icons/run.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Request = () => {
  const { t } = useTranslation();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <div className={styles.request}>
      <div className={styles.request__header}>
        <p className={styles.request__heading}>{t('operation')}</p>
        <button className={styles.runBtn}>
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
          onMount={handleEditorDidMount}
        />
      </section>
    </div>
  );
};

export default Request;
