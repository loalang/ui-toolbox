import React, { useRef, useLayoutEffect } from "react";
import { BaseInput, BaseInputProps } from "../BaseInput/BaseInput";
import { cx, css } from "emotion";

export function TextInput({
  value,
  onChange,
  minLineCount = 1,
  ...baseProps
}: {
  value: string;
  onChange: (value: string) => void;
  minLineCount?: number;
} & BaseInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const sizerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (textareaRef.current != null && sizerRef.current != null) {
      textareaRef.current.style.height =
        sizerRef.current.getBoundingClientRect().height + "px";
    }
  }, [value]);

  return (
    <BaseInput {...baseProps} showsPlaceholder={value === ""}>
      {p => (
        <>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            spellCheck={true}
            {...p}
            className={cx(
              p.className,
              css`
                resize: none;
              `
            )}
          />
          <div
            aria-hidden="true"
            ref={sizerRef}
            className={cx(
              p.className,
              css`
                position: absolute;
                white-space: pre-line;
                left: -99999999px;
              `
            )}
          >
            {ensureLineCount(value, minLineCount).replace(/^$/gm, "X")}
          </div>
        </>
      )}
    </BaseInput>
  );
}

function ensureLineCount(s: string, count: number): string {
  const lines = s.split("\n");
  while (lines.length < count) {
    lines.push("");
  }
  return lines.join("\n");
}
