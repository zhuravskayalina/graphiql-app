import { Dispatch, SetStateAction } from 'react';

export type RegisterProps = {
  activeRegisterOption: Dispatch<SetStateAction<boolean | null>>;
};
