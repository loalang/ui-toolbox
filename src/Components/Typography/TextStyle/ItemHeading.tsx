import React, { ReactNode } from "react";
import { css } from "emotion";

export function ItemHeading({ children }: { children: ReactNode }) {
  return (
    <span
      className={css`
        display: block;
        background: transparent;
        font-size: 16px;
        font-weight: 600;
        line-height: 21px;
      `}
    >
      {children}
    </span>
  );
}
