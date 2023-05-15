import { useContext, useEffect } from 'react';
import Login from '@/components/Auth/Login/Login';
import Register from '@/components/Auth/Register/Register';
import styles from '@/styles/Auth.module.scss';
import Image from 'next/image';
import graphiQlImg from '@/assets/images/graphiQl.svg';
import { paths } from '@/enums/routerPaths';
import { AuthContext } from '@/contexts/authContext';
import { getAuthPageServerSideProps as getServerSideProps } from '@/utils/serverSidePropsUtil';
import { useRouter } from 'next/router';

export { getServerSideProps };

type AuthPageProps = {
  registerProp: string;
};

const Auth = ({ registerProp }: AuthPageProps) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) router.push(paths.main);
  }, [user, router]);

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <Image src={graphiQlImg} className={styles.auth__logo} alt="playground-logo" />
        {registerProp ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default Auth;
