import { createContext, useContext, useState } from "react";
import { translations } from "../i18n/translations";
import type { Language } from "../i18n/translations";

interface LangCtx {
    lang: Language;
    setLang: (l: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx>({
    lang: "en",
    setLang: () => {},
    t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>(
        () => (localStorage.getItem("portfolio-lang") as Language | null) ?? "en"
    );

    const setLang = (l: Language) => {
        setLangState(l);
        localStorage.setItem("portfolio-lang", l);
    };

    const t = (key: string): string =>
        (translations[lang] as Record<string, string>)[key] ?? key;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}

export type { Language };
