import { useRef } from 'react';
import styles from './Request.module.scss';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import runIcon from '../../assets/images/icons/run.svg';
import Image from 'next/image';

const Request = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <div className={styles.request}>
      <div className={styles.request__header}>
        <p className={styles.request__heading}>Operation</p>
        <button className={styles.runBtn}>
          <Image src={runIcon} alt="run" />
          <span>Send</span>
        </button>
      </div>
      <section className={styles.editor}>
        <Editor
          className={styles.editor}
          language="javascript"
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
