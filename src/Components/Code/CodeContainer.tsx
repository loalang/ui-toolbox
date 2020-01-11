import React, { ReactNode, forwardRef } from "react";
import { css, cx } from "emotion";
import { useMediaQuery } from "../useMediaQuery";

/** @internal */
export const CodeContainer = forwardRef<
  HTMLElement,
  {
    children?: ReactNode;
    lineCount: number;
    raw?: boolean;
    block?: boolean;
    contentEditable?: boolean;
    isDisabled?: boolean;
  }
>(function CodeContainer(
  {
    children,
    raw = false,
    block: forceBlock = false,
    lineCount,
    contentEditable,
    isDisabled = false
  },
  ref
) {
  const isWide = useMediaQuery("(min-width: 600px)");

  const fontSize = isWide ? 13 : 16;
  const lineHeight = isWide ? 17 : 20;
  const paddingY = raw ? 0 : 3;
  const paddingX = raw ? 0 : 5;

  const block = forceBlock || lineCount > 1;

  const codeFormatting = css`
    font-family: "IBM Plex Mono", monospace;
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
  `;

  const backdrop = css`
    background: ${isDisabled ? "#fafafa" : "#fff"};
    border-radius: 4px;

    border: 2px solid transparent;
    box-shadow: 0 1px 4px #00000010, 0 1px 2px #00000010;
    caret-color: #1111ff;

    &:focus-within {
      outline: 0;
      border-color: #1111ff;
      box-shadow: 0 1px 3px #1111ff40;
    }
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
            min-width: ${block ? "100%" : "auto"};

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
