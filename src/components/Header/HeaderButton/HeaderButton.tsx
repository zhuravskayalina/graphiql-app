import Link from 'next/link';
import { clsx } from 'clsx';
import styles from './HeaderButton.module.scss';
import { HeaderButtonProps } from '@/components/Header/HeaderButton/types';

const HeaderButton = ({ link, title, onClick }: HeaderButtonProps) => {
  return (
    <Link href={`${link}`} className={clsx(styles.link)} onClick={onClick}>
      {title}
    </Link>
  );
};

export default HeaderButton;
