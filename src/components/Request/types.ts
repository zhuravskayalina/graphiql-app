import { Dispatch, SetStateAction } from 'react';
import { IntrospectionQuery } from 'graphql';

export interface RequestProps {
  value?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  onSubmit: () => void;
  isVariablesOpen: boolean;
  responseDoc?: IntrospectionQuery;
}

export type CopyState = {
  text: string;
  color?: string;
  hotKey: boolean;
};
