import { auth } from '@/services/authService';
import { User, onAuthStateChanged } from 'firebase/auth';
import { PropsWithChildren, createContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import nookies from 'nookies';

export const AuthContext = createContext<{ user: User | null | undefined }>({
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user] = useAuthState(auth);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, [user]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
