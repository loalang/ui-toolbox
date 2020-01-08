import React from "react";
import { css, keyframes } from "emotion";

const spin = keyframes`
  0% {
    transform: rotate3d(0, 0, 0, 720deg);
    opacity: 0.4;
  }

  50% {
    opacity: 0.1;
  }

  100% {
    transform: rotate3d(1, 2, 1.5, 720deg);
    opacity: 0.4;
  }
`;

export function Loading({ size = "18px" }: { size?: number | string }) {
  const sizeCss = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={css`
        width: ${sizeCss};
        height: ${sizeCss};
        border-radius: 50%;
        animation: ${spin} 2s infinite ease;
        position: relative;
        overflow: hidden;
        background: #1111ff03;
      `}
    >
      <div
        className={css`
          transform: rotate(45deg);
          width: ${sizeCss};
          height: ${sizeCss};
        `}
      >
        {Array.from(new Array(5), (_, index) => (
          <span
            key={index}
            className={css`
              display: block;
              position: absolute;
              top: 0;
              left: calc(${sizeCss} * 0.23 * ${index});
              width: calc(${sizeCss} * 0.1);
              height: ${sizeCss};
              background: linear-gradient(to bottom, #1111ff, #1111ff40);
            `}
          />
        ))}
      </div>
    </div>
  );
}
