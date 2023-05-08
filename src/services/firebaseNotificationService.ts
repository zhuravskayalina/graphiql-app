import { FormsFields } from '@/components/Auth/Register/types';
import { UseFormSetError } from 'react-hook-form';

const sendNotification = async (
  message: string,
  setNotification: (message: string, type: 'success' | 'error') => void,
  setError?: UseFormSetError<FormsFields>
) => {
  switch (message) {
    case 'auth/register-success':
      setNotification('registerSuccess', 'success');
      break;
    case 'auth/login-success':
      setNotification('loginSuccess', 'success');
      break;
    case 'auth/logout-success':
      setNotification('logoutSuccess', 'success');
      break;
    case 'auth/invalid-email':
      if (setError) setError('email', { type: 'custom', message: 'invalidEmail' });
      break;
    case 'auth/missing-password':
      if (setError) setError('password', { type: 'custom', message: 'missingPassword' });
      break;
    case 'auth/user-not-found':
      if (setError) setError('email', { type: 'custom', message: 'userNotFound' });
      break;
    case 'auth/wrong-password':
      if (setError) setError('password', { type: 'custom', message: 'wrongPassword' });
      break;
    case 'auth/email-already-in-use':
      if (setError) setError('email', { type: 'custom', message: 'usedEmail' });
      break;
    default:
      setNotification('authError', 'error');
      break;
  }
};

export default sendNotification;
