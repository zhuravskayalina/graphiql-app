import { FormsFields } from '@/components/Auth/Register/types';
import { removeToast, updateToast } from '@/utils/toastUtil';
import { UseFormSetError } from 'react-hook-form';
import { Id } from 'react-toastify';

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
        type: 'error',
        message: 'invalidEmail',
      };
    case 'auth/missing-password':
      return {
        type: 'error',
        message: 'missingPassword',
      };
    case 'auth/user-not-found':
      return {
        type: 'error',
        message: 'userNotFound',
      };
    case 'auth/wrong-password':
      return {
        type: 'error',
        message: 'wrongPassword',
      };
    case 'auth/email-already-in-use':
      return {
        type: 'error',
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
  id: Id,
  type: string,
  message: string,
  setError?: UseFormSetError<FormsFields>
) => {
  switch (type) {
    case 'error':
      if (setError) setError('email', { type: 'custom', message });
      removeToast(id);
      break;
    case 'toast-success':
      updateToast(id, 'success', message, false);
      break;
    default:
      updateToast(id, 'error', message, false);
      break;
  }
};

export default getNotificationType;
