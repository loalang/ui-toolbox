import React, { ReactNode } from "react";
import { css } from "emotion";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        background: transparent;
        font-size: 20px;
        font-weight: 600;
        line-height: 22px;
      `}
    >
      {children}
    </div>
  );
}
