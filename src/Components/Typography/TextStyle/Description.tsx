import React, { ReactNode } from "react";
import { css } from "emotion";

export function Description({ children }: { children: ReactNode }) {
  return (
    <span
      className={css`
        display: block;
        background: transparent;
        font-size: 15px;
        line-height: 20px;
      `}
    >
      {children}
    </span>
  );
}
