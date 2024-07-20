import React from "react";

interface BoldTextProps {
  children: React.ReactNode;
}

const BoldText: React.FC<BoldTextProps> = ({ children }) => {
  return <strong>{children}</strong>;
};

/**
 * Converts \*\*bold\*\* substrings of a text to \<strong>bold\</strong>
 */
export function boldFormatter(text: string): React.ReactNode[] {
  const regex = /\*\*(.*?)\*\*/g;
  let match: RegExpExecArray | null;

  const segments: React.ReactNode[] = [];

  let newText = text;

  while ((match = regex.exec(newText)) !== null) {
    segments.push(newText.slice(0, match.index));

    segments.push(<BoldText key={match.index}>{match[1]}</BoldText>);

    newText = newText.slice(match.index + match[0].length);
  }

  segments.push(newText);

  return segments;
}
