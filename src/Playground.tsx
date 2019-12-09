import React, { ReactElement, useState } from "react";
import { css } from "emotion";
import { Label } from "./Components/Typography/TextStyle/Label";

export function Playground({
  children: Children,
  __code
}: {
  children: () => ReactElement;
  __code: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={css`
          background: #1111ff20;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          display: flex;
          justify-content: flex-end;
          border-bottom: 0;
        `}
      >
        <button
          className={css`
            background: transparent;
            padding: 4px 6px;
            display: inline-flex;
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Label>{isExpanded ? "Hide Code" : "Show Code"}</Label>
        </button>
      </div>
      {isExpanded && (
        <div
          className={css`
            position: relative;
            width: 100%;
          `}
        >
          <pre
            className={css`
              position: relative;
              overflow: auto;
              border: 2px solid #1111ff20;
              border-top: 0;
            `}
          >
            <code
              className={css`
                font-family: "IBM Plex Mono", monospace;
                line-height: 1.2;
                font-size: 13px;
                padding: 10px;
                display: block;
                background: transparent;
              `}
            >
              {formatCode(__code)}
            </code>
          </pre>
        </div>
      )}
      <div
        className={css`
          border-top: 0;
          padding: 10px;
          border: 2px solid #1111ff20;
          border-top: 0;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        `}
      >
        <Children />
      </div>
    </>
  );
}

function formatCode(code: string): string {
  return code
    .replace(/^\(\) => [{(]\n/, "")
    .replace(/^  /gm, "")
    .replace(/\n[})]$/, "");
}
