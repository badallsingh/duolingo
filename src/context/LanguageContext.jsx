 /* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";
import en from "../i18n/en.json";
import hi from "../i18n/hi.json";
import es from "../i18n/es.json";

// Create global context
export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Load saved UI language or default to English
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  // Language dictionary
  const translations = { en, hi, es };

  // Change UI language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ t: translations[language], language, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
