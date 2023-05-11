import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './English/translation.json';
import translationRussian from './Russian/translation.json';
import validationMessagesEnglish from './English/validationMessages.json';
import validationMessagesRussian from './Russian/validationMessages.json';
import firebaseMessagesEnglish from './English/firebaseMessages.json';
import firebaseMessagesRussian from './Russian/firebaseMessages.json';

const resources = {
  en: {
    translation: translationEnglish,
    validationMessages: validationMessagesEnglish,
    firebaseMessages: firebaseMessagesEnglish,
  },
  ru: {
    translation: translationRussian,
    validationMessages: validationMessagesRussian,
    firebaseMessages: firebaseMessagesRussian,
  },
};

export default i18next.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});
