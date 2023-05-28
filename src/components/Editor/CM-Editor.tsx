import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { graphql, updateSchema } from 'cm6-graphql';
import styles from './Editor.module.scss';
import './Editor.module.scss';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';

type props = {
  setValue?: Dispatch<SetStateAction<string | undefined>>;
  value: string | undefined;
  type: 'graphql' | 'json';
  readonly?: boolean;
  schema?: GraphQLSchema;
};

import { EditorView } from '@codemirror/view';

const myTheme = EditorView.theme(
  {
    '.cm-gutters': {
      backgroundColor: 'white',
      color: 'black',
      fontSize: '15px',
      border: 'none',
    },
  },
  { dark: false }
);

export default function CmEditor({ schema, setValue, value: value1, type, readonly }: props) {
  const extensions = type === 'graphql' ? [graphql(schema)] : [json(), linter(jsonParseLinter())];
  const editor = useRef<HTMLDivElement>(null);

  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: myTheme,
    value: value1 || '',
    height: '100%',
    width: '100%',
    readOnly: readonly,
    onChange(value) {
      if (setValue) setValue(value);
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
