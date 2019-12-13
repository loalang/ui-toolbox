import React, { ReactNode } from "react";
import { css } from "emotion";

export function Basic({ children }: { children: ReactNode }) {
  return (
    <span
      className={css`
        display: block;
        background: transparent;
        font-size: 13px;
        line-height: 17px;
      `}
    >
      {children}
    </span>
  );
}
