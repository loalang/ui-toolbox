import React from "react";
import { css, cx } from "emotion";
import { KnownLanguage } from "./KnownLanguage";

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
  const fontSize = 13;
  const lineHeight = 17;
  const paddingY = raw ? 0 : 12;
  const paddingX = raw ? 0 : 14;

  const lineCount = children.split("\n").length;
  const block = forceBlock || lineCount > 1;

  const codeFormatting = css`
    font-family: "IBM Plex Mono", monospace;
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
  `;

  const backdrop = css`
    background: #f9f9ff;
    border-radius: 4px;
  `;

  const codeForDisplay =
    language == null ? (
      children
    ) : (
      <HighlightedCode language={language}>{children}</HighlightedCode>
    );

  if (!block) {
    return (
      <code className={cx({ [backdrop]: !raw }, codeFormatting)}>
        {codeForDisplay}
      </code>
    );
  }

  return (
    <pre
      className={cx(
        { [backdrop]: !raw },
        css`
          white-space: normal;
          position: relative;
          height: ${lineCount * lineHeight + paddingY * 2}px;

          width: 100%;
          overflow-x: auto;
          -ms-overflow-style: none;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      )}
    >
      <code
        className={cx(
          codeFormatting,
          css`
            position: absolute;
            white-space: pre;
            padding: ${paddingY}px ${paddingX}px;
          `
        )}
      >
        {codeForDisplay}
      </code>
    </pre>
  );
}
