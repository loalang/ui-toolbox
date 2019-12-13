import React, { ReactNode } from "react";
import { css } from "emotion";

export function BooleanInput({
  value,
  onChange,
  children,
  isDisabled = false
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  children?: ReactNode;
  isDisabled?: boolean;
}) {
  return (
    <label
      className={css`
        display: flex;
        align-items: center;
      `}
    >
      <input
        className={css`
          position: absolute;
          top: -99999999px;

          &:focus + div {
            border-color: #1111ff;
          }
        `}
        type="checkbox"
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
      <div
        className={css`
          border: 0.1em solid transparent;
          box-sizing: border-box;
          width: 1.9em;
          height: 1.2em;
          flex: 0 0 auto;
          position: relative;
          background: ${value ? "#d9defb" : "#fff"};
          border-radius: 0.7em;
          box-shadow: 0 1px 4px #00000010, 0 1px 2px #00000010;
          cursor: ${isDisabled ? "not-allowed" : "bar"};
          transition: background 100ms;

          &::after {
            content: "";
            display: block;
            position: absolute;
            height: 0.8em;
            width: 0.8em;
            background: ${value ? "#1111ff" : "#444"};
            transition-duration: 100ms;
            transition-property: transform, background;
            top: 0.1em;
            left: 0.1em;
            transform: translateX(${value ? "0.7em" : "0em"});
            border-radius: 0.4em;
            box-shadow: 0 1px 2px #1111ff30;
          }
        `}
      />
      {children && (
        <div
          className={css`
            flex: 1 1 auto;
            margin-left: 10px;
          `}
        >
          {children}
        </div>
      )}
    </label>
  );
}
