import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { messages, type Messages } from "./messages";
import { LANG_STORAGE_KEY, type Lang } from "./types";

type I18nValue = {
  lang: Lang;
  t: Messages;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function readQueryLang(): Lang | null {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "zh") return q;
  } catch {
    /* ignore */
  }
  return null;
}

function readStoredLang(): Lang {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "en" || saved === "zh") return saved;
  } catch {
    /* ignore */
  }
  return "zh";
}

function resolveInitialLang(): Lang {
  return readQueryLang() ?? readStoredLang();
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    const next = resolveInitialLang();
    setLangState(next);
    // Persist ?lang= so subsequent navigations keep the locale.
    if (readQueryLang()) {
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "zh" ? "en" : "zh");
  }, [lang, setLang]);

  useEffect(() => {
    const t = messages[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.meta.description);
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      t: messages[lang],
      setLang,
      toggleLang,
    }),
    [lang, setLang, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
