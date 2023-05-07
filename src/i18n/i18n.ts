import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './English/translation.json';
import translationRussian from './Russian/translation.json';
import validationMessagesEnglish from './English/validationMessages.json';
import validationMessagesRussian from './Russian/validationMessages.json';

const resources = {
  en: {
    translation: translationEnglish,
    validationMessages: validationMessagesEnglish,
  },
  ru: {
    translation: translationRussian,
    validationMessages: validationMessagesRussian,
  },
};

export default i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});
