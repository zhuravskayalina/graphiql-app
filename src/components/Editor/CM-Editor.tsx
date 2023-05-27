import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useCodeMirror, Extension } from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { graphql, updateSchema } from 'cm6-graphql';
import styles from './Editor.module.scss';

type props = {
  schema?: GraphQLSchema;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  value: string | undefined;
  extenstions: Extension;
};

export default function CmEditor({ schema, setValue, value: value1 }: props) {
  const editor = useRef<HTMLDivElement>(null);
  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    extensions: [graphql(schema)],
    value: value1 || '',
    height: '100%',
    width: '100%',
    onChange(value) {
      setValue(value);
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
