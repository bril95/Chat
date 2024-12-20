import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './locales/ru';
import en from './locales/en';

const resources = {
  ru,
  en,
};
const i18n = i18next.createInstance();

const initializeI18n = async (): Promise<void> => {
  try {
    await i18n
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        resources,
        fallbackLng: 'ru',
        interpolation: {
          escapeValue: false,
        },
      });
  } catch (error) {
    console.error('Error initializing i18next:', error);
  }
};

void initializeI18n();

export default i18n;
