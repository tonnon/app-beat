import 'i18next';
import type common from '@/locales/es/common.json';
import type navbar from '@/locales/es/navbar.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      navbar: typeof navbar;
    };
  }
}
