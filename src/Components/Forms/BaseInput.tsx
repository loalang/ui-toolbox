import React, { ReactElement, ChangeEvent } from "react";
import { css } from "emotion";

export interface InputProps {
  "aria-placeholder": string | undefined;
  className: string;
  disabled: boolean;
}

export interface BaseInputProps {
  placeholder?: string;
  isDisabled?: boolean;
}

export function BaseInput({
  showsPlaceholder = false,
  placeholder,
  isDisabled = false,
  children
}: BaseInputProps & {
  children: (props: InputProps) => ReactElement;
  showsPlaceholder?: boolean;
}) {
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

              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: calc(100% - 14px);
            }
          `}
      `}
    >
      {children({
        "aria-placeholder": placeholder,
        disabled: isDisabled,
        className: css`
          appearance: none;
          display: block;
          font-size: 16px;
          line-height: 1.1;
          padding: 3px 5px;
          border: 2px solid transparent;
          border-radius: 4px;
          width: 100%;
          height: 27px;
          box-sizing: border-box;
          background: ${isDisabled ? "#fafafa" : "#fff"};
          box-shadow: 0 1px 4px #00000010, 0 1px 2px #00000010;
          cursor: ${isDisabled ? "not-allowed" : "text"};
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
