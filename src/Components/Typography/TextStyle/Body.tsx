import React, { ReactNode } from "react";
import { css } from "emotion";

export function Body({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        background: transparent;
        font-size: 14px;
        font-family: "IBM Plex Serif", serif;
        line-height: 20px;
      `}
    >
      {children}
    </div>
  );
}
