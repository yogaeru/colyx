import { useId } from "react";

import { M3eOption } from "@m3e/react/option";
import { M3eFormField } from "@m3e/react/form-field";
import { M3eSelect } from "@m3e/react/select";

// import type { M3eSelectElement } from "@m3e/react/select";
import type { FormFieldVariant } from "@m3e/web/form-field";

import { cn } from "cn";

export interface SelectorOption<Value extends string> {
  value: Value;
  label: string;
  disabled?: boolean;
}

interface SelectorProps<Value extends string> {
  options: readonly SelectorOption<Value>[];
  value?: Value;
  label: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: FormFieldVariant;
  className?: string;
  // onValueChange?: (value: Value) => void;
}

export default function Selector<Value extends string>({
  options,
  value,
  label,
  id,
  disabled = false,
  required = false,
  variant = "outlined",
  className,
  // onValueChange,
}: SelectorProps<Value>) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

//   function handleChange(event: React.ChangeEvent<M3eSelectElement>) {
//     const selectedValue = event.currentTarget.value;
// 
//     const option = options.find((option) => option.value === selectedValue);
// 
//     if (!option || option.disabled) return;
// 
//     onValueChange?.(option.value);
//   }

  return (
    <M3eFormField
      variant={variant}
      hide-subscript="always"
      className={cn("w-full min-w-0 density-3", className)}
    >
      <label slot="label" htmlFor={selectId}>
        {label}
      </label>

      <M3eSelect
        panel-class="select-panel"
        id={selectId}
        value={value}
        disabled={disabled}
        required={required}
        // onChange={handleChange}
      >
        {options.map((option) => (
          <M3eOption
            key={option.value}
            value={option.value}
            disabled={option.disabled ?? false}
          >
            {option.label}
          </M3eOption>
        ))}
      </M3eSelect>
    </M3eFormField>
  );
}
