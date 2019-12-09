import React, { ReactNode } from "react";
import { css } from "emotion";

export function Label({
  children,
  ellipsis = false
}: {
  children: ReactNode;
  ellipsis?: boolean;
}) {
  return (
    <div
      className={css`
        background: transparent;
        font-size: 10px;
        line-height: 1.1;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-weight: 600;

        ${ellipsis
          ? `
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          `
          : `
            word-break: break-word;
          `}
      `}
    >
      {children}
    </div>
  );
}
