import { Dispatch, SetStateAction } from 'react';

export type RegisterProps = {
  activeRegisterOption: Dispatch<SetStateAction<boolean | null>>;
};

export type FormsFields = {
  name: string;
  email: string;
  password: string;
};
