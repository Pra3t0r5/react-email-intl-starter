import { TBaseIntlDictionary, TIntlDictionaries, TLanguage } from "@/types";

/**
 * Ensures that all supported languages (set at TLanguage) have equal dictionaries containing the same keys.
 */
export function createLocales<T extends TBaseIntlDictionary<T>>({
  es,
  en,
  pt,
}: TIntlDictionaries<T>) {
  return {
    es,
    en,
    pt,
  } as Record<TLanguage, T>;
}
