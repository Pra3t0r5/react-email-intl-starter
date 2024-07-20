import * as React from "react";

import { Body, Head, Preview } from "@react-email/components";

import type { TLanguage } from "../types";

import { Html } from "./html";
import { Tailwind as _Tailwind } from "@react-email/components";

export const Email = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: TLanguage;
}) => (
  <Html lang={lang}>
    <Head />
    {/* https://react.email/docs/components/preview
     Email clients have this concept of “preview text” which gives insight into what’s inside the email before you open.
    A good practice is to keep that text under 90 characters. */}
    <Preview>{"{{PREVIEW_CONTENT}}"}</Preview>
    <Body>{children}</Body>
  </Html>
);
