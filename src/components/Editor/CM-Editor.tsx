import { useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { graphql, updateSchema } from 'cm6-graphql';
import styles from './Editor.module.scss';
import './Editor.module.scss';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { EditorProps } from './types';

const editorTheme = EditorView.theme(
  {
    '.cm-gutters': {
      backgroundColor: 'white',
      color: 'black',
      fontSize: '15px',
      border: 'none',
    },
    '.cm-scroller::-webkit-scrollbar': {
      width: '14px',
    },
    '.cm-scroller::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '.cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: '#64646466',
    },
    '.cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#646464b3',
    },
  },
  { dark: false }
);

export default function CmEditor({
  schema,
  setEditorValue,
  editorValue,
  type,
  readonly,
}: EditorProps) {
  const extensions = type === 'graphql' ? [graphql(schema)] : [json(), linter(jsonParseLinter())];
  const editor = useRef<HTMLDivElement>(null);

  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: editorTheme,
    value: editorValue || '',
    height: '100%',
    width: '100%',
    readOnly: readonly,
    onChange(value) {
      if (setEditorValue) setEditorValue(value);
    },
  });

  useEffect(() => {
    if (!view || !schema) return;
    updateSchema(view, schema);
  }, [schema, view]);

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor, setContainer]);

  return <section className={styles.editor} ref={editor} />;
}
