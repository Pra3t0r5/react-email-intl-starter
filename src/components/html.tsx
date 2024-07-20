import * as React from "react";

import { Html as _Html } from "@react-email/components";

import { TLanguage } from "../types";

export const Html = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: TLanguage;
}) => <_Html lang={lang}>{children}</_Html>;
