import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '@/components/Auth/Login/Login';
import Register from '@/components/Auth/Register/Register';
import { auth } from '@/services/authService';
import styles from '@/styles/Auth.module.scss';
import Image from 'next/image';
import graphiQlImg from '@/assets/images/graphiQl.svg';
import { paths } from '@/enums/routerPaths';
import { useRouter } from '@/hooks/useRouter';
import { BallTriangle } from 'react-loader-spinner';

const Auth = () => {
  const { query, router } = useRouter();
  const [isRegisterActive, setIsRegisterActive] = useState<boolean | null>(null);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setIsRegisterActive(query.register === 'true');
  }, [query]);

  useEffect(() => {
    if (user) router.push(paths.main);
  }, [user, router]);

  return !loading ? (
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
  ) : (
    <BallTriangle
      height={80}
      width={80}
      radius={4}
      color="darkblue"
      wrapperClass={styles.auth__loader}
      visible={true}
    />
  );
};

export default Auth;
