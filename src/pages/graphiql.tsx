import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import docIconActive from '@/assets/images/icons/book.svg';
import docIcon from '@/assets/images/icons/book-disable.svg';
import closeIcon from '@/assets/images/icons/left-arrow.svg';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Options from '@/components/Options/Options';
import useGraphQuery from '@/hooks/useGraphQuery';
import { useTablet } from '@/hooks/useTablet';
import { getQuery } from './api/query';
import { introspectionRequest } from '@/pages/api/introspectionRequest';
import { Response as ResponseType } from './api/types';
import { showToast } from '@/utils/toastUtil';
import { auth } from '@/services/authService';
import { paths } from '@/enums/routerPaths';
import { getMainPageServerSideProps as getServerSideProps } from '@/utils/serverSidePropsUtil';
import styles from '../styles/Graphiql.module.scss';
import Tooltip from '@/components/Tooltip/Tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { HotKeys } from '@/enums/hotKeys';

export { getServerSideProps };

const DocumentationLazy = dynamic(() => import('@/components/Documentation/Documentation'));

const Graphiql = () => {
  const router = useRouter();
  const [isOpenDoc, setIsOpenDoc] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [tabletScreen] = useTablet();
  const [isVariablesOpen, setIsVariablesOpen] = useState(false);
  const [responseDoc, setResponseDoc] = useState<ResponseType | null>(null);
  const { t } = useTranslation();

  const {
    isLoading,
    responseValue,
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

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const res = await getQuery(introspectionRequest);
        setResponseDoc(res);
      } catch (error) {
        showToast('error', `Documentation: ${(error as Error).message}`);
      }
    };
    fetchQuery();
  }, []);

  const handleToggleOpenVariables = () => {
    setIsVariablesOpen((prevState) => !prevState);
  };

  const handleToggleOpenDoc = () => {
    setIsOpenDoc((prevState) => !prevState);
  };

  useHotkeys(HotKeys.openDoc, handleToggleOpenDoc);

  return (
    <div className={clsx(styles.main, isOpenDoc && styles.main__activeDoc)}>
      <div className={clsx(styles.main__documentation, styles.section)}>
        <Tooltip content={`${t('docs')} (${HotKeys.openDoc})`} leftPosition="0%">
          <button
            disabled={!responseDoc}
            className={clsx(
              styles.main__openDocBtn,
              responseDoc && styles.main__openDocBtn_active,
              isOpenDoc && styles.main__openDocBtn_hidden
            )}
            onClick={handleToggleOpenDoc}
          >
            <Image src={responseDoc ? docIconActive : docIcon} alt="open documentation" />
          </button>
        </Tooltip>
        <div
          className={clsx(
            styles.documentation,
            !isOpenDoc && styles.documentation_close,
            tabletScreen && styles.documentation_tablet,
            isOpenDoc && styles.documentation_tabletOpen
          )}
        >
          {isOpenDoc && (
            <button className={styles.close} onClick={handleToggleOpenDoc}>
              <Image src={closeIcon} alt="close docs" />
            </button>
          )}
          {isOpenDoc || tabletScreen ? <DocumentationLazy response={responseDoc} /> : null}
        </div>
        {isOpenDoc && tabletScreen && (
          <div className={clsx(styles.background)} onClick={handleToggleOpenDoc}></div>
        )}
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
        <Response responseValue={responseValue} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Graphiql;
