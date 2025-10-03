import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import esCommon from '@/locales/es/common.json';
import esNavbar from '@/locales/es/navbar.json';
import caCommon from '@/locales/ca/common.json';
import caNavbar from '@/locales/ca/navbar.json';

const resources = {
  es: {
    common: esCommon,
    navbar: esNavbar,
  },
  ca: {
    common: caCommon,
    navbar: caNavbar,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    defaultNS: 'common',
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false,
    },
    
  debug: false,
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;
