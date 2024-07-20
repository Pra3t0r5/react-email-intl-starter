# React Email Internationalized Starter

A live preview right in your browser so you don't need to keep sending real emails during development. **Now with internationalization.**

<img width="961" alt="Screenshot 2024-07-19 at 10 33 31 PM" src="https://github.com/user-attachments/assets/0988308f-984b-4a95-b057-a6fd93d22747">

## Getting Started

First, install the dependencies:

```sh
npm install
# or
yarn
```

Then, run the development server:

```sh
npm run dev
# or
yarn dev
```

Open [localhost:3000](http://localhost:3000) with your browser to see the result.

## Boilerplate structure

```sh
.
├── scripts
│   └── dev.mjs #<-- this script generates intl templates
├── src
│   ├── components #<-- reusable react components
│   ├── emails
│   │   ├── notion-magic-link  #<-- template that supports intl
│   │   │   ├── email.tsx #<-- template react code
│   │   │   └── locales.ts  #<-- template intl dictionaries
│   │   ...
│   │   └── vercel-invite-user.tsx  #<-- template that doesn't supports intl
│   ├── root-locales.ts #<-- intl dictionaries global to all templates
│   ├── types.ts #<-- intl type safety enforcing helpers
│   └── utils
│       ├── create-locales.ts
│       ├── formatter.tsx #<-- bold formatter util
│       ├── get-default-prop.ts
│       └── get-locales.ts #<-- internationalization util
├── static #<-- static assets, like images
├── compiled #<-- output of dev script
│   ├── notion-magic-link  #<-- result of template that supports intl
│   │   ├── notion-magic-link-en.tsx
│   │   ├── notion-magic-link-es.tsx
│   │   └── notion-magic-link-pt.tsx
│   ...
│   └── vercel-invite-user.tsx  #<-- result of template didn't supported intl
...
```

## Internationalization working principles

You can take a look to the `notion-magic-link` email template i left as example. But it works as follows:

1. **Email templates** go in `emails` folder. Those that support intl must be named as `email.tsx` and contained in a folder with the name of the template.
2. **To make a email template support intl**, you must use `getLocales(lang, dictionaries)` util, example:

   ```tsx
   import { TLanguage } from "@/types";
   import { getLocales } from "@/utils/get-locales";

   export const Email = ({ lang }: { lang: TLanguage }) => {
   const {
    // global key
    PREVIEW,
    // email keys
    LOGIN_HEADING,
    LOGIN_CODE_TEXT,
    // ...
   } = getLocales(lang, dictionaries);
   //...
   ```

   Where:

   1. `lang` is the language prop of a template
   2. `dictionaries` are the imported key-values of each language, taken from `locales.ts`, more on that below.

3. **Language dictionaries** used by a specific email template must be placed in its folder, inside the `locales.ts`.

   ```ts
   const locales = {
     es: {
       PREVIEW: "Haz click aquí para iniciar sesión con este enlace mágico",
       LOGIN_HEADING: "Iniciar sesión",
     },
     en: {
       PREVIEW: "Click here to login with this magic link",
       LOGIN_HEADING: "Login",
     },
     //... other languages, set at utils/create-locales and types.TLanguage
   };
   export default locales;
   ```

## Appending internationalized content of custom components

**You can create Components intl support.** You just have to merge their interfaces with the global dictionary types to achieve type safety. If so, their intl keys are merged by `getLocales` util.

Say that you need a footer for most of your templates. The suggested implementation goes as follows:

1. Create your component with the desired labels as dictionary keys:

   ```tsx
   export interface ISocialFooterProps {
     labels: {
       FOOTER_PRIVACY: string;
       FOOTER_CONTACT: string;
       FOOTER_DOWNLOAD_LABEL: string;
     };
   }

   export const SocialFooter = ({
     labels: { FOOTER_PRIVACY, FOOTER_CONTACT, FOOTER_DOWNLOAD_LABEL },
   }: ISocialFooterProps) => {
     //... rest of the component definition
   };
   ```

2. Append new labels to your internationalized dictionaries. You can do this in various ways, but for simplicity's sake, here we will just add them to `root-locales.ts` global dictionary:

   ```tsx
   const rootLocales = {
     es: {
       //... other key-value pairs
       FOOTER_PRIVACY: "Nuestros terminos",
       FOOTER_CONTACT: "Contactanos",
       FOOTER_DOWNLOAD_LABEL: "Descarga nuestra app en:",
     },
     en: {
       //... other key-value pairs
       FOOTER_PRIVACY: "Privacy policy",
       FOOTER_CONTACT: "Contact us",
       FOOTER_DOWNLOAD_LABEL: "Download our app on:",
     },
   };

   export default rootLocales;
   ```

3. Add those types to the global dict types to achieve type safety:

   ```ts
   export type TExtendedIntlDictionary<T> = TBaseIntlDictionary<T> &
     ISocialFooterProps["labels"]; // <-- appended types
   // ... & other component intl keys as types
   ```

4. Then, in your template, use your newly created component and its internationalized content labels as desired:

   ```tsx
   export const Email = ({ lang }: { lang: TLanguage }) => {
   const {
    // global translations
    PREVIEW,
    // email translations
    LOGIN_HEADING,
    LOGIN_CODE_TEXT,
    // component specific translations
    ...footerLabels
   } = getLocales(lang, dictionaries);

   //...

   return (
     //... email render
     <SocialFooter labels={footerLabels} />
   )
   ```

## License

MIT License
