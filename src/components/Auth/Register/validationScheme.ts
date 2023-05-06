import { RegisterOptions } from 'react-hook-form';

type validationSchemeTypes = {
  name: RegisterOptions;
  email: RegisterOptions;
  password: RegisterOptions;
};

export const validationScheme: validationSchemeTypes = {
  name: {
    required: 'nameRequired',
    minLength: {
      value: 2,
      message: 'nameMinLength',
    },
    maxLength: {
      value: 40,
      message: 'nameMaxLength',
    },
  },
  email: {
    required: 'emailRequired',
    pattern: {
      value: /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/,
      message: 'emailMismatch',
    },
  },
  password: {
    validate: (value: string) => {
      if (!value) return 'passwordRequired';
      if (!new RegExp('^.{8,}$').test(value)) return 'passwordMinLength';
      if (!new RegExp('^(?=.*[A-Za-z])').test(value)) return 'passwordLetterMissed';
      if (!new RegExp('^(?=.*?[0-9])').test(value)) return 'passwordNumberMissed';
      if (!new RegExp('^(?=.*[#$@!%&*?])').test(value)) return 'passwordSymbolMissed';
    },
  },
};
