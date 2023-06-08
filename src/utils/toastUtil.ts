import { TypeOptions, toast } from 'react-toastify';

export const showToast = (type: TypeOptions, message: string) => {
  toast(message, {
    autoClose: 1500,
    type,
  });
};
