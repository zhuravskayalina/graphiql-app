import { Dispatch, SetStateAction } from 'react';
import { Id } from 'react-toastify';

export type LoginProps = {
  activeRegisterOption: Dispatch<SetStateAction<boolean | null>>;
};

export type LoginFormsFields = {
  email: string;
  password: string;
};
