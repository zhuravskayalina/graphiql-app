import { PropsWithChildren } from 'react';
import { TooltipProps } from './types';
import styles from './Tooltip.module.scss';
import { useTablet } from '@/hooks/useTablet';

const Tooltip = ({ content, children, leftPosition }: PropsWithChildren<TooltipProps>) => {
  const [isTablet] = useTablet();

  return (
    <div className={styles.tooltip}>
      {children}
      {!isTablet && (
        <div className={styles.tooltip__text} style={{ transform: `translateX(${leftPosition})` }}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
