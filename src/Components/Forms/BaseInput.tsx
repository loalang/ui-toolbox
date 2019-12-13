import React, { ReactElement, ChangeEvent } from "react";
import { css } from "emotion";

export interface InputProps {
  "aria-placeholder": string | undefined;
  className: string;
  disabled: boolean;
}

export interface BaseInputProps {
  showsPlaceholder?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  children: (props: InputProps) => ReactElement;
}

export function BaseInput({
  showsPlaceholder = false,
  placeholder,
  isDisabled = false,
  children
}: BaseInputProps) {
  return (
    <div
      className={css`
        position: relative;

        ${placeholder &&
          showsPlaceholder &&
          `
            &::before {
              content: '${placeholder}';
              position: absolute;
              left: 7px;
              top: 5px;
              pointer-events: none;
              color: ${isDisabled ? "#11111140" : "rgba(0, 0, 214, 0.5)"};
              font-size: 16px;
              line-height: 1.1;
              z-index: 1;
            }
          `}
      `}
    >
      {children({
        "aria-placeholder": placeholder,
        disabled: isDisabled,
        className: css`
          display: block;
          font-size: 16px;
          line-height: 1.1;
          padding: 3px 5px;
          border: 2px solid transparent;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box;
          background: ${isDisabled ? "#fafafa" : "#fff"};
          box-shadow: 0 1px 4px #00000010, 0 1px 2px #00000010;
          cursor: ${isDisabled ? "not-allowed" : "bar"};
          caret-color: #1111ff;

          &:focus {
            outline: 0;
            border-color: #1111ff;
            box-shadow: 0 1px 3px #1111ff40;
          }
        `
      })}
    </div>
  );
}
