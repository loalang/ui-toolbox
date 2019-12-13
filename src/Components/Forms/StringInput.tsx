import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function StringInput({
  value,
  onChange,
  ...baseProps
}: {
  value: string;
  onChange: (value: string) => void;
} & BaseInputProps) {
  return (
    <BaseInput showsPlaceholder={value === ""} {...baseProps}>
      {p => (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          spellCheck={true}
          {...p}
        />
      )}
    </BaseInput>
  );
}
