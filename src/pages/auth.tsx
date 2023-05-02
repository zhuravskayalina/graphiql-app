import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Login from '@/components/Auth/Login/Login';
import Register from '@/components/Auth/Register/Register';
import { auth } from '@/services/authService';

export default function Auth() {
  const [isLoginActive, setIsLoginActive] = useState<boolean>(true);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  return (
    <div>
      {isLoginActive ? (
        <Login onClick={setIsLoginActive} />
      ) : (
        <Register onClick={setIsLoginActive} />
      )}
    </div>
  );
}
