import { MouseEventHandler } from 'react';

export interface HeaderButtonProps {
  link: string;
  title: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
