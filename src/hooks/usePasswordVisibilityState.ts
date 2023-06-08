import { useState } from 'react';

const usePasswordVisibilityState = (type: boolean) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(type);
  const passwordType = isPasswordVisible ? 'text' : 'password';
  return { passwordType, isPasswordVisible, setIsPasswordVisible };
};

export default usePasswordVisibilityState;
