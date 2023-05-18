import { FormsFields } from '@/components/Auth/Register/types';
import { showToast } from '@/utils/toastUtil';
import { UseFormSetError } from 'react-hook-form';

const getNotificationType = async (message: string) => {
  switch (message) {
    case 'auth/register-success':
      return {
        type: 'toast-success',
        message: 'registerSuccess',
      };
    case 'auth/login-success':
      return {
        type: 'toast-success',
        message: 'loginSuccess',
      };
    case 'auth/logout-success':
      return {
        type: 'toast-success',
        message: 'logoutSuccess',
      };
    case 'auth/invalid-email':
      return {
        type: 'error-email',
        message: 'invalidEmail',
      };
    case 'auth/missing-password':
      return {
        type: 'error-password',
        message: 'missingPassword',
      };
    case 'auth/user-not-found':
      return {
        type: 'error-email',
        message: 'userNotFound',
      };
    case 'auth/wrong-password':
      return {
        type: 'error-password',
        message: 'wrongPassword',
      };
    case 'auth/email-already-in-use':
      return {
        type: 'error-email',
        message: 'usedEmail',
      };
    default:
      return {
        type: 'toast-error',
        message: 'authError',
      };
  }
};

export const sendNotification = (
  type: string,
  message: string,
  setError?: UseFormSetError<FormsFields>
) => {
  switch (type) {
    case 'error-email':
      if (setError) setError('email', { type: 'custom', message });
      break;
    case 'error-password':
      if (setError) setError('password', { type: 'custom', message });
      break;
    case 'toast-success':
      showToast('success', message);
      break;
    default:
      showToast('error', message);
      break;
  }
};

export default getNotificationType;
