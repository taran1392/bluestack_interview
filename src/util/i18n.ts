import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";


i18n
  .use(detector)
  .use(backend)
 .use(initReactI18next) 
 .init({
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;