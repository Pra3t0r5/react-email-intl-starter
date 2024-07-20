import rootLocales from "../root-locales";
import {
  TBaseIntlDictionary,
  TExtendedIntlDictionary,
  TIntlDictionaries,
  TLanguage,
} from "../types";
import { createLocales } from "./create-locales";

/**
 * Merges the root locales with the provided dictionaries, achieving type safety and custom default values
 */
export function getLocales<T extends TBaseIntlDictionary<T>>(
  lang: TLanguage,
  dict: TIntlDictionaries<T>
) {
  const locales = createLocales({
    es: { ...rootLocales.es, ...dict.es },
    en: { ...rootLocales.en, ...dict.en },
    pt: { ...rootLocales.pt, ...dict.pt },
  });

  return locales[lang] as TExtendedIntlDictionary<T>;
}
