import React, { ReactNode } from "react";
import { css } from "emotion";

export function HeroHeading({ children }: { children: ReactNode }) {
  return (
    <span
      className={css`
        display: block;
        background: transparent;
        font-size: 42px;
        line-height: 43px;
      `}
    >
      {children}
    </span>
  );
}
