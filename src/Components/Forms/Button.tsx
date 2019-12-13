import React, { ReactNode } from "react";
import { css } from "emotion";

export function Button({
  children,
  onClick,
  primary = false
}: {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      className={css`
        color: ${primary ? "#1111ff" : "#000"};
        background: ${primary ? "#1111ff15" : "#1111ff05"};
        line-height: 1.1;
        font-size: 16px;
        padding: 3px 5px;
        border: 2px solid transparent;
        border-radius: 4px;
        box-shadow: 0 1px 4px #1111ff20, 0 1px 2px #1111ff20;

        &:focus {
          outline: 0;
          border-color: #1111ff;
          box-shadow: 0 1px 3px #1111ff40;
        }
      `}
      onClick={() => onClick()}
      type="button"
    >
      {children}
    </button>
  );
}
