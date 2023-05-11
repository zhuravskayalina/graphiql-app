import { ChangeEvent } from 'react';

export type LanguageToggleProps = {
  changeLanguage: (e: ChangeEvent<HTMLInputElement>) => void;
};
