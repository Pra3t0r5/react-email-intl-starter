import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";

import { Html } from "@/components/html";
import { TLanguage } from "@/types";
import { getLocales } from "@/utils/get-locales";

import { getDefaultProp } from "@/utils/get-default-prop";
import dictionaries from "./locales";
import { boldFormatter } from "@/utils/formatter";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const Email = ({ lang }: { lang: TLanguage }) => {
  const {
    PREVIEW,
    LOGIN_HEADING,
    LOGIN_CODE_TEXT,
    LOGIN_IGNORE_TEXT,
    LOGIN_HINT_TEXT,
    NOTION_LOGO_ALT,
    NOTION_LINK_TEXT,
    NOTION_DESCRIPTION,
  } = getLocales(lang, dictionaries);

  return (
    <Html lang={lang}>
      <Head />
      <Preview>{PREVIEW}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{LOGIN_HEADING}</Heading>
          <Link
            href="https://notion.so"
            target="_blank"
            style={{
              ...link,
              display: "block",
              marginBottom: "16px",
            }}
          >
            {PREVIEW}
          </Link>
          <Text style={{ ...text, marginBottom: "14px" }}>
            {boldFormatter(LOGIN_CODE_TEXT)}
          </Text>
          <code style={code}>
            {getDefaultProp({
              name: "LOGIN_CODE",
              previewDefaultValue: '"sparo-ndigo-amurt-secan"',
            })}
          </code>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "14px",
              marginBottom: "16px",
            }}
          >
            {LOGIN_IGNORE_TEXT}
          </Text>
          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "12px",
              marginBottom: "38px",
            }}
          >
            {LOGIN_HINT_TEXT}
          </Text>
          <Img
            src={`${baseUrl}/static/notion-logo.png`}
            width="32"
            height="32"
            alt={NOTION_LOGO_ALT}
          />
          <Text style={footer}>
            <Link
              href="https://notion.so"
              target="_blank"
              style={{ ...link, color: "#898989" }}
            >
              {NOTION_LINK_TEXT}
            </Link>
            , {NOTION_DESCRIPTION}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
