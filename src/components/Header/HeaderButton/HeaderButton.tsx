import Link from 'next/link';
import { clsx } from 'clsx';
import styles from './HeaderButton.module.scss';
import { HeaderButtonProps } from '@/components/Header/HeaderButton/types';
import { useRouter } from 'next/router';

const HeaderButton = ({ link, title, onClick }: HeaderButtonProps) => {
  const { locale } = useRouter();

  return (
    <Link href={link} locale={locale} className={clsx(styles.link)} onClick={onClick}>
      {title}
    </Link>
  );
};

export default HeaderButton;
