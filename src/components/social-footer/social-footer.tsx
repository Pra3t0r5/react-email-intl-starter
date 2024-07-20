import React from "react";

import {
  Column,
  Container,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";

import { getDefaultProp } from "@/utils/get-default-prop";

import { downloadLinks, socialLinks } from "./constants";

export interface ISocialFooterProps {
  labels: {
    FOOTER_PRIVACY: string;
    FOOTER_CONTACT: string;
    FOOTER_TYC: string;
    FOOTER_DOWNLOAD_LABEL: string;
  };
}

interface IImageLinkProps {
  className?: string;
  src: string;
  url: string;
  alt: string;
}

const ImageLink = ({ url, ...imageProps }: IImageLinkProps) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <Img {...imageProps} />
  </Link>
);

export const SocialFooter = ({
  labels: { FOOTER_PRIVACY, FOOTER_CONTACT, FOOTER_TYC, FOOTER_DOWNLOAD_LABEL },
}: ISocialFooterProps) => {
  const copyrightLabel = `Copyright © example-site ${getDefaultProp({
    name: "CURRENT_YEAR",
    previewDefaultValue: "2024",
  })} - ${FOOTER_TYC}`;

  return (
    <Container className="w-full mx-1.2 my-1">
      <ImageLink
        url="https://example-site.com"
        src="https://example-powered-by.png?auto=format&fit=clip"
        alt="Powered By example-site"
        className="p-0.8 mx-auto h-1.6"
      />

      <Text className="text-center font-body5">{FOOTER_DOWNLOAD_LABEL}</Text>
      <Section className="flex justify-around" align="center">
        <Row>
          {downloadLinks.map((link) => (
            <Column key={link.alt} valign="middle">
              <ImageLink {...link} />
            </Column>
          ))}
        </Row>
      </Section>
      <Section className="flex justify-around mt-2" align="center">
        <Row>
          {socialLinks.map((link) => (
            <Column key={link.alt} valign="middle">
              <ImageLink {...link} />
            </Column>
          ))}
        </Row>
      </Section>
      <Text className="text-center font-body5 text-neutral-light-700">
        {copyrightLabel}
      </Text>
      <Section className="text-center">
        <Row>
          <Column>
            <Link
              style={{ textDecoration: "underline" }}
              href="https://www.example-site.com/legal/pp/"
            >
              {FOOTER_PRIVACY}
            </Link>
          </Column>
          <Column>
            <Link
              style={{ textDecoration: "underline" }}
              href="mailto:support@example-site.com"
            >
              {FOOTER_CONTACT}
            </Link>
          </Column>
        </Row>
      </Section>
    </Container>
  );
};
