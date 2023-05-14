import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
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
import styles from '../styles/Graphiql.module.scss';
import { changeLanguage } from 'i18next';

const DocumentationLazy = dynamic(() => import('@/components/Documentation/Documentation'), {
  loading: () => <Loader />,
  ssr: false,
});

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { token, lang } = cookies;
  changeLanguage(lang || 'en');
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: paths.welcome,
      },
    };
  }
  return { props: {} };
};

const Graphiql = () => {
  const { t } = useTranslation();
  const { router } = useRouter();
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const [requestValue, setRequestValue] = useState<string | undefined>();
  const [variablesValue, setVariablesValue] = useState<string | undefined>();
  const [data, setData] = useState<IntrospectionQuery | null>(null);
  const [errors, setErrors] = useState<Error[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [tabletScreen] = useTablet();

  useEffect(() => {
    if (!user && !loading) router.push(paths.welcome);
  });

  const onSubmit = () => {
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
        {isLoading ? <Loader /> : <Response data={data} errors={errors} />}
      </div>
    </div>
  );
};

export default Graphiql;
