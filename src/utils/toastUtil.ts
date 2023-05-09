import { Id, TypeOptions, toast } from 'react-toastify';

export const showToast = (type: TypeOptions, message: string, isLoading = false) => {
  const id = toast(message, {
    isLoading,
    autoClose: 1000,
    type,
  });
  return id;
};

export const updateToast = (id: Id, type: TypeOptions, message: string, isLoading = false) => {
  toast.update(id, {
    render: message,
    isLoading,
    type,
    autoClose: 1000,
  });
};

export const removeToast = (id: Id) => {
  toast.dismiss(id);
};
