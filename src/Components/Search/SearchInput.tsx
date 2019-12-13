import React, { KeyboardEvent } from "react";
import { css, cx } from "emotion";
import { BaseInput } from "../Forms/BaseInput";

function noop() {}

export function SearchInput({
  term,
  onChange,
  onEnter = noop,
  onUp = noop,
  onDown = noop,
  onFocus = noop,
  onBlur = noop,
  translucent = false,
  placeholder
}: {
  term: string;
  onChange: (term: string) => void;
  onEnter?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  translucent?: boolean;
  placeholder?: string;
}) {
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "Enter":
        onEnter();
        break;
      case "ArrowUp":
        onUp();
        break;
      case "ArrowDown":
        onDown();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  return (
    <BaseInput placeholder={placeholder} showsPlaceholder={term === ""}>
      {p => (
        <input
          type="search"
          value={term}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          {...p}
          className={cx(
            p.className,
            css`
              &::-webkit-search-cancel-button {
                display: none;
              }
            `,
            {
              [css`
                &:focus {
                  border-color: transparent;
                }
                &:not(:focus) {
                  background: rgba(255, 255, 255, 0.4);
                  mix-blend-mode: lighten;
                }
              `]: translucent
            }
          )}
        />
      )}
    </BaseInput>
  );
}
