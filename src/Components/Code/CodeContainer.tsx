import React, { ReactNode, forwardRef } from "react";
import { css, cx } from "emotion";

/** @internal */
export const CodeContainer = forwardRef<
  HTMLElement,
  {
    children?: ReactNode;
    lineCount: number;
    raw?: boolean;
    block?: boolean;
    contentEditable?: boolean;
  }
>(function CodeContainer(
  {
    children,
    raw = false,
    block: forceBlock = false,
    lineCount,
    contentEditable
  },
  ref
) {
  const fontSize = 13;
  const lineHeight = 17;
  const paddingY = raw ? 0 : 12;
  const paddingX = raw ? 0 : 14;

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

  if (!block) {
    return (
      <code className={cx({ [backdrop]: !raw }, codeFormatting)}>
        {children}
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
        ref={ref}
        contentEditable={contentEditable}
        spellCheck={
          contentEditable != null && contentEditable ? "false" : undefined
        }
        autoCorrect={
          contentEditable != null && contentEditable ? "off" : undefined
        }
        autoCapitalize={
          contentEditable != null && contentEditable ? "off" : undefined
        }
        className={cx(
          codeFormatting,
          css`
            position: absolute;
            white-space: pre;
            padding: ${paddingY}px ${paddingX}px;
            box-sizing: border-box;
            width: ${block ? "100%" : "auto"};

            &:focus {
              outline: 0;
            }
          `
        )}
      >
        {children}
      </code>
    </pre>
  );
});
