import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Login from '@/components/Auth/Login/Login';
import Register from '@/components/Auth/Register/Register';
import { auth } from '@/services/authService';

const Auth = () => {
  const {
    query: { register },
  } = useRouter();
  const [isRegisterActive, setIsRegisterActive] = useState<boolean>(Boolean(register));
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  return (
    <div>
      {isRegisterActive ? (
        <Register activeRegisterOption={setIsRegisterActive} />
      ) : (
        <Login activeRegisterOption={setIsRegisterActive} />
      )}
    </div>
  );
};

export default Auth;
