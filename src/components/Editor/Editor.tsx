import { Dispatch, SetStateAction } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styles from './Editor.module.scss';

interface Editor {
  value?: string;
  setValue?: Dispatch<SetStateAction<string | undefined>>;
  language: string;
  readOnly?: boolean;
}

const Editor = ({ value, setValue, language, readOnly = false }: Editor) => {
  return (
    <section className={styles.editor}>
      <MonacoEditor
        language={language}
        width="99%"
        height="100%"
        options={{
          scrollBeyondLastLine: false,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
          cursorBlinking: 'phase',
          formatOnPaste: true,
          formatOnType: true,
          minimap: {
            enabled: false,
          },
          readOnly: readOnly,
        }}
        value={value}
        onChange={setValue}
      />
    </section>
  );
};

export default Editor;
