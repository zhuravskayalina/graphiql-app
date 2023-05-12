import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '@/components/Auth/Login/Login';
import Register from '@/components/Auth/Register/Register';
import { auth } from '@/services/authService';
import styles from '@/styles/Auth.module.scss';
import Image from 'next/image';
import graphiQlImg from '@/assets/images/graphiQl.svg';
import { paths } from '@/enums/routerPaths';
import { useRouter } from '@/hooks/useRouter';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { AuthContext } from '@/contexts/authContext';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const { token } = cookies;
    if (token) {
      return {
        redirect: {
          permanent: false,
          destination: paths.main,
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

const Auth = () => {
  const { query, router } = useRouter();
  const [isRegisterActive, setIsRegisterActive] = useState<boolean | null>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setIsRegisterActive(query.register === 'true');
  }, [query]);

  useEffect(() => {
    if (user) router.push(paths.main);
  }, [user, router]);

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <Image src={graphiQlImg} className={styles.auth__logo} alt="playground-logo" />
        {isRegisterActive ? (
          <Register activeRegisterOption={setIsRegisterActive} />
        ) : (
          <Login activeRegisterOption={setIsRegisterActive} />
        )}
      </div>
    </div>
  );
};

export default Auth;
