import { FormsFields } from '@/components/Auth/Register/types';
import { UseFormSetError } from 'react-hook-form';

const sendNotification = (message: string, setError: UseFormSetError<FormsFields>) => {
  switch (message) {
    case 'auth/register-success':
      break;
    case 'auth/login-success':
      break;
    case 'auth/logout-success':
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
      break;
  }
};

export default sendNotification;
