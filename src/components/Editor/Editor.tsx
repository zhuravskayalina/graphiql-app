import MonacoEditor from '@monaco-editor/react';
import styles from './Editor.module.scss';

interface Editor {
  value: string | undefined;
  setValue?: () => void;
  language: string;
  readOnly?: boolean;
}

const Editor = ({ value, setValue, language, readOnly = false }: Editor) => {
  return (
    <section className={styles.editor}>
      <MonacoEditor
        language={language}
        options={{
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
