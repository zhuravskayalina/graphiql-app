import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { IntrospectionQuery, buildClientSchema } from 'graphql';
// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/lint/lint';
// import 'codemirror-graphql/hint';
// import 'codemirror-graphql/lint';
// import 'codemirror-graphql/mode';
import { buildSchema } from 'graphql';
import { graphql } from 'cm6-graphql';
import { updateSchema } from 'cm6-graphql';
import styles from './Editor.module.scss';

type props = {
  schema?: IntrospectionQuery;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  value: string | undefined;
};

const s = buildSchema(`
type Query {
  id: ID!
}`);

export default function CmEditor({ schema, setValue, value: value1 }: props) {
  const editor = useRef<HTMLDivElement>(null);
  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    extensions: [graphql(s)],
    value: value1 || '',
    height: '100%',
    onChange(value) {
      setValue(value);
    },
  });

  useEffect(() => {
    if (!view || !schema) return;
    updateSchema(view, buildClientSchema(schema));
  }, [schema, view]);

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor, setContainer]);

  return <section className={styles.editor} ref={editor} />;
}
