import { Dispatch, SetStateAction } from 'react';

export type LoginProps = {
  activeRegisterOption: Dispatch<SetStateAction<boolean | null>>;
};

export type LoginFormsFields = {
  email: string;
  password: string;
};
