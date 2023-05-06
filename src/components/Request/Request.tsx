import { useRef } from 'react';
import styles from './Request.module.scss';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';

const Request = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <div className={styles.wrapper}>
      <Editor
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
    </div>
  );
};

export default Request;
