import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/authService';
import { paths } from '@/enums/routerPaths';

const withAuth = (Component: React.FC) => () => {
  // getting the auth state from redux store
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    // first condition is to check if logged in and if on wrong path
    // then route to default route of the particular role user is of

    if (user) {
      router.push(paths.main);
    }

    // second condition is to check if not logged in and if on wrong path
    // then route to default not authenticated path
    else if (!user) {
      router.push(paths.signIn);
    }
  }, [user, router]);

  return <Component />;
};

export default withAuth;
