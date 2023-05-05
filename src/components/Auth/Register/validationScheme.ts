import { RegisterOptions } from 'react-hook-form';

type validationSchemeTypes = {
  name: RegisterOptions;
  email: RegisterOptions;
  password: RegisterOptions;
};

export const validationScheme: validationSchemeTypes = {
  name: {
    required: 'Name cannot be empty',
    minLength: {
      value: 2,
      message: 'Name should contain at least 2 symbols',
    },
    maxLength: {
      value: 40,
      message: 'Name could contain up to 40 symbols',
    },
  },
  email: {
    required: 'Email cannot be empty',
    pattern: {
      value: /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/,
      message: `Email doesn't match the required format`,
    },
  },
  password: {
    validate: (value: string) => {
      if (!value) return 'Password cannot be empty';
      if (!new RegExp('^.{8,}$').test(value)) return 'Password should be at least 8 symbols';
      if (!new RegExp('^(?=.*[A-Za-z])').test(value))
        return 'Password should contain at least 1 letter';
      if (!new RegExp('^(?=.*?[0-9])').test(value))
        return 'Password should contain at least 1 number';
      if (!new RegExp('^(?=.*[#$@!%&*?])').test(value))
        return 'Password should contain at least 1 special character';
    },
  },
};
