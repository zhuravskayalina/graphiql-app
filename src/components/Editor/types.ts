import { Dispatch, SetStateAction } from 'react';
import { GraphQLSchema } from 'graphql';

export type EditorProps = {
  setEditorValue?: Dispatch<SetStateAction<string | undefined>>;
  editorValue: string | undefined;
  type: 'graphql' | 'json';
  readonly?: boolean;
  schema?: GraphQLSchema;
};
