import { ISocialFooterProps } from "./components/social-footer/social-footer";

/**
 * **All the supported language keys**
 *
 * _Add more languages here._
 */
export type TLanguage = "es" | "pt" | "en";

/**
 * **Base type for all the locales.**
 *
 * Add to this type the keys that are going to be used in every email, globally
 * _Eg.: Nowadays, it's a standard to have Previews describing an email, therefore it is obligatory on all emails_
 */
export type TBaseIntlDictionary<T> = Record<keyof T, string> & {
  PREVIEW: string;
};

/**
 * **Extends the base type with the keys that are going to be used in every email.**
 *
 * _Eg.: SocialFooter component is going to be used in every email, thus adding its lang keys here is a good idea, avoiding repetition on every email dictionary_
 */
export type TExtendedIntlDictionary<T> = TBaseIntlDictionary<T> &
  ISocialFooterProps["labels"];

export type TIntlDictionaries<T extends TBaseIntlDictionary<T>> = {
  es: T;
  en: Record<keyof T, string>;
  pt: Record<keyof T, string>;
};
