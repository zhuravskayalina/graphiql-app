import { clsx } from 'clsx';
import Documentation from '@/components/Documentation/Documentation';
import Request from '@/components/Request/Request';
import Response from '@/components/Response/Response';
import Variables from '@/components/Variables/Variables';
import styles from '../styles/Graphiql.module.scss';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import docIcon from '@/assets/images/icons/book.svg';
import { useContext, useEffect, useState } from 'react';
import { paths } from '@/enums/routerPaths';
import { useRouter } from '@/hooks/useRouter';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/authService';
import { AuthContext } from '@/contexts/authContext';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const { token } = cookies;
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: paths.signIn,
        },
      };
    }
    return {
      props: {},
    };
  } catch {
    return {
      props: {},
    };
  }
};

const Graphiql = () => {
  const { router } = useRouter();
  const [user] = useAuthState(auth);
  const isTablet = useMediaQuery({ maxWidth: 1100 });
  const [tabletScreen, setTabletScreen] = useState(false);
  const [openDoc, setOpenDoc] = useState<boolean>(false);

  useEffect(() => {
    setTabletScreen(isTablet);
  }, [isTablet]);

  useEffect(() => {
    console.log(user);
    if (!user) router.push(paths.signIn);
  }, [user, router]);

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
