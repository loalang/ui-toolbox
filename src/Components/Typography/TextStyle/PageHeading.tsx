import React, { ReactNode } from "react";
import { css } from "emotion";

export function PageHeading({ children }: { children: ReactNode }) {
  return (
    <span
      className={css`
        display: block;
        background: transparent;
        font-size: 30px;
        font-weight: 600;
        line-height: 32px;
      `}
    >
      {children}
    </span>
  );
}
