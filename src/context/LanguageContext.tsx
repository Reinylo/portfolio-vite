import { createContext, useContext } from "react";
import { translations } from "../i18n/translations";

interface LangCtx {
    t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx>({ t: (k) => k });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const t = (key: string): string =>
        (translations["en"] as Record<string, string>)[key] ?? key;

    return (
        <LanguageContext.Provider value={{ t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}

export type { Language } from "../i18n/translations";
