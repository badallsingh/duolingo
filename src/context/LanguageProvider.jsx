import { useState } from "react";
import { LanguageContext } from "./LanguageContext";

import en from "../i18n/en.json";
import hi from "../i18n/hi.json";
import es from "../i18n/es.json";

const languages = { en, hi, es };

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  // ✅ unified function for Login + Signup
  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: languages[lang],
        setLang: changeLanguage, // backward compatible
        changeLanguage,          // ✅ used by Login
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
