import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { clsx } from 'clsx';
import Image from 'next/image';
import Documentation from '@/components/Documentation/Documentation';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Variables from '@/components/Variables/Variables';
import { paths } from '@/enums/routerPaths';
import docIcon from '@/assets/images/icons/book.svg';
import styles from '../styles/Graphiql.module.scss';
import { useRouter } from '@/hooks/useRouter';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/authService';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { token } = cookies;
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
  const { router } = useRouter();
  const isTablet = useMediaQuery({ maxWidth: 1100 });
  const [tabletScreen, setTabletScreen] = useState(false);
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setTabletScreen(isTablet);
  }, [isTablet]);

  useEffect(() => {
    if (!user && !loading) router.push(paths.welcome);
  });

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
        <Request />
        <Variables />
      </div>
      <div className={clsx(styles.main__response, styles.section)}>
        <Response />
      </div>
    </div>
  );
};

export default Graphiql;
