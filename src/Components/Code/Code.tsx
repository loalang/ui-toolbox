import React from "react";
import { KnownLanguage } from "./KnownLanguage";
import { CodeContainer } from "./CodeContainer";

const HighlightedCode = React.lazy(() => import("./HighlightedCode"));

export function Code({
  children,
  block: forceBlock,
  raw = false,
  language
}: {
  children: string;
  block?: boolean;
  raw?: boolean;
  language?: KnownLanguage;
}) {
  const lineCount = children.split("\n").length;

  return (
    <CodeContainer
      isDisabled
      raw={raw}
      block={forceBlock}
      lineCount={lineCount}
    >
      {language == null ? (
        children
      ) : (
        <HighlightedCode language={language}>{children}</HighlightedCode>
      )}
    </CodeContainer>
  );
}
