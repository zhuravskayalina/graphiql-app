import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Login from '@/components/Auth/Login/Login';
import Register from '@/components/Auth/Register/Register';
import { auth } from '@/services/authService';
import styles from '@/styles/Auth.module.scss';
import Image from 'next/image';
import playgroundLogo from '@/assets/images/playgroundLogo.png';
import { paths } from '@/consts/routerPaths';

const Auth = () => {
  const {
    query: { register },
  } = useRouter();
  const [isRegisterActive, setIsRegisterActive] = useState<boolean | null>(null);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    setIsRegisterActive(Boolean(register));
  }, [register]);

  useEffect(() => {
    if (user) router.push(paths.main);
  }, [user, router]);

  return (
    isRegisterActive !== null && (
      <div className={styles.auth}>
        <div className={styles.auth__container}>
          <Image src={playgroundLogo} className={styles.auth__logo} alt="playground-logo" />
          {isRegisterActive ? (
            <Register activeRegisterOption={setIsRegisterActive} />
          ) : (
            <Login activeRegisterOption={setIsRegisterActive} />
          )}
        </div>
      </div>
    )
  );
};

export default Auth;
