import { clsx } from 'clsx';
import Documentation from '@/components/Documentation/Documentation';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Variables from '@/components/Variables/Variables';
import styles from '../styles/Graphiql.module.scss';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import docIcon from '@/assets/images/icons/book.svg';
import { useEffect, useState } from 'react';

const Graphiql = () => {
  const isTablet = useMediaQuery({ maxWidth: 1100 });
  const [tabletScreen, setTabletScreen] = useState(false);
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();
  const [requestValue, setRequestValue] = useState<string | undefined>();

  useEffect(() => {
    setTabletScreen(isTablet);
  }, [isTablet]);

  const onSubmit = () => {
    setRequestValue(value);
  };

  return (
    <div className={styles.main}>
      <div className={clsx(styles.main__documentation, styles.section)}>
        {tabletScreen && (
          <button className={styles.main__openButton} onClick={() => setOpenDoc(true)}>
            <Image src={docIcon} alt="open documentation" />
          </button>
        )}
        <Documentation isOpen={openDoc} isTablet={tabletScreen} setOpenDoc={setOpenDoc} />
      </div>
      <div className={clsx(styles.main__request, styles.section)}>
        <Request value={value} setValue={setValue} onSubmit={onSubmit} />
        <Variables />
      </div>
      <div className={clsx(styles.main__response, styles.section)}>
        <Response />
      </div>
    </div>
  );
};

export default Graphiql;
