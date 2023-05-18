import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import Image from 'next/image';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Options from '@/components/Options/Options';
import Loader from '@/components/Loader/Loader';
import docIcon from '@/assets/images/icons/book.svg';
import useGraphQuery from '@/hooks/useGraphQuery';
import { useTablet } from '@/hooks/useTablet';
import { auth } from '@/services/authService';
import { paths } from '@/enums/routerPaths';
import { getMainPageServerSideProps as getServerSideProps } from '@/utils/serverSidePropsUtil';
import styles from '../styles/Graphiql.module.scss';

export { getServerSideProps };

const DocumentationLazy = dynamic(() => import('@/components/Documentation/Documentation'), {
  loading: () => <Loader />,
  ssr: false,
});

const Graphiql = () => {
  const router = useRouter();
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const [user, loading] = useAuthState(auth);
  const [tabletScreen] = useTablet();
  const [isVariablesOpen, setIsVariablesOpen] = useState(false);

  const {
    data,
    isLoading,
    errors,
    headersValue,
    setHeadersValue,
    variablesValue,
    setVariablesValue,
    requestValue,
    setRequestValue,
    onSubmit,
  } = useGraphQuery();

  useEffect(() => {
    if (!user && !loading) router.push(paths.welcome);
  });

  const handleToggleOpenVariables = () => {
    setIsVariablesOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.main}>
      <div className={clsx(styles.main__documentation, styles.section)}>
        {tabletScreen && (
          <button className={styles.main__openButton} onClick={() => setOpenDoc(true)}>
            <Image src={docIcon} alt="open documentation" />
          </button>
        )}
        <DocumentationLazy isOpen={openDoc} isTablet={tabletScreen} setOpenDoc={setOpenDoc} />
      </div>
      <div className={clsx(styles.main__request, styles.section)}>
        <Request
          value={requestValue}
          setValue={setRequestValue}
          onSubmit={onSubmit}
          isVariablesOpen={isVariablesOpen}
        />
        <Options
          variablesValue={variablesValue}
          setVariablesValue={setVariablesValue}
          headersValue={headersValue}
          setHeadersValue={setHeadersValue}
          isOpen={isVariablesOpen}
          handleToggleOpen={handleToggleOpenVariables}
        />
      </div>
      <div className={clsx(styles.main__response, styles.section)}>
        <Response data={data} errors={errors} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Graphiql;
