import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { clsx } from 'clsx';
import Documentation from '@/components/Documentation/Documentation';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Variables from '@/components/Variables/Variables';
import Loader from '@/components/Loader/Loader';
import { showToast } from '@/utils/toastUtil';
import Image from 'next/image';
import docIcon from '@/assets/images/icons/book.svg';
import { getQuery, Error } from './api/query';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import styles from '../styles/Graphiql.module.scss';

const Graphiql = () => {
  const isTablet = useMediaQuery({ maxWidth: 1100 });
  const [tabletScreen, setTabletScreen] = useState(false);
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();
  const [data, setData] = useState<IntrospectionQuery | null>(null);
  const [errors, setErrors] = useState<Error[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTabletScreen(isTablet);
  }, [isTablet]);

  const onSubmit = () => {
    if (value) {
      setIsLoading(true);
      getQuery(value)
        .then((res) => {
          setData(res.data);
          setErrors(res.errors);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          showToast('error', error.message);
          setIsLoading(false);
        });
    }
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
        {isLoading ? <Loader /> : <Response data={data} errors={errors} />}
      </div>
    </div>
  );
};

export default Graphiql;
