import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import dynamic from 'next/dynamic';
import { clsx } from 'clsx';
import Image from 'next/image';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Variables from '@/components/Variables/Variables';
import Loader from '@/components/Loader/Loader';
import { showToast } from '@/utils/toastUtil';
import docIcon from '@/assets/images/icons/book.svg';
import { getQuery, Error } from './api/query';
import { IntrospectionQuery } from '@/generatedTypes/IntrospectionQuery';
import { useRouter } from '@/hooks/useRouter';
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
  const { router, locale, locales } = useRouter();
  const { t } = useTranslation('common');
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const [requestValue, setRequestValue] = useState<string | undefined>();
  const [variablesValue, setVariablesValue] = useState<string | undefined>();
  const [data, setData] = useState<IntrospectionQuery | null>(null);
  const [errors, setErrors] = useState<Error[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [tabletScreen] = useTablet();
  console.log(locale, locales);

  useEffect(() => {
    if (!user && !loading) router.push(paths.welcome);
  });

  const onSubmit = () => {
    setData(null);
    const query = requestValue ? requestValue : '';
    let variables;
    try {
      variables = variablesValue ? JSON.parse(variablesValue) : {};
    } catch {
      showToast('error', t('invalidJson'));
    }
    setIsLoading(true);
    getQuery(query, variables)
      .then((res) => {
        setData(res.data);
        setErrors(res.errors);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        showToast('error', error.message);
        setIsLoading(false);
        setData(null);
        setErrors(null);
      });
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
        <Request value={requestValue} setValue={setRequestValue} onSubmit={onSubmit} />
        <Variables value={variablesValue} setValue={setVariablesValue} />
      </div>
      <div className={clsx(styles.main__response, styles.section)}>
        <Response data={data} errors={errors} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Graphiql;
