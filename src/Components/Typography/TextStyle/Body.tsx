import React, { ReactNode } from "react";
import { css } from "emotion";

export function Body({ children }: { children: ReactNode }) {
  return (
    <span
      className={css`
        display: block;
        background: transparent;
        font-size: 14px;
        font-family: "IBM Plex Serif", serif;
        line-height: 20px;
      `}
    >
      {children}
    </span>
  );
}
