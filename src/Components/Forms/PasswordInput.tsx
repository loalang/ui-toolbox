import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export function PasswordInput({
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
          type="password"
          value={value}
          onChange={e => onChange(e.target.value)}
          spellCheck={false}
          {...p}
        />
      )}
    </BaseInput>
  );
}
