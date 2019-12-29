import React, { ReactNode } from "react";
import { css } from "emotion";

export function SafeArea({
  children,
  top = false,
  right = false,
  bottom = false,
  left = false
}: {
  children: ReactNode;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
}) {
  return (
    <div
      className={css`
        padding-top: ${top ? "env(safe-area-inset-top)" : "0"};
        padding-right: ${right ? "env(safe-area-inset-right)" : "0"};
        padding-bottom: ${bottom ? "env(safe-area-inset-bottom)" : "0"};
        padding-left: ${left ? "env(safe-area-inset-left)" : "0"};
      `}
    >
      {children}
    </div>
  );
}
