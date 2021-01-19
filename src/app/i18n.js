import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
// import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
  debug: process.env.NODE_ENV === "development" ? true : false,
  resources: {},
  lng: "en",
  fallbackLng: "en",
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  // .use(LanguageDetector)
  .init(options);

export default i18n;
