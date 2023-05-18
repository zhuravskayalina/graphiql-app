import { Dispatch, SetStateAction } from 'react';

export interface OptionProps {
  variablesValue?: string;
  setVariablesValue: Dispatch<SetStateAction<string | undefined>>;
  headersValue?: string;
  setHeadersValue: Dispatch<SetStateAction<string | undefined>>;
  isOpen: boolean;
  handleToggleOpen: () => void;
}
