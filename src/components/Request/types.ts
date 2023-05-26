import { Dispatch, SetStateAction } from 'react';

export interface RequestProps {
  value?: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  onSubmit: () => void;
  isVariablesOpen: boolean;
}

export type CopyState = {
  text: string;
  color?: string;
};
