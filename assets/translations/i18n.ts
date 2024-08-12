import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from './common';
import onboarding from './screens/onboarding';
import { defaultLocale } from '~/lib/constants';

const resources = {
  en: { 
    onboarding: onboarding.en,
    common: common.en
  },
  fr: { 
    onboarding: onboarding.fr,
    common: common.fr 
  }
} as const;

export { resources };

i18n

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: defaultLocale
  });

export default i18n;