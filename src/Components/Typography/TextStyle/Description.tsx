import React, { ReactNode } from "react";
import { css } from "emotion";

export function Description({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        background: transparent;
        font-size: 15px;
        line-height: 20px;
      `}
    >
      {children}
    </div>
  );
}
