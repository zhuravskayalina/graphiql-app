import { NotifyFunction } from '@/components/Auth/Login/types';
import { FormsFields } from '@/components/Auth/Register/types';
import { UseFormSetError } from 'react-hook-form';

const sendNotification = async (
  message: string,
  setError: UseFormSetError<FormsFields>,
  setNotification: NotifyFunction
) => {
  return new Promise(() => {
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
        setError('email', { type: 'custom', message: 'invalidEmail' });
        break;
      case 'auth/missing-password':
        setError('password', { type: 'custom', message: 'missingPassword' });
        break;
      case 'auth/user-not-found':
        setError('email', { type: 'custom', message: 'userNotFound' });
        break;
      case 'auth/wrong-password':
        setError('password', { type: 'custom', message: 'wrongPassword' });
        break;
      case 'auth/email-already-in-use':
        setError('email', { type: 'custom', message: 'usedEmail' });
        break;
      default:
        setNotification('authError', 'error');
        break;
    }
    Promise.resolve();
  });
};

export default sendNotification;
